import express from "express";
import main from "./scraper";
import fs from "fs";
import axios from "axios";

const app = express();
const PORT = 8000;

interface Odds {
  Team: string;
  Spread: string;
  Moneyline: string;
}
main()
  .then(() => {
    app.get("/odds", (req, res) => {
      fs.readFile("odds.json", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          res.status(500).send("Error reading file");
          return;
        }
        const odds: Odds[] = JSON.parse(data.toString());
        res.json(odds);
      });
    });

    app.get("/odds/:team", (req, res) => {
      const team = req.params.team;
      fs.readFile("odds.json", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          res.status(500).send("Error reading file");
          return;
        }
        const odds: Odds[] = JSON.parse(data.toString());
        const filteredOdds = odds.filter((o) => o.Team === team);
        res.json(filteredOdds);
      });
    });
  })
  .then(() => {
    getOddsForTeam("Toronto");
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const getOddsForTeam = async (team: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/odds/${team}`);
    console.log(`Odds for ${team}:`, response.data);
  } catch (error) {
    console.error(`Error fetching odds for ${team}:`, error);
  }
};
