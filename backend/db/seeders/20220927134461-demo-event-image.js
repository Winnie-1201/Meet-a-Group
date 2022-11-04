"use strict";

const eventImages = [
  {
    eventId: 1,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
  },
  {
    eventId: 2,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
  },
  {
    eventId: 3,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
  },
  {
    eventId: 4,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
  },
  {
    eventId: 5,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
  },
  {
    eventId: 6,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
  },
  {
    eventId: 7,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
  },
  {
    eventId: 8,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
  },
  {
    eventId: 9,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
  },
  {
    eventId: 10,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
  },
  {
    eventId: 11,
    url: "http://drive.google.com/uc?export=view&id=1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB",
    preview: true,
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
