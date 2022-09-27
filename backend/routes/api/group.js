const express = require("express");
const router = express.Router();

const { Group, User, GroupImage, sequelize } = require("../../db/models");

router.get("/", async (req, res, next) => {
  const groups = await Group.findAll({
    include: {
      model: User,
      attributes: [],
    },
    group: "organizerId",
    attributes: [
      "id",
      "organizerId",
      "name",
      "about",
      "type",
      "private",
      "city",
      "state",
      "createdAt",
      "updatedAt",
      [sequelize.fn("COUNT"), "numMembers"],
    ],
    // attributes: [[sequelize.fn("COUNT"), "numMembers"]],
  });

  let result = {};
  result.Groups = [];

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i].toJSON();
    let id = group.id;
    console.log(id);
    const image = await GroupImage.findOne({
      where: {
        id,
        preview: true,
      },
    });
    if (!image) {
      group.previewImage = null;
    } else {
      group.previewImage = image.toJSON().url;
    }
    result.Groups.push(group);
  }

  res.json(result);
});

module.exports = router;
