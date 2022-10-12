-----------Setting Up Projects------------------------
At first download all code by git pull request

Now open terminal and run npm i or npm install

Create a .env file in the root directory and fill up these fields

MONGOURI  &&  PRIVATE_KEY

MONGOURI is your mongodb database path 

PRIVATE_KEY is any random secret key for generating the auth token

-----------Frontend and backend Hosting----------------

Frontend is hosted on firebase

Backend is hosted on Heroku

For backend hosting make sure that Procfile and engines,scripts inside package.json must be present other wise it will be failed to create an API

One more thing after creating a heroku app goto Config Vars and click on Reveal config vars button and add all the key and value which is present on the .env file. It is important!!


!!!!! Happy Coding !!!!!