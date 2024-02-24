import express from "express";
import main from "./scraper";
import path from "path";

const app = express();
const PORT = 8000;

interface Odds {
    Team: string,
    Spread: string,
    Moneyline: string
}
main().then(() => {

    app.get("/odds", (req, res) => {
        return fetch(path.join(process.cwd(), 'odds.json'))
            .then(response => response.json())
            .then((odds: Odds[]) => {
                res.json(odds);
            });

    });
    app.get("/odds/:team", (req, res) => {
        const team = req.params.team;
        return fetch(path.join(process.cwd(), 'odds.json'))
            .then(response => response.json())
            .then((odds: Odds[]) => {
                const teamOdds = odds.find(o => o.Team === team);
                if (teamOdds) {
                    res.json(teamOdds); // Send the odds data for the requested team as JSON response
                } else {
                    res.status(404).json({ error: "Odds not found for the specified team" });
                }
            });
    });
    
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});