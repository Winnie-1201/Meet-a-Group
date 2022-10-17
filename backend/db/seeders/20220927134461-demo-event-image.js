"use strict";

const eventImages = [
  {
    eventId: 1,
    url: "http://drive.google.com/uc?export=view&id=1BIlbjRI8loGaQD3uPczIZeKqk5AY0-Z4",
    preview: true,
  },
  {
    eventId: 2,
    url: "http://drive.google.com/uc?export=view&id=1KKIkoTmPVyWA8U7j8gBJn7WGNJR9l4HK",
    preview: true,
  },
  {
    eventId: 3,
    url: "http://drive.google.com/uc?export=view&id=1urmijsNQnIaCXBrtHz9EV5QRvmV9kfdt",
    preview: true,
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
