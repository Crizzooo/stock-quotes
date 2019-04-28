import express from 'express';
import stocksRouter from './stocks';

const apiRouter = express.Router();

apiRouter.use( (req, res, next) => {
	console.log('hit api');
	console.log(req.path);
	next();
});

apiRouter.use('/stocks', stocksRouter);

apiRouter.get('/', (req, res) => {
	console.log('hit api root');
	// We could enhance this to send back the list of available routes
	res.send(`You've hit the api entry point!`);
});

export default apiRouter;
