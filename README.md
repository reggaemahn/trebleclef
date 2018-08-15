[![Build Status](https://travis-ci.org/josejeevan/trebleclef.svg?branch=master)](https://travis-ci.org/josejeevan/trebleclef)


# TrebleClef
A simple podcast player built with React

## Things to note
The app is deployed to [heroku](https://treble-clef.herokuapp.com/) to provide a working sample. The demo app is not meant to be used for heavy usage because this project uses:
- the iTunes search api, which is rate limited to roughly 20 requests per minute
- the [cors-anywhere](https://github.com/Rob--W/cors-anywhere#readme) proxy which is also a similar demo instance
- the heroku instance which is a free dyno and sleeps every 30 minutes, so first load might take 7-10 seconds at times.

If you'd like to use this beyond demo purposes, I highly recommend you bring your own CORS proxy, which you can easily do by deploying an instance of cors-anywhere to heroku.

## Browser Support
The app uses `fetch` and will only work in [browsers that support this feature](https://caniuse.com/#search=fetch). To run it in other browsers, you can use a [polyfill](https://github.com/github/fetch).

## Setup
Running and testing the application

### To run the tests
`cd` into the root directory and run `yarn test`


### To run the application
`cd` into the root directory and run `yarn start`

### To run in debug/watch mode
`cd` into the root directory and run `yarn run start-dev`

This will build the project and make it available at http://localhost:3000/
