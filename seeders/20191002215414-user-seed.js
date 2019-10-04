'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      email: 'felix@gmail.com.',
      apiKey: '12345',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'glynni@gmail.com.',
      apiKey: '23456',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'sarah@gmail.com.',
      apiKey: '23458',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'tay@gmail.com.',
      apiKey: '23459',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
