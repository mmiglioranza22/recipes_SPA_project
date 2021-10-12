# Food recipes SPA - [Link to site](https://recipes-spa-project.vercel.app/)

### About
In this SPA you will be able to search for recipes using multiple filters and you can also create your own recipes. This project was an individual assignment requested at soyHenry's bootcamp (and my first proyect ever!)

- *Front-end*: React.js, Redux.js, plain CSS / CSS Modules.

- *Back-end*: Node.js, Express.js

- *DB*: PostgreSQL (ORM: Sequelize)

- *External API*: [Spoonacular](https://spoonacular.com/food-api)

- *Deploy*: Heroku & Vercel (I followed the [best step-by-step deploy guide](https://github.com/Zven7/Guia-Deploy) from [Zven7](https://github.com/Zven7))


## Installation (run from localhost)

*You'll need Nodejs and PostgreSQL installed in your computer*

- Clone this repo in a new folder/directory in your machine
- Install all dependencies inside ./api folder (npm install)
- Install all dependencies inside ./client folder (same thing)
- Create a postgres database (name it 'food')
- Go to https://spoonacular.com/ and create an account in order to obtain an apiKey
- Once you have your apiKey, create a .env file in ./api with the following:
    - DB_USER={your postgres username}
    - DB_PASSWORD={your postgres password}
    - DB_HOST=localhost
    - DB_NAME={your postgres database name}
    - API_KEY_1={your spoonacular apiKey}

- Open a terminal and run "npm start" on ./api
- Open another terminal and run "npm start" on ./client

## Disclaimer
All images shown in this project were obtained from the internet and are used with the sole and unique intention of fulfilling an educational assignment. This project is not intended nor allowed to be used for commercial purposes or the like. No legal ownership or copyright is claimed on the above-mentioned images, belonging to their rightful owners. If you have comments or complaints in this regard, please contact me at mmiglioranza22@gmail.com for further discussion.

The project does not contain a fully developed CRUD since it was not requested for this project, yet its development and implementation will eventualy be uploaded to a final version. Same thing for testing.

## Preview (desktop):
### Landing page
![Screenshot at 2021-07-29 12-52-50](https://user-images.githubusercontent.com/79772395/127535639-efc9ad88-2faf-45d5-b5f9-8901cd125600.png)


### Home (/home)
![Screenshot at 2021-07-29 12-54-03](https://user-images.githubusercontent.com/79772395/127535930-66a71015-4961-489a-bb68-45074a9df4ea.png)


### Filters

![Screenshot at 2021-07-29 12-54-34](https://user-images.githubusercontent.com/79772395/127535955-7dd768fe-b1c8-4009-816c-57b750e7628e.png)

![Screenshot at 2021-07-29 12-55-05](https://user-images.githubusercontent.com/79772395/127536007-4cf04bf7-3f24-403b-9626-119aed4ce013.png)

### Recipe creation form

![Screenshot at 2021-07-29 13-00-02](https://user-images.githubusercontent.com/79772395/127536124-816fde68-4e10-41e9-996a-747c264f4170.png)


### Created recipes

![Screenshot at 2021-07-29 13-00-49](https://user-images.githubusercontent.com/79772395/127536162-48e671a3-3581-4a6d-9ad5-a2c0e54c7767.png)


### Recipe details

![Screenshot at 2021-07-29 14-18-44](https://user-images.githubusercontent.com/79772395/127536434-91743f88-ba52-470f-a2bb-c2ca8b2528b8.png)
