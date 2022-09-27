"use strict";

// const { Event, User } = require("../models");

const attendances = [
  {
    eventId: 1,
    userId: 1,
    status: "pending",
  },
  {
    eventId: 2,
    userId: 2,
    status: "member",
  },
  {
    eventId: 3,
    userId: 3,
    status: "co-host",
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
    await queryInterface.bulkInsert("Attendances", attendances, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Attendances", null, {});
  },
};
