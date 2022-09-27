"use strict";

// const { Venue, Group } = require("../models");

const events = [
  {
    venueId: 1,
    groupId: 1,
    name: "group number one",
    description: "It is the first group in the project",
    type: "In person",
    capacity: 20,
    price: 18.5,
    startDate: new Date("2022-10-02 8:00:00"),
    endDate: new Date("2022-10-02 10:00:00"),
  },
  {
    venueId: 2,
    groupId: 2,
    name: "group number two",
    description: "It is the second group in the project",
    type: "Online",
    capacity: 40,
    price: 15.0,
    startDate: new Date("2022-11-02 11:00:00"),
    endDate: new Date("2022-11-02 12:00:00"),
  },
  {
    venueId: 3,
    groupId: 3,
    name: "group number three",
    description: "It is the third group in the project",
    type: "In person",
    capacity: 12,
    price: 19.99,
    startDate: new Date("2022-11-11 14:00:00"),
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
