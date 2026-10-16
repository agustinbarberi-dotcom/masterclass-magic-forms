"""Run with python3 tests/registration_flow.py against the running preview."""
import asyncio
from playwright.async_api import async_playwright


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1800})
        posts = []

        async def registration_response(route):
            if route.request.method == "POST":
                posts.append(route.request.post_data_json)
            await route.fulfill(status=200, body='{"result":"success"}')

        await page.route("https://script.google.com/**", registration_response)
        await page.goto("http://localhost:8080", wait_until="networkidle")
        form = page.locator("form").first
        await form.get_by_label("Nombre completo").fill("Prueba registro")
        await form.get_by_label("Número de WhatsApp").fill("3001234567")
        await form.get_by_role("button", name="Quiero mi lugar en el encuentro").click()
        await page.wait_for_url("**/gracias")
        await page.get_by_role("link", name="Unirme al grupo de WhatsApp").wait_for()
        assert page.url == "http://localhost:8080/gracias"
        await page.wait_for_timeout(300)
        assert len(posts) == 1
        assert set(posts[0]) == {"fecha", "nombre", "telefono"}
        assert posts[0]["telefono"] == "+573001234567"
        await page.screenshot(path="/tmp/browser/registration_thanks.png")
        print("PASS: registration goes directly to thanks and preserves the registration POST.")
        await browser.close()


asyncio.run(main())