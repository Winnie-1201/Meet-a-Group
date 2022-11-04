"use strict";

// const { Group } = require("../models");

// https://drive.google.com/file/d/1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji/view?usp=sharing
const groupImages = [
  {
    groupId: 1,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
    preview: true,
  },
  {
    groupId: 2,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
    preview: true,
  },
  {
    groupId: 3,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
    preview: true,
  },
  {
    groupId: 4,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
    preview: true,
  },
  {
    groupId: 5,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
    preview: true,
  },
  {
    groupId: 6,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
    preview: true,
  },
  {
    groupId: 7,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
    preview: true,
  },
  {
    groupId: 8,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
    preview: true,
  },
  {
    groupId: 9,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
    preview: true,
  },
  {
    groupId: 10,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
    preview: true,
  },
  {
    groupId: 11,
    url: "http://drive.google.com/uc?export=view&id=1vbUq41sOZnYDjZwJmidPHNmPvIB_lDji",
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
