[![Netlify Status](https://api.netlify.com/api/v1/badges/acfc2936-e6da-4242-88a5-ef27b3765059/deploy-status)](https://app.netlify.com/sites/read-from-google-sheets/deploys)

# Read from Airtable API with Eleventy

> Example site: https://richclicks-signatures.netlify.app/

This site is an example of using [Eleventy's JavaScript Data Files](https://www.11ty.io/docs/data-js/) which simplify sourcing content from remote data sources and making them available as  objects to use globally across an Eleventy site.

The site is pulling content from a read-only Airtable feed at build time.


## Instructions

To get your own instance of this 11ty example project cloned and deploying to Netlify very quickly, just click the button below and follow the instructions.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/richclicks/richcliks-signatures)


## Wait, what happens when I click that button?

Good question. Here's what it will do...

1. Netlify will clone the git repository of this project into your Github account. It will be asking for permission to add the repo for you.
2. We'll create a new site for you in Netlify, and configure it to use your shiny new repo. Right away you'll be able to deploy changes simply by pushing changes to your repo.
3. That's it really.

## Changing the data source

There are a couple of steps required to expose the content from your Google Sheet as a JSON API.

1. Create an Airtable and format it with column names in the first row. The JSON feed generated will use these column names.
2. You'll use the unique ID of the base from airtable.com/api to address it later.
3. Set your API key to interact with Airtable in a .env variable in your local dev env
6. Specify the Base ID to be used when constructing the request URL in [`/src/site/_data/prod/sheet.js`](/src/site/_data/prod/sheet.js#L8)

## Local development

### Prerequisites

- [Node and NPM](https://nodejs.org/)


## Running locally

```bash
# install the dependencies
npm install

# External data sources can be stashed locally for API-less dev
npm run seed

# It will then be available locally for building with:
npm run start
```


