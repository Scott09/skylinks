# SkyLinks

SkyLinks is a 3D Flight Visualization Application. App that is used to visualize flight routes around the world and allows users to select a specific departure and arrival and see current flights traveling on that route.

This repository is a bootleg of @NimaBoscarino's [React Rails Boilerplate](https://github.com/NimaBoscarino/react-rails-boilerplate). It uses the same React app, but replaces the Rails server with an Express server.

By [Rene Roger](https://github.com/renemroger), [Scott Appleton](https://github.com/Scott09), and [Haibin Zhu](https://github.com/ssspiderzzz)

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

## Next steps

From here, you can start working on your project!

As soon as the dependencies are installed, your Express server can serve JSON and static assets (like images) in response to API calls from the React app. You can get started on developing your React app, routing plan, etc. right away! Any request that isn't handled by React is passed on to the Express server. That means that you can call a route like `/api/users` from React using `fetch`, `axios`, or something else, and Express will receive it as though they originated from the same app. For routing, best practice is to namespace all of your data routes to `/api`, so that they don't clash with other routing schemes, like React Router.

At some point, you'll likely want to install and configure a database driver for Postgres or MongoDB-- Refer to past projects for hints on how to do this.

And don't forget to update the README!

## Example Projects

You might want to look at examples of projects that have used this boilerplate for hints on how to extend it. Here are a few:

- [Later Cart](https://github.com/bonitac/later-cart)
- [Buddi.io](https://github.com/Danny-Tran/buddi.io)

If you'd like your project added to the list, please shoot me a message.

## Contact

Please contact me on Slack (@garrettgsb) or Nima at `nima@lighthouselabs.com` if you have any questions, requests, or feedback, or post an issue to this repo. If you are using the boilerplate, I'd love to hear from you as well!
