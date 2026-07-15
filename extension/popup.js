const BACKEND_URL = 'https://openatlas.jackjacobson2011.com';

const loginView = document.getElementById('login-view');
const saveView = document.getElementById('save-view');
const loginError = document.getElementById('login-error');
const loginUser = document.getElementById('login-user');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const signupLink = document.getElementById('signup-link');
const notes = document.getElementById('notes');
const saveBtn = document.getElementById('save-btn');
const statusDiv = document.getElementById('statusDiv');
const currentUser = document.getElementById('current-user');
const logoutBtn = document.getElementById('logout-btn');
const privacyLink = document.getElementById('privacy-link');
const termsLink = document.getElementById('terms-link');

function showLogin() {
    loginView.classList.remove('hidden');
    saveView.classList.add('hidden');
}

function showSave(username) {
    loginView.classList.add('hidden');
    saveView.classList.remove('hidden');
    currentUser.textContent = username;

    loadProjects();
}

async function checkAuth() {
      const { token, username } = await chrome.storage.local.get(['token', 'username']);
    if (token && username){
        showSave(username);
    } else {
        showLogin();
    }
}

loginBtn.addEventListener('click', async () => {
    loginError.classList.add('hidden');
    loginBtn.disabled = true;
    loginBtn.textContent = 'Entering...';

    try {
        const res = await fetch (`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: loginUser.value,
                password: loginPassword.value
            })
        });

        const data = await res.json();

        if(!res.ok || !data.success){
            loginError.textContent = data.message || 'Login failed.';
            loginError.classList.remove('hidden');
            loginBtn.disabled = false;
            loginBtn.textContent = 'Enter';
            return;
        }

        await chrome.storage.local.set({
            token: data.token,
            username: data.user.username
        });

        loginPassword.value = '';
        showSave(data.user.username);
        loadProjects();
    } catch (err){
        loginError.textContent = 'Network error, ensure server is running.';
        loginError.classList.remove('hidden');
        loginBtn.disabled = false;
        loginBtn.textContent = 'Enter';
    }
});

async function loadProjects(){
    const { token } = await chrome.storage.local.get(['token']);
    if(!token) return;

    try {
        const res = await fetch(`${BACKEND_URL}/api/projects`, {
            headers: { 'Authorization': `Bearer ${token}`}
        });

        const data = await res.json();
        if(!data.success) return;

        const select = document.getElementById('project-select');
        if (data.projects.length === 0) {
            select.innerHTML = '<option value="">No project</option>';
        } 
        else {
            select.innerHTML = '<option value="">No project</option>';
            data.projects.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.textContent = p.name;
                select.appendChild(opt);
            });
        }
    } catch (err) {
        console.error('Load projects error:', err);
    }
}

signupLink.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://openatlas.jackjacobson2011.com/signup'});
});

logoutBtn.addEventListener('click', async () => {
    await chrome.storage.local.remove(['token', 'username']);
    try {
        await fetch(`${BACKEND_URL}/api/auth/logout`, {method:'POST'});
    } catch (err) {
        console.error('Logout error:', err);
    }
    showLogin();
});
privacyLink.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://openatlas.jackjacobson2011.com/privacy' });
});

termsLink.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://openatlas.jackjacobson2011.com/terms' });
});
saveBtn.addEventListener('click', async () => {
    statusDiv.textContent= 'Capturing...';
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if(!tab){
        statusDiv.textContent = 'Error: No active tab.';
        return;
    }

    const pageData = {
        url: tab.url,
        title: tab.title,
        notes: notes.value,
        projectId: document.getElementById('project-select').value || null
    };

    console.log('Sending pageData:', pageData);

    chrome.runtime.sendMessage(
        { action: 'SEND_DATA', payload: pageData },
        (response) => {
            if(chrome.runtime.lastError){
                statusDiv.textContent = 'Error: unable to connect.';
                console.error(chrome.runtime.lastError);
                return;
            }

            if (response?.needsLogin){
                statusDiv.textContent = 'Session expired, log in and try again please!';
                showLogin();
                return;
            }

            if (response?.success) {
                statusDiv.textContent = 'Saved to your Atlas!';

                if (tab.url && tab.url.startsWith('https://openatlas.jackjacobson2011.com/')) {
                    chrome.tabs.reload(tab.id);
                }

                setTimeout(() => window.close(), 1000);
            } else {
                statusDiv.textContent = response?.error || 'Error: failed to save.';
            }
        }
    );
});

checkAuth();

