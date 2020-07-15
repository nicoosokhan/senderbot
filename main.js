
const puppeteer = require('puppeteer')

async function Main() {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        ignoreDefaultArgs: ["--enable-automation"],
    })
    const page = await browser.newPage()

    // Define a window.onCustomEvent function on the page.
    await page.exposeFunction('onCustomEvent', (e) => {
        console.log(`${e.type} fired`, e)
    })

    await page.goto('http://ashpazshop.blog.ir/post/%D8%A8%D8%A7%D8%AF%D8%A8%D8%B2%D9%86-%DA%A9%D8%AF%E2%80%8C-169', {
        waitUntil: 'networkidle0',
    })

    await page.evaluate((type) => {
        let input = document.getElementById('captchaInput')
        
        input.addEventListener(type, (e) => {
            if (e.target.value.length !== 5) return;
            window.onCustomEvent({
                type,
                value: e.target.value,
                src: window.location.origin + document.querySelector('div.fldcontent img[alt="کد امنیتی"]').getAttribute('src')
            })
            input.value = ''

            document.querySelector('div.fldcontent a[href="#"]').click()
        })
    }, 'input')
    

    
}

Main()