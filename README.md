# Website Requirements

You can think of this as a very simple Google or Yahoo finance.

Here is the functionality the website **must** have.

* A search box to search for symbols.
* A display of the results of the search and allow the user to select a single result.
* Display data on the selected result. At minimum you should display the last price and the last 30 days chart.

# API Requirements

You should expose whichever endpoints make sense to provide the data you'll use in the UI.

To get the data you'll be using the IEX API documented here: https://iextrading.com/developer/docs/.

> NOTE: Some of the necessary data are available from multiple IEX endpoints. You may use whichever endpoint you prefer.

Although the IEX API is free and scalable, there's no need to query it constantly. Data about each symbol should be cached so that IEX is only queried at most about once every 5 minutes.


### Starter files (Optional)

If you don't plan on using NodeJs for the API or React from the UI you can skip this section.

Included are two folders `quote-api` and `quote-ui` that contain simple starter files for each part of the project.

The `quote-api` starter is a simple entry point express server `app.js`, with a build script `npm run build` and start script `npm start` already set up for you. This build uses express for the server and babel and webpack so you're set up with the latest and greatest in Javascript.

The `quote-ui` is a single page React app built using `create-react-app` that can be built with the command `npm run start`.

The starter files simply exist to avoid dealing with the boring and uninformative aspect of getting builds set up. You **do not** need to use these files or even Javascript and React, though you are encouraged to do if you're familiar with them. If you do use other technologies for either the front or backend simply include them in your response with instructions on how to run them.

Thank you for your time and best of luck!
