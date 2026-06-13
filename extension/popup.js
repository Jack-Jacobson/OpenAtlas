document.getElementById("save-btn").addEventListener('click', async () => {
    const statusDiv = document.getElementById('status');
    const notesText = document.getElementById('notes').value;

    statusDiv.textContent = "Capturing...";
    
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    if(!tab){
        statusDiv.textContent = "Error: No active tab found.";
        return;
    }

    const pageData = {
        url: tab.url,
        title: tab.title,
        notes: notesText
    };
    chrome.runtime.sendMessage({ action: "SEND_DATA", payload: pageData}, (response) => {
        if(chrome.runtime.lastError){
            statusDiv.textContent = "Error: Unable to connect.";
            console.error(chrome.runtime.lastError);
        }
        else if (response && response.success){
            statusDiv.textContent = "Saved to your Atlas!";
            setTimeout(() => window.close(), 1000);
        }
        else{
            statusDiv.textContent = response?.error || "Error: Failed to save.";
        }
    });
});