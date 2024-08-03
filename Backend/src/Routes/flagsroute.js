import { Router } from "express";
const flagsroute = Router();

flagsroute.post("/countrydetails", async (req, res) => {
    const { name } = req.body;
    try {
        const resp = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await resp.json();

        let countryDetails = data.map(element => {
            let countryname = element.name.common;
            let currencyobj = element.currencies;
            let countrycapital = element.capital[0];
            let countrylanguage = Object.values(element.languages);
            let countryflagurl = element.flags.svg;

            return {
                countryname,
                currencies: Object.values(currencyobj).map(c => ({
                    name: c.name,
                    symbol: c.symbol
                })),
                capital: countrycapital,
                languages: countrylanguage,
                flagurl: countryflagurl
            };
        });

        
        res.json(countryDetails);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.toString());
    }
});

export default flagsroute;
