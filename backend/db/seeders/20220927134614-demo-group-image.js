"use strict";

// const { Group } = require("../models");

const groupImages = [
  {
    groupId: 1,
    url: "https://drive.google.com/file/d/1GVhu4nN0O_UwKBSC0jEtES-LcPLjIaJ4/view?usp=sharing",
    preview: true,
  },
  {
    groupId: 2,
    url: "https://drive.google.com/file/d/1bpiL3ALmKm3CRogwSGkqHMnRKrnm7VDm/view?usp=sharing",
    preview: true,
  },
  {
    groupId: 3,
    url: "https://drive.google.com/file/d/1wGwNUwdMBEjM4x2MzRirh_lJ8XN7lVZB/view?usp=sharing",
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
