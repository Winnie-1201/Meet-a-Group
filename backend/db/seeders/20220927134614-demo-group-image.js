"use strict";

// const { Group } = require("../models");

const groupImages = [
  {
    groupId: 1,
    url: "group-image-url-1",
    preview: false,
  },
  {
    groupId: 2,
    url: "group-image-url-2",
    preview: true,
  },
  {
    groupId: 3,
    url: "group-image-url-3",
    preview: true,
  },
  // {
  //   url: "",
  //   preview: "",
  // },
  // {
  //   url: "",
  //   preview: "",
  // },
  // {
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
    await queryInterface.bulkInsert("GroupImages", groupImages, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("GroupImages", null, {});
  },
};
