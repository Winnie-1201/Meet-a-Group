"use strict";

// const { Venue, Group } = require("../models");

const events = [
  {
    venueId: 1,
    groupId: 1,
    name: "Free Webinar on Hiking Safety and Technology",
    description:
      "Join experts from Montrose Search & Rescue (SAR) and Sierra Club's Wilderness Travel Course (WTC) for a discussion on how technology has changed the landscape of hiking safety. Learn tips, tricks and tools that you can leverage to stay safe in the outdoors. Montrose SAR will share real-life examples of recent rescues and provide insight on what could be done to avoid or address those situations in real time. WTC will provide advice on what hikers can do to stay safe while hiking our local mountains both on and off the trail, using modern technology as well as traditional wilderness skills.",
    type: "Online",
    capacity: 20,
    price: 0.0,
    startDate: new Date("2022-11-02 8:00:00"),
    endDate: new Date("2022-101-02 17:00:00"),
  },
  {
    venueId: 2,
    groupId: 2,
    name: "HOWLOWEEN Sip and Paint a Pet Portrait Fun- Barking Dog",
    description: `What better way to celebrate the Fall than going to a dog friendly restaurant and a painting a portrait with your dog in Costume? It’s a chance to enjoy some fun good with food and drinks with your pup. Relax with your pup at Barking Dog restaurant on the Upper East Side in Manhattan New York City and Paint your Pet Portrait with personal Artist one on one instruction.`,
    type: "In person",
    capacity: 5,
    price: 0.0,
    startDate: new Date("2022-11-04 7:00:00"),
    endDate: new Date("2022-11-04 9:00:00"),
  },
  {
    venueId: 3,
    groupId: 3,
    name: "Let's visit Sleepy Hollow and Kykuit and Philips Manor",
    description:
      "Hudson Valley is still full of fall colors. There aren't too many places that are synonyms with Halloween than Sleepy Hollow, the home of the Headless Horseman. Let's visit this charming town, check out the statue of the Headless Horseman and walk through the spooky Sleepy Hollow cemetery. Full of grandiose and opulent mausoleums that are home to many famous figures, including Washington Irving who wrote 'The Legend of Sleepy Hollow'. And other famous historical individuals including various Carnegie and Rockefeller family members. We will also tour Kykuit Estate, gardens and Philips Manor. This Rockefeller estate has been closed during the pandemic but is finally offering tours. With rich and troubled history, we will journey to Colonial America of 1750 where 23 enslaved individuals called Phillips Manor home. We will also have a nice dinner together after our visit and tour. We will meet in the city and travel together in a comfortable passenger van. The cost of the trip, including the Kykuit estate tour is $95",
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
