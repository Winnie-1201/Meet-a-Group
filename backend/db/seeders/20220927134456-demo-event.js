"use strict";

// const { Venue, Group } = require("../models");

const events = [
  {
    venueId: 1,
    groupId: 1,
    name: "Let's go hiking",
    description: "It is the first group in the project",
    type: "In person",
    capacity: 20,
    price: 50.0,
    startDate: new Date("2022-11-02 8:00:00"),
    endDate: new Date("2022-101-02 17:00:00"),
  },
  {
    venueId: 2,
    groupId: 2,
    name: "Early Morning Walk",
    description: "It is the second group in the project",
    type: "In person",
    capacity: 5,
    price: 0.0,
    startDate: new Date("2022-11-04 7:00:00"),
    endDate: new Date("2022-11-04 9:00:00"),
  },
  {
    venueId: 3,
    groupId: 3,
    name: "Freeway No 1 Road Trip",
    description: "It is the third group in the project",
    type: "In person",
    capacity: 20,
    price: 30.0,
    startDate: new Date("2022-11-11 8:00:00"),
    endDate: new Date("2022-11-11 17:00:00"),
  },
  // {
  //   name: "",
  //   description: "",
  //   type: "",
  //   capacity: "",
  //   price: "",
  //   startDate: "",
  //   endDate: "",
  // },
  // {
  //   name: "",
  //   description: "",
  //   type: "",
  //   capacity: "",
  //   price: "",
  //   startDate: "",
  //   endDate: "",
  // },
  // {
  //   name: "",
  //   description: "",
  //   type: "",
  //   capacity: "",
  //   price: "",
  //   startDate: "",
  //   endDate: "",
  // },
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
    await queryInterface.bulkInsert("Events", events, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Events", null, {});
  },
};
