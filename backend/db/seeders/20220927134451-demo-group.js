"use strict";

// const { User, Event, Venue, GroupImage, Membership } = require("../models");

const groups = [
  {
    organizerId: 1,
    name: "Mini Adventures For Free - Hiking, Dancing, Sports & More",
    about:
      "Our meetups include hikes,biking, dancing,Classes, picnics, sport games, concerts, happy hour, and whatever else that attracts interest. Meet at bars, parks, baseball/basketball games, rec-leagues, or anywhere that sounds fun. Not just for singles, not just for couples... this is for EVERYONE who wants to get off the couch and want to enjoy what the greatest city has to offer without thinking much about your buget. We have a happy hour each month where we raise money for various local charities (all voluntary donations). I'm also looking for people to help organize events so let me know if you are interested...",
    type: "In person",
    private: false,
    city: "Flagstaff",
    state: "AZ",
  },
  {
    organizerId: 2,
    name: "San Francisco Pets and Fun Paint Party Meetup",
    about:
      "Join us at Dog friendly restaurant Barking Dog on SF upper East side or in Central Park. How about an Online Sip and Paint Party with all your friends. Artist will email you a drawing of your pet or mail you the full Pet Portrait Fun Art Kit with all the supplies. Join the artist live through Zoom. Looking for ideas for a great Date Nite with your dog? Don't leave your dog at home, get out of the house, bring them with you for a night out in SF. Join me for a relaxing paint your pet paint nite with both your loved ones. One of the best date night ideas for both of you. Come paint your pet portrait have some wine and relax.",
    type: "In person",
    private: false,
    city: "San Francisco",
    state: "CA",
  },
  {
    organizerId: 3,
    name: "NY to Anywhere, Road Trips Meetup Group (car not needed)",
    about:
      "This group for anyone that loves road trips. Short trips, long trips, it does not matter, if you have a story or an interest in meeting likeminded individuals with the bug for exploration, let's meet, share stories and plan the next adventure. We take these trips together using a passenger van or a bus.",
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
