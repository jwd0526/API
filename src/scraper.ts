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

  let rowData = [];

  const rowNames = await website.evaluate(() => {
    const elements = Array.from(
      document.getElementsByClassName("GameRows_participantBox__0WCRz")
    );
    return elements.map((element) => element.textContent);
  });

  const rowSpreads = await website.evaluate(() => {
    const elements = Array.from(
      document.getElementsByClassName(
        "GameRows_adjust__NZn2m GameRows_opener__NivKJ"
      )
    );
    return elements.map((element) => element.textContent);
  });

  const rowLines = await website.evaluate(() => {
    const elements = document.querySelectorAll(
      ".GameRows_margin__fN0XT > .GameRows_opener__NivKJ:nth-child(2)"
    );
    return Array.from(elements).map((element) => element.textContent);
  });

  for (let j = 0; j < rowNames.length; j++) {
    rowData.push({
      team: rowNames[j],
      spread: rowSpreads[j],
      line: rowLines[j],
    });
  }

  const csvData = rowData
    .map(({ team, spread, line }) => `${team},${spread},${line}`)
    .join("\n");
  fs.writeFileSync("odds.csv", csvData);

  browser.close();
};
export default main;
