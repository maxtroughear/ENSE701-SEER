# ENSE701

[![Build Status](https://travis-ci.com/maxtroughear/ENSE701-SEER.svg?branch=master)](https://travis-ci.com/maxtroughear/ENSE701-SEER)

## SEER (Software Engineering Evidence Repository)
**Created by** Max Troughear, Matthew Rook, Michael Rust


## Usage

To use this stack, a `MONGO_URL` is a required environment variable for the backend api

The dev server can be started by running from the top level directory

    npm install
    npm run dev

The full stack can be started by running the following from the top level directory. This will install all dependencies for both the backend and frontend, create an optimised build of the frontend and start the backend server. The backend server will then serve the optimised build of the frontend.

    npm run build
    npm start

The backend API can be started by navigating to the `api` directory and running

    npm install
    npm start

The frontend React App can be started by navigating to the `client` directory and running

    npm install
    npm start

Or to build the optimised app run

    npm install
    npm run build

And use any static web server to host the optimised build

For more details regarding the frontend React App see the [README](client/README.md) in the `client` directory
