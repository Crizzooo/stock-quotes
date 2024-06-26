import path from 'path';

export const FRONT_END_DIST_PATH = path.join(__dirname, '..', '..', 'quote-ui', 'build');
export const FRONT_END_ENTRY_PATH = path.join(FRONT_END_DIST_PATH, 'index.html');
export const QUOTE_DATA_CACHE_TIME = 60000 * 5;
