import express from 'express';
import path from 'path';
import morgan from 'morgan';

// Use babel polyfill to support features like async class methods
import 'babel-polyfill';

import { FRONT_END_DIST_PATH, FRONT_END_ENTRY_PATH } from './config';
import apiRouter from './api';
import SymbolCache from './services/SymbolCache';

const app = express();

// Route logging with minimal output, but could use an
// ehanced format and write to log files if this were a productionn app
app.use(morgan('dev'));

app.use('/api', apiRouter);

// Any unhandled get route should serve the built frontend application
app.use(express.static(path.join(FRONT_END_DIST_PATH)));
app.get('*', (req, res) => {
	console.log('hit final route');
	res.sendFile(path.join(FRONT_END_ENTRY_PATH));
});

// Send generic error response
// Eventually we should probably log or store these errors for monitoring
app.use("/", (err, req, res) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send("Internal Server error.");
});

async function makeExpressApp() {
	// initialize SymbolCache by fetching symbols from IEX and
	// storing in a way that we can search easily
	// If this fails, we will still let the app turn on to serve the front end
	// but API end points will likely fail
	try {
		await SymbolCache.init();
	} catch (e) {
		// We should probably do some alerting on our end
		// Or build a retry mechanism to hopefully recover
		// I am choosing to not end the entire process
		console.error('Could not initialize Symbol Cache with IEX Symbols!');
		console.error(e);
	}

	return app;
}

export default makeExpressApp;
