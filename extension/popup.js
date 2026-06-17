const BACKEND_URL = 'http://localhost:5000';

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

function showLogin() {
    loginView.classList.remove('hidden');
    saveView.classList.add('hidden');
}

function showSave(username) {
    loginView.classList.add('hidden');
    saveView.classList.remove('hidden');
    currentUser.textContent = username;
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
    loginError.classList('hidden');
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
    } catch (err){
        loginError.textContent = 'Network error, ensure server is running.';
        loginError.classList.remove('hidden');
        loginBtn.disabled = false;
        loginBtn.textContent = 'Enter';
    }
});

signupLink.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://localhost:5173/ '});
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
        notes: notes.value
    };

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
                setTimeout(() => window.close(), 1000);
            } else {
                statusDiv.textContent = response?.error || 'Error: failed to save.';
            }
        }
    );
});

checkAuth();