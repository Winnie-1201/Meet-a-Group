"use strict";

// const { User, Event, Venue, GroupImage, Membership } = require("../models");

const groups = [
  {
    organizerId: 1,
    name: "Hiking Group",
    about: "This is the first group",
    type: "In person",
    private: false,
    city: "Flagstaff",
    state: "AZ",
  },
  {
    organizerId: 2,
    name: "Pets Group",
    about: "This is the second group",
    type: "In person",
    private: false,
    city: "San Francisco",
    state: "CA",
  },
  {
    organizerId: 3,
    name: "Road Trip Group",
    about: "This is the third group",
    type: "In person",
    private: false,
    city: "Los Angeles",
    state: "CA",
  },
  // {
  //   name: "",
  //   about: "",
  //   type: "",
  //   private: "",
  //   city: "",
  //   state: "",
  // },
  // {
  //   name: "",
  //   about: "",
  //   type: "",
  //   private: "",
  //   city: "",
  //   state: "",
  // },
  // {
  //   name: "",
  //   about: "",
  //   type: "",
  //   private: "",
  //   city: "",
  //   state: "",
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
    await queryInterface.bulkInsert("Groups", groups, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Groups", null, {});
  },
};
