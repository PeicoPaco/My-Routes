const {Sequelize} = require('sequelize'); 

const sequelize = new Sequelize('myroutesdb', 'postgres', '7415963Qwe$', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = sequelize