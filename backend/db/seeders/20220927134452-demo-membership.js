"use strict";

// const { Event, User } = require("../models");

const memberships = [
  {
    userId: 1,
    groupId: 1,
    status: "host",
  },
  {
    userId: 2,
    groupId: 2,
    status: "host",
  },
  {
    userId: 3,
    groupId: 3,
    status: "host",
  },
];

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
    await queryInterface.bulkInsert("Memberships", memberships, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Memberships", null, {});
  },
};
