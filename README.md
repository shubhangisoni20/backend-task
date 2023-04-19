# Expres.js Typescript RESTful API Skeleton Project

> A skeleton project for a RESTful web service with Express.js and TypeScript

## Structure

- `src/index.ts`: entry file for the app that starts of express server
- `src/App.ts`: express app class where middleware is configured
- `src/routes/`: directory for all routes; all `*.routes.ts` files in here are automatically included by `index.ts` and injected into `App.ts`.

## Build Setup

``` bash
# install dependencies
yarn

# serve locally with hot reload on localhost:3000 (adjustable in `src/config/config.ts` or with ENV variable `PORT`)
yarn start

# build node.js version for production
yarn build

# start created production build
yarn prod

# run TypeScript linter
yarn lint