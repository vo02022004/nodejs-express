'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //     email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // firstName: DataTypes.STRING,
    // lastName: DataTypes.STRING,
    // address: DataTypes.STRING,
    // phoneNumber: DataTypes.INTEGER,
    // gender: DataTypes.BOOLEAN,
    // image: DataTypes.STRING,
    // roleId: DataTypes.STRING,
    // positionId: DataTypes.STRING,
    return queryInterface.bulkInsert('users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstname: 'Vo',
      lastname: 'Tu',
      address: 'vietnamese',
      phoneNumber: '0388379224',
      gender: 1,
      image: '',
      roleId: 'R1',
      positionId: 'doctor',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
