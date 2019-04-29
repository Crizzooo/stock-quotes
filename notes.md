# Overview
Overall, I had a lot  of fun with this project as it involved demoing multiple different skills involved in fullstack development.

I focused much of my time and design around creating 'fast' functionality versus a slick UI, and the UI could certainly use a more developed style, but its responsive (enough) and simple for what it does.

I actually haven't used create-react-app before and am more used to manually controlling everything in my webpack configs, so I spent some time configuring the project to be a more familiar development environment.

- added proxying, so that when viewing the app from the development server, you could still change the URL to http://localhost:3000/api/stocks/quotes/GOOG to directly view the API response. I also needed to allow CORS on the server to receive API responses in the application on the dev server.
- added source maps to the backend, which slows the build process but was useful for development

When designing the application, I gave a lot of thought to the search feature on both the front end and back end, and I am satisfied with how smooth it is. 

The backend will load all IEX Symbols when it is initially turned on, and cache them forever. Obviously, this would not be acceptable in a real production environnment and we may want to consider something like redis, with scripts that can update the cache more frequently. But for our purposes this works.

I thought about sending all of the symbols to the front end on load ( 8950 of them ), and would like to discuss the pros and cons of doing so, as I know this isnt a 'massive' payload per se and internally at work, we do a lot of client side processing. 

However, I opted to keep the web app as light as possible, by searching the list of symbols on the backend. 

To keep that search fast, when loading all symbols on server initialization, I create search trees of the Tickers and Company Names. When typing in the application search bar, a request will constantly go to the backend to get all search results - trying for both symbol matches and company names.

The idea was to avoid iterating over the entire array of almost 9000 companies, but again, I know that that dataset isnt THAT large. This was probably over engineered in that regard, but I wanted to demo a more complex solution, and I'd love to know your approach to a problem like this. Searching on the backend will generally only take a few ms now ( sometimes less than 1 ), so I'd consider it successful. With more time, I wanted to write a script to test the performance of iterating over the 9000 companies to find ticker matches, vs using the search tree.

I elected not to debounce the search results on the front end, but will do a search request for every typed character after 2 characters. Sometimes debouncing can feel a bit sluggish to the user, but the server is at risk of being 'bombed' by continually updating that search input with strings programatically.

The search results dropdown is inspired by google, which has a constant drop down of suggested results. While searching results for your latest entered character (i.e GOOG), the results will still display the results for 'GOO', which can be helpful for a user to notice that they may be able to stop typing and already have the result they are looking for.

Every search result is stored in the state of the web app, to again, decrease server load for repeated search terms, and to keep the search fast. To help with this request logic and updating results while multiple search requests are possibly going on, I elected to use Redux Saga over Redux Thunk. I honestly have not used Saga's before, but it seemed like it made the logic a bit easier, and I'd use them again in the future, or begin learning Redux Obseravbles. I've only used Thunks in the past, but am always open to learning and immitating the solutions and best practices established by the team.

After selecting a search result, the backend is queried to fetch the Quote data. I wrote a small Cache class, where the backend caches results for a symbol and deletes them after an interval. Any requests during that time period will be served from the cache instead. This interval is set in the backend configs folder so that this business logic can easily be updated.

It seems that sometimes the IEX API is really fast for new results, or sometimes takes a few seconds. Loading from the cache is always going to be closer to 1 to 3ms serve time, whereas IEX can be 1000ms to 6000ms. As it's a test app, I've left console.log's in the server to easily see when it is using the cache, or how long it is waiting for IEX  data.

All in all, I spent around 10 hours actually coding on this application. Some of that was spent on development environment and project configuration. 

I took care to organize my codebase in a way that ( while not perfect ), can somewhat easily be scaled for additional front-end/back-end routes, additional data services, or additional utilities. The backend tries to keep a separation of concerns, by keeping route specific logic away from the data layer and core busienss logic. This means that the quote route is using the cache, but it would be easy enough to write backend scripts that interact directly with the IEX service and not use the caching layer. 

With more time, I would have set up webpack aliases on both the front end and backend to make importing from different files easier.

- i.e instead of `import from '../.../reducers'` in a nested folder, we could have `import from 'Reducers/'` which makes reorganizing a lot easier than correcting all relative import paths;

I may have spent too much time on pre mature optimization, and am embarassed to turn in work without automated tests. While I dont have much experience with front end mock testing, I would have preferred to write unit tests for all of my routes, data services, and utility classes.

If the lack of testing is going to be an immediate deal breaker, I would be grateful for the opportunity for one more day to add  unit testing coverage at least to the backend. I know and value the importance of testing, the peace of mind it brings to making changes and testing on different deployment environnments, and certainly respect the impact that the lack of automated tests can have on a start up that pushes out broken code to its users, leaving a bad impression.

That's a long summary, so I'll try to provide a quick overview of the app architecture below.

## Back End

The backend is largely isolated to the code within the `src` folder. The www script has been modified to run an async function to build the express app before listening. This function is responsible for loading symbols from IEX and building the search trees and symbol cache. As this functionality is required for the entire app, a failure will prevent the server from turning on. A retry / fallback mechanism to avoid caching/searching should certainly be included if this was production quality code.

### File Structure 

- api
    - holds all routes and route specific logic. The entire api is nested under `/api` and right now only has the `/api/stocks/` routes below it
- config
   - holds useful project wide configuration settings, such as the folders for serving static files and the clear timer of the quoteData cache
- services
    - Classes that support functionality of the route logic
    - QuoteCache
        - simple caching system for caching of quote data by symbol
    - StockQuotes
        - Wrapper class around the IEX API endpoints we are using, separated from route logic for easy enhancements or support of other backend  scripts
    - SymbolCache
        - Supports Caching of Symbols on server load
        - Holds the search trees by Company Name and Symbol to optimize the providing of search results to the front end
- utils
    - Generic classes that support configurable caching and creation of search trees
    - Cache
        - This is basically a wrapper around the native `Map() class` in Javascript, with enhannced options for automatically clearing entries. This can easily be expanded to support other configurable features
        - It might have been easier to handle caching ourselves with a native object rather than using the Map class
        - I also added support unnecessarilly for all of the Map API to the class and there is probably an easier way to do this. I debated ripping out all functionality that is not used in the backend, but for now, it supports all functionality of the base Map class for future use cases.
        - This really should benefit from unit testing
    - SearchTree
        - Generic class that creates a search tree of some data set, by a stringified property value.
        - It's used to create search trees of all Symbols and Company Names, and then has a built in recursive find() function that will run in O(n) time where N is the length of characters in your search string, rather than the size of the data set. We've obviously increased the required space on our server to support a faster search performance ( relative to the amount of characters in the cached properties of the dataset )
        - Again, this really should be unit tested
- app.js
    - This is the core express server, and I'd begin reading the code base from here followed by the api routes.

### Added Backend Technologies
- axios - for interacting with IEX API
- cors - for an easy way to allow cross origin requests
- morgan - quick server logging, but in production we would want to log this to a file or database for enhanced monitoring
- babel-polyfill - to allow async class methods

## Front End
The Front End was largely designed with fast functionality in mind, rather than a sleek UI or styles. I do value design though, and can provide screenshots of some nicer UIs I have built in the past to demo this skill set.

### Added Technologies
- react-router - possibly overkill, but allows the user to jump / save a link to view the quote of specific stocks without needing to use the app search functionality
- react-redux - used for handling state of search results
- redux-logger - mostly for development purposes, but I've left it in as a test app
- reselect - centralized way of pulling data from the store and performing logic that would be a bit  messy to have in the reducer or components themselves. I'm a big fan of usinng selectors for reasons we could discuss
-  redux-saga  - over engineered for a small application, but it made the logic simpler to support the smooth searching functionality I wanted to demonstrate
- highcharts & react-highcharts-jsx - to support charting functionality

### File Structure
Everything about our front end can be found in the `src` folder, and completed builds are served out of the `build` folder. I haven't used the public folder created by create-react-app and assume it could have been deleted, but this would be where we keep any static files,  and the Express server would also have to be edited to server static assets from here.
- src
    - css
        - I'm unsure of best practice to keep all CSS in this folder or closer to the components. I've left the CRA sitewide index.css in here, and let relative component CSS files be located next to the component files.
    - Components
        - Header
            - wrapper around the search functionnality
        - Search
            - holds CSS for the search bar and results, and the appropriate components for each
            - the lower level Search Input uses React Hooks, which meant that some data had to be passed down a couple levels to it. Might not have been the best idea to experiment with new technologies in a challenge, or to switch styles within one application.
        -  Quote
            - holds components for displaying information about a quote, a component that uses highcharts but is hardcoded for our usage rather than a generic chart component
    - reducers
        - StockSearch
            - I only used a reducer for handling the caching of search results and returning of relevant results. The Quote components got by with Class based state on their own
    - requests
        - small file that holds generic fetch functions for our main backend routes


##  Other thoughts
- I only noticed that www was formatted with spaces instead of tabs after configuring eslint and my environnmet to use tabs. I've got no problem converting to spaces and converting to the style sheet used by whatever team I am on
- I am only displaying a chart of the last month, but the API Service currently can be called with different chart lengths supported by IEX from other scripts, and the front end could easily be enhanced to support a dropdown chart with these values to update the data timeline and chart
- I definitely over engineered a bit of architecture and solutions here, causing me to go over the budgeted time and turn in a project with no test specs. I hope it will however demonstrate that I am enjoy and am able to learn new technologies, new patterns, and am always thinking of performance or reusability 
- The main goal was to demonstrate I am proficient and knowledgeable on modern front end and Node.js patterns, but would like to learn more best practices, architecture ideas, and strategies to make code more maintainable. Everything Ive written here is from my own knowledge and experience, as I do not currently work with any Node.js or React engineers. I am very hungry to work with those more experienced and to adopt the improved ways they might think about and develop solutions.
