import express from 'express';
import StockQuotes from '../../services/StockQuotes';


const app = express();

app.get('/symbols', (req, res) => {
    // return all symbols in cache
});

app.get('/symbols/:searchString', (req, res) => {
    // search symbol cache by company or symbol
    // return results
});

app.get('/:symbol', (req, res) => {
    // verify is symbol
    // handle if not in symbol cache

    // visit cache and grab symbol
    // if not in cache, call getSymbol
    // add to cache, send
});

app.get('/', (req, res) => {
    // We could enhance this to send back the list of available routes
    res.send(`You've hit the Stocks API Entry Point!`);
});

export default app;
