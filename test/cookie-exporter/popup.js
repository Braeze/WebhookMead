document.getElementById("export").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let url = new URL(tab.url);

    // 1. Get cookies (query by URL, more reliable than domain)
    chrome.cookies.getAll({ url: url.origin }, async (cookies) => {
        // 2. Inject script into page to fetch localStorage + sessionStorage
        const [result] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                return {
                    localStorage: { ...localStorage },
                    sessionStorage: { ...sessionStorage }
                };
            }
        });

        // 3. Combine all data
        const exportData = {
            origin: url.origin,
            cookies,
            localStorage: result.result.localStorage,
            sessionStorage: result.result.sessionStorage
        };

        // 4. Save as JSON file
        let blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        let urlObject = URL.createObjectURL(blob);

        chrome.downloads.download({
            url: urlObject,
            filename: `${url.hostname}-storage.json`,
            saveAs: true
        });


        // 5. Send JSON to local Spring app (example: http://192.168.1.50:8080/api/storage)
        fetch("http://192.168.1.50:8080/api/storage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exportData)
        })
            .then(res => res.text())
            .then(data => alert("Data uploaded successfully!"))
            .catch(err => alert("Upload failed: " + err));
    });
});
