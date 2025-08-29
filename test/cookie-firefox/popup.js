document.getElementById("export").addEventListener("click", async () => {
    try {
        let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
        if (!tab.url.startsWith("http")) {
            alert("Cannot export from this tab.");
            return;
        }

        let url = new URL(tab.url);
        let cookies = await browser.cookies.getAll({ url: url.origin });

        let results = await browser.tabs.executeScript(tab.id, {
            code: `({ 
                localStorage: Object.assign({}, localStorage), 
                sessionStorage: Object.assign({}, sessionStorage), 
                title: document.title 
            })`
        });

        let storageResult = results[0];

        const exportData = {
            siteName: storageResult.title,
            siteDomain: url.hostname,
            origin: url.origin,
            cookies,
            localStorage: storageResult.localStorage,
            sessionStorage: storageResult.sessionStorage
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const blobUrl = URL.createObjectURL(blob);

        // Create temporary link and click it
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `${url.hostname}-storage.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Release memory
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

    } catch (err) {
        console.error("Export failed:", err);
        alert("Export failed. Check console for details.");
    }
});
