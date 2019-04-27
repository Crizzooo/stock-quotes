import express from 'express';

const app = express();

app.get('/', (req, res) => {
    console.log('youve hit api route!');
    res.send('Connnected to Api!');
});

export default app;
