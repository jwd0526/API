export function convertCsvToJson(
  csvFilePath: string,
  outputJsonFilePath: string
): void {
  const fs = require("fs");
  fs.readFile("odds.csv", "utf8", (err: any, data: string) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const lines = data.trim().split("\n");
    const headers = lines.shift()?.split(",");
    const result: any[] = [];
    lines.forEach((line) => {
      const values = line.split(",");
      const obj: any = {};

      headers?.forEach((header, index) => {
        obj[header] = values[index];
      });

      result.push(obj);
    });
    const jsonData = JSON.stringify(result, null, 2);
    fs.writeFile("odds.json", jsonData, "utf8", (err: any) => {
      if (err) {
        console.error("Error writing JSON file:", err);
        return;
      }
      console.log("JSON file has been saved.");
    });
  });
}
