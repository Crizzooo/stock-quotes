import express from 'express';
import path from 'path';

import { FRONT_END_DIST_PATH, FRONT_END_ENTRY_PATH } from './config';
import apiRouter from './routes/api';

const app = express();


app.use('/api', apiRouter);

// Any unhandled get route should serve the built frontend application
app.use(express.static(path.join(FRONT_END_DIST_PATH)));
app.get('*', (req, res, next) => {
  res.sendFile(path.join(FRONT_END_ENTRY_PATH));
});

// Send generic error response
// Eventually we should probably log or store these errors for monitoring
app.use("/", (err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send("Internal Server error.");
});

export default app;
