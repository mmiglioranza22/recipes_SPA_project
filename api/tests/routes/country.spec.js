/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');
const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  summary: 'El README pide que este atributo no sea nulo, por eso lo agregué'
};
const dietTypes = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian', 'ovo vegetarian', 'lacto ovo vegetarian', 'vegan', 'pescatarian', 'paleo', 'primal', 'whole30', 'dairy free'];


describe('Recipe routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe))
    .then(() => {
      dietTypes.map((diet) => {
        Diet.create({
          name: diet
        })
      })
    })
  );
  describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/types').expect(200)
    );
  });
  // describe('get /recipe', () => {
  //   it('should get 404 if nothing is sent', () =>
  //     agent.get('/recipe').expect(404)
  //   );
  //   it('should get 200 if recipe is sent correctly', () =>
  //     agent.get('/recipe').expect(404)
  //   );
  // })
});
