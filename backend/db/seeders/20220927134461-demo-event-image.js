"use strict";

const eventImages = [
  {
    eventId: 1,
    url: "image-url-1",
    preview: true,
  },
  {
    eventId: 2,
    url: "image-url-2",
    preview: true,
  },
  {
    eventId: 3,
    url: "image-url-3",
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
