# SkyLinks

SkyLinks is a 3D Flight Visualization Application. App that is used to visualize flight routes around the world and allows users to select a specific departure and arrival and see current flights traveling on that route.

Bulit in 2 weeks with a bootleg of @NimaBoscarino's [React Rails Boilerplate](https://github.com/NimaBoscarino/react-rails-boilerplate). It uses the same React app, but replaces the Rails server with an Express server.

By [Rene Roger](https://github.com/renemroger), [Scott Appleton](https://github.com/Scott09), and [Haibin Zhu](https://github.com/ssspiderzzz)

# Features

!["Screenshot for Skylinks Feature 1"](https://github.com/Scott09/skylinks/blob/spider/readme/react-front-end/public/gifs/Skylinks%20-%20gif%20-%2001.gif)

!["Screenshot for Skylinks Feature 1"](https://github.com/Scott09/skylinks/blob/spider/readme/react-front-end/public/gifs/Skylinks%20-%20gif%20-%2002.gif)

!["Screenshot for Skylinks Feature 1"](https://github.com/Scott09/skylinks/blob/spider/readme/react-front-end/public/gifs/Skylinks%20-%20gif%20-%2003.gif)

!["Screenshot for Skylinks Feature 1"](https://github.com/Scott09/skylinks/blob/spider/readme/react-front-end/public/gifs/Skylinks%20-%20gif%20-%2004.gif)

## Running the projects

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.

In the other terminal, `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server.

In the browser, you can click on the button and see the data get loaded.

If this doesn't work, please message me!

# Database setup

1. pen your terminal and run psql to access the database.
2. run CREATE DATABASE databasename
3. run \c databasename to connect to the database.
4. run \password databasename and select a password - EX: 123456
5. create a .env at the express-back-end root

###### .env sample

DB_HOST=localhost

DB_USER=username

DB_PASS=123456

DB_NAME=databasename

DB_PORT=5432

6. run npm run reset to seed the database
