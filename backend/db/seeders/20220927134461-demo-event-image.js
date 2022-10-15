"use strict";

const eventImages = [
  {
    eventId: 1,
    url: "https://drive.google.com/file/d/1urmijsNQnIaCXBrtHz9EV5QRvmV9kfdt/view?usp=sharing",
    preview: true,
  },
  {
    eventId: 2,
    url: "https://drive.google.com/file/d/1QFULo-ZCutEfzNEmeaGEv8dQdLyLAbtc/view?usp=sharing",
    preview: true,
  },
  {
    eventId: 3,
    url: "https://drive.google.com/file/d/1s2m4KUrp0d0BzPucsrYs8XXJSEU7FJ5u/view?usp=sharing",
    preview: false,
  },
  // {
  //   eventId: 1,
  //   url: "",
  //   preview: true,
  // },
  // {
  //   eventId: 2,
  //   url: "",
  //   preview: "",
  // },
  // {
  //   eventId: 3,
  //   url: "",
  //   preview: "",
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
    await queryInterface.bulkInsert("EventImages", eventImages, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("EventImages", null, {});
  },
};
