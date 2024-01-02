from playwright.sync_api import Playwright, sync_playwright, expect


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://teams.live.com/")
    page.goto("https://teams.microsoft.com/?auth=msal_dev3")
    page.goto("https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=id_token&scope=openid%20profile&client_id=5e3ce6c0-2b1f-4285-8d4b-75ee78787346&redirect_uri=https%3A%2F%2Fteams.microsoft.com%2Fgo&state=eyJpZCI6ImUxZjg3YWFhLWYwMWYtNGU4OS1hMjU4LWI3NDVkZDQ1ZGE3YyIsInRzIjoxNzA0MjEwOTI5LCJtZXRob2QiOiJyZWRpcmVjdEludGVyYWN0aW9uIn0%3D&nonce=fd77fc1d-1368-45cd-9dfc-51f07087fd54&client_info=1&x-client-SKU=MSAL.JS&x-client-Ver=1.3.4&client-request-id=82453ef6-5a4c-4bce-8988-871140d6d64b&response_mode=fragment")
    page.get_by_placeholder("Email address, phone number").click()
    page.get_by_placeholder("Email address, phone number").fill("")
    page.get_by_placeholder("Email address, phone number").press("Enter")
    page.get_by_placeholder("Password").click()
    page.get_by_placeholder("Password").fill("")
    page.get_by_role("button", name="Sign in").click()

    page.goto("https://teams.live.com/")
    page.goto("https://teams.live.com/_")
    page.goto("https://teams.live.com/_#/communities/")
    page.goto("https://teams.live.com/_#/conversations/?ctx=chat")
    page.get_by_label("Chat Toolbar more options").click()
    page.get_by_label("New Chat (Alt+N)").click()
    #page.textContent("article:has(div.ui-box e)")

    #href_element = page.locator("#ExperienceContainerManagerMountElement")
    #await page.locator('[data-testid*="ExperienceContainerManagerMountElement*"]').click();

    #href_element = page.locator('[div id*="ExperienceContainerManagerMountElement*"]')
    elements = page.locator('[id*=experience-container]').nth(1)
    #print(elements.count())
    value = "#"+elements.get_attribute("id")
    page.frame_locator(value).get_by_placeholder("Enter name, email or phone number").click()
    page.frame_locator(value).get_by_placeholder("Enter name, email or phone number").fill("")
    #page.frame_locator(value).get_by_placeholder("Enter name, email or phone number").press("Enter")
    page.wait_for_timeout(3000)
    print("test")
    page.frame_locator(value).locator("img").click()
    #page.frame_locator(value).locator("#downshift-2-item-0 > div").first.click()

    print(type(elements.get_attribute("id")))

    #page.get_by_placeholder("Enter name, email or phone number").click()
    #page.get_by_placeholder("Enter name, email or phone number").fill("")
    #page.get_by_placeholder("Enter name, email or phone number").press("Enter")
    #page.frame_locator("#experience-container-cb845c9a-d830-4fa4-b704-f5894277b26e").get_by_text("To:").click()


    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
