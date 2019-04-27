import express from 'express';
import stocksRouter from './stocks';

const app = express();

app.use('/stocks', stocksRouter);

app.get('/', (req, res) => {
    // We could enhance this to send back the list of available routes
    res.send(`You've hit the api entry point!`);
});

export default app;
