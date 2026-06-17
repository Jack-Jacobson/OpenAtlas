const BACKEND_URL = 'http://localhost:5000/api/resources';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action !== 'SEND_DATA') {
        return;
    }

    chrome.storage.local.get(['token'], async ({ token }) => {
        if(!token){
            sendResponse({ needsLogin: true, error: 'Not authenticated.'});
            return;
        }

        try {
            const response = await fetch (BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(message.payload)
            });

            if(response.status === 401) {
                await chrome.storage.local.remove(['token', 'username']);
                sendResponse({needsLogin: true, error: 'Session expired.'});
                return;
            }

            if(!response.ok){
                throw new Error(`Server returned status ${response.status}`);
            }

            const data = await response.json();
            sendResponse({ success: true, data });
        } catch (error) {
            console.error('Background script fetch error:', error);
            sendResponse({ success: false, error: error.message });
        }
    });

    return true;
});