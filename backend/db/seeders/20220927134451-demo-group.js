"use strict";

// const { User, Event, Venue, GroupImage, Membership } = require("../models");

const groups = [
  {
    organizerId: 1,
    name: "Mini Adventures For Free - Hiking, Dancing, Sports & More",
    about:
      "Our meetups include hikes,biking, dancing,Classes, picnics, sport games, concerts, happy hour, and whatever else that attracts interest. Meet at bars, or anywhere that sounds fun.",
    type: "In person",
    private: false,
    city: "Flagstaff",
    state: "AZ",
  },
  {
    organizerId: 2,
    name: "San Francisco Pets and Fun Paint Party Meetup",
    about:
      "Join us at Dog friendly restaurant Barking Dog on SF upper East side or in Central Park. How about an Online Sip and Paint Party with all your friends.",
    type: "In person",
    private: false,
    city: "San Francisco",
    state: "CA",
  },
  {
    organizerId: 3,
    name: "NY to Anywhere, Road Trips Meetup Group (car not needed)",
    about:
      "This group for anyone that loves road trips. Short trips, long trips, it does not matter, if you have a story or an interest in meeting likeminded individuals with the bug for exploration.",
    type: "In person",
    private: false,
    city: "New York",
    state: "NY",
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
