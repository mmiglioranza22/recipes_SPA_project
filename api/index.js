//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet, Recipe } = require('./src/db.js');

// Syncing all the models at once.

const dietTypes = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian', 'ovo vegetarian','lacto ovo vegetarian', 'vegan', 'pescatarian', 'paleo', 'primal', 'whole30', 'dairy free'];

conn.sync({ force: true })
.then(() => {
  server.listen(3002, () => {
    console.log('%s listening at 3002'); // eslint-disable-line no-console

    dietTypes.map( async (diet) => {
      await Diet.create({
        name: diet
      })
    })

    console.log('Dietas precargadas')
  });
});
