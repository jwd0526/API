import puppeteer from "puppeteer";
import fs from "fs";

const main = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const website = await browser.newPage();
  await website.setViewport({ width: 1920, height: 1080 });
  const websiteURL =
    "https://www.sportsbookreview.com/betting-odds/nba-basketball/";
  await website.goto(websiteURL);
  const rows = await website.$$("#tbody-nba > div");
  let rowSpreads;
  let rowNames;
  let rowLine;

  for (let i = 0; i < rows.length; i++) {
    rowNames = await website.evaluate(() => {
      const elements = Array.from(
        document.getElementsByClassName(
          "GameRows_adjust__NZn2m GameRows_opener__NivKJ GameRows_opener__NivKJ"
        )
      );
      return elements.map((element) => element.textContent);
    });

    rowLine = await website.evaluate(() => {
      const elements = Array.from(
        document.getElementsByClassName("GameRows_opener__NivKJ")
      );
      return elements.map((element) => element.textContent);
    });

    rowSpreads = await website.evaluate(() => {
      const elements = Array.from(
        document.getElementsByClassName("GameRows_participantBox__0WCRz")
      );
      return elements.map((element) => element.textContent);
    });
  }
  browser.close();
  console.log(rowSpreads);
  console.log(rowNames);
  console.log(rowLine);
};

export default main;
