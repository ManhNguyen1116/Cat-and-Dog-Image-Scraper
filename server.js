'use strict';

const express = require('express');
const puppeteer = require("puppeteer");
const path = require("node:path");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const IMAGE_PATH = 'assets';
const min = 100000;
const max = 999999;

// App
const app = express();
app.use(express.static("assets"));

app.get('/kitty', (req, res) => {
    const site = 'https://genrandom.com/cats/';
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    const fname = timestamp + "_" + random + ".png";
    const fpath = path.join(IMAGE_PATH, fname);

    (async () => {
      const browser = await puppeteer.launch(
        {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      );
      const page = await browser.newPage();
      await page.goto(site, {waitUntil: "networkidle2"});
      await page.waitForSelector("#gatsby-focus-wrapper > div > div > div > div > div > div > div > div > img");
      const image = await page.$("#gatsby-focus-wrapper > div > div > div > div > div > div > div > div > img");
      await image.screenshot({path: fpath});
      await browser.close();
      await res.sendFile(path.resolve(fpath));
    })();
});

app.get('/puppy', (req, res) => {
  const site = 'https://random.dog/';
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  const fname = timestamp + "_" + random + ".png";
  const fpath = path.join(IMAGE_PATH, fname);

  const defaultViewport = {
    height: 1920,
    width: 1280
  };
  
  (async () => {
    const browser = await puppeteer.launch(
      {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    );
    const page = await browser.newPage();
    await page.goto(site, {waitUntil: "networkidle2"});
    await page.waitForSelector("#dog-img");
    const bodyHandle = await page.$("body");
    const boundingBox = await bodyHandle.boundingBox();
    const newViewport = {
      width: Math.max(defaultViewport.width, Math.ceil(boundingBox.width)),
      height: Math.max(defaultViewport.height, Math.ceil(boundingBox.height)),
    };
    await page.setViewport(Object.assign({}, defaultViewport, newViewport));

    const image = await page.$("#dog-img");
    await image.screenshot({path: fpath});
    await browser.close();
    res.sendFile(path.resolve(fpath));
  })();
});

app.get('/www.*', (req, res) => {
  var site = req.url.substring(1);
  site = "http://" + site;
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  const fname = timestamp + "_" + random + ".png";
  const fpath = path.join(IMAGE_PATH, fname);

  (async () => {
    const browser = await puppeteer.launch(
      {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    );
    const page = await browser.newPage();
    await page.goto(site, {waitUntil: "networkidle2"});
    await page.screenshot({path: fpath});
    await browser.close();
    await res.sendFile(path.resolve(fpath));
  })();
});

app.get('/*', async (req, res) => {
  res.sendFile(path.join(__dirname, "./Error.html"));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);