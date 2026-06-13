chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action === "SEND_DATA"){
        const BACKEND_URL = "http://localhost:5000/api/resources"; //ADAPT FOR ACTUAL RELEASE

        fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message.payload)
        })
        .then(response => {
            if(!response.ok){
                throw new Error (`Error: Server returned status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            sendResponse({success: true, data: data});
        })
        .catch(error =>{
            console.error("Background script fetch error:", error);
            sendResponse({ success: false, error: error.message});
        });

        return true;
    }
});