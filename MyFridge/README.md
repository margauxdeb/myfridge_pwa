# MyFridge

## Presentation

This app allow to create, manage and suppress stock list and shopping list.</br>
Each list can contain products (name, barcode and expiry) that can be managed too.</br>
Allow to create a new product and put it in a stock list.</br>
Products can be moved from stock list to shopping list when suppressed, or from shopping list to another one.</br>

## Prerequisite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.</br>

Install node & npm : [Official website](https://nodejs.org/en) </br>
Install yarn : [Official website](https://yarnpkg.com/en/docs/install)</br>
Install json server : yarn global add json-server</br>

## Install dependencies

Do `npm install` </br>
or `yarn` </br>
or `yarn install`

## Good to know

Access the server : `json-server --watch db.json`</br>
Navigate to it at this address into your browser : `localhost:3000`

## Development server

Switch `serviceWorker` to `false` into `.angular-cli.json` (by default it's at `true`)</br>

Run `ng serve --open` </br>
Navigate to `http://localhost:4200/` (the app will automatically reload if you change any of the source files.)

## Production start (if you only want to test this app)

Switch `serviceWorker` to `true` into `.angular-cli.json` (by default it's at `true`)</br>

Run :

1. `ng build --prod`
2. `cd dist`
3. `http-server -p [port]` ( choose the port you want, ie: 9000 )
4. Go to : `http://localhost:9000` in your browser