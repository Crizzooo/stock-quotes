import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Good luck!');
})

export default app;
