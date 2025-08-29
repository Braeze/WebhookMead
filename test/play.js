import fs from "fs";
import { chromium } from "playwright";

const storage = JSON.parse(fs.readFileSync("test2.json", "utf-8"));

function convertCookies(chromeCookies) {
    return chromeCookies.map(c => ({
        name: c.name,
        value: c.value,
        domain: c.domain,
        path: c.path,
        expires: c.expirationDate ? Math.floor(c.expirationDate) : -1,
        httpOnly: !!c.httpOnly,
        secure: !!c.secure,
        sameSite:
            c.sameSite === "no_restriction"
                ? "None"
                : c.sameSite === "lax"
                    ? "Lax"
                    : c.sameSite === "strict"
                        ? "Strict"
                        : "Lax"
    }));
}

const cookies = convertCookies(storage.cookies);

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext();

// Load cookies
await context.addCookies(cookies);

const page = await context.newPage();
await page.goto(storage.origin);

// Inject localStorage & sessionStorage
await page.addInitScript((localStorageData, sessionStorageData) => {
    for (const [k, v] of Object.entries(localStorageData)) {
        localStorage.setItem(k, v);
    }
    for (const [k, v] of Object.entries(sessionStorageData)) {
        sessionStorage.setItem(k, v);
    }
}, storage.localStorage, storage.sessionStorage);

console.log("Restored cookies + storage!");

await page.waitForTimeout(5000);
await browser.close();
