# Running the Application

- run `git clone https://github.com/Crizzooo/stock-quotes.git`
- run `cd stock-quotes`
- run `npm run init`
    - this will install all modules in the UI and the API
    - this will then build both the UI and the API
- if everything is okay, run `npm start`
    - this starts the express server, but not the react development server
    - express server will serve the application  regardless
- open `http://localhost:3001/`

# Using the Application
- search by a symbol or company name by typing in the input
- results will populate when 2 or more characters are present
- click a search result to populate quote information
- or, visit http://localhost:3001/quotes/___SYMBOL_HERE___ and replace the last term with the symbol you are looking for