const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const {
  Group,
  User,
  GroupImage,
  Venue,
  Membership,
  sequelize,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const validateGroup = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 60 })
    .withMessage("Name must be 60 characters or less"),
  check("about")
    .exists({ checkFalsy: true })
    .isLength({ min: 50 })
    .withMessage("About must be 50 characters or more"),
  check("type")
    .exists({ checkFalsy: true })
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  check("private")
    .exists({ checkFalsy: true })
    .isIn([true, false])
    .withMessage("Private must be a boolean"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  handleValidationErrors,
];

const validateVenue = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Longitude is not valid"),
  handleValidationErrors,
];
// get all groups;
router.get("/", async (req, res, next) => {
  const groups = await Group.findAll();

  let result = {};
  result.Groups = [];

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i].toJSON();
    let id = group.id;

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

    const numMembers = await Membership.findAll({
      where: {
        groupId: id,
        status: {
          [Op.in]: ["member", "co-host"],
        },
      },
    });
    group.numMembers = numMembers.length;
    result.Groups.push(group);
  }

  res.json(result);
});

// create a group;
router.post("/", requireAuth, validateGroup, async (req, res, next) => {
  const { name, about, type, private, city, state } = req.body;
  const newGroup = await Group.create({
    organizerId: req.user.id,
    name,
    about,
    type,
    private,
    city,
    state,
  });
  res.json(newGroup);
});

// Add an image to a group based onthe gorup's id
router.post("/:groupId/images", requireAuth, async (req, res, next) => {
  const groupId = req.params.groupId;
  const { url, preview } = req.body;
  const group = await Group.findByPk(groupId);

  if (!group) {
    res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  } else {
    let newImage = await GroupImage.create({
      groupId,
      url,
      preview,
    });

    newImage = newImage.toJSON();
    let result = {};
    result.id = newImage.id;
    result.url = newImage.url;
    result.preview = newImage.preview;

    res.json(result);
  }
});

// Get all groups joined or organized by the current user;
router.get("/current", requireAuth, async (req, res, next) => {
  const currUserId = req.user.id;
  const groups = await Group.findAll({
    where: { organizerId: currUserId },
  });

  let result = {};
  result.Groups = [];

  for (let i = 0; i < groups.length; i++) {
    let group = groups[i].toJSON();
    let groupId = group.id;

    let groupJoin = await Group.findByPk(groupId);

    groupJoin = groupJoin.toJSON();
    const image = await GroupImage.findOne({
      where: {
        groupId,
        preview: true,
      },
    });
    if (!image) {
      groupJoin.previewImage = null;
    } else {
      groupJoin.previewImage = image.toJSON().url;
    }
    const numMembers = await Membership.findAll({
      where: {
        userId: currUserId,
        status: {
          [Op.in]: ["member", "co-host"],
        },
      },
    });
    groupJoin.numMembers = numMembers.length;
    result.Groups.push(groupJoin);
  }
  res.json(result);
});

// Get details of a group from an id;
router.get("/:groupId", async (req, res, next) => {
  const id = req.params.groupId;

  const numMembers = await Membership.findAll({
    where: {
      groupId: id,
      status: {
        [Op.in]: ["member", "co-host"],
      },
    },
  });

  let group = await Group.findByPk(id, {
    include: [
      {
        model: GroupImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Organizer",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Venue,
      },
    ],
  });

  if (!group) {
    res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  } else {
    group = group.toJSON();
    group.numMembers = numMembers;
    res.json(group);
  }
});

// Edit a group;
router.put("/:groupId", requireAuth, validateGroup, async (req, res, next) => {
  const id = req.params.groupId;
  const { name, about, type, private, city, state } = req.body;

  const group = await Group.findByPk(id);

  if (!group) {
    res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  } else {
    group.update({
      name,
      about,
      type,
      private,
      city,
      state,
    });
    res.json(group);
  }
});

// Create a new Venue for a group specified by its id;
router.post(
  "/:groupId/venues",
  requireAuth,
  validateVenue,
  async (req, res, next) => {
    const { address, city, state, lat, lng } = req.body;
    const groupId = req.params.groupId;
    const userId = req.user.id;

    const group = await Group.findByPk(groupId);
    if (!group) {
      res.status(404).json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }
    const cohost = await Membership.findAll({
      where: {
        groupId,
        status: "co-host",
        userId,
      },
    });
    if (group.organizerId === userId || cohost.length) {
      const newVenue = await Venue.create({
        groupId,
        address,
        city,
        state,
        lat,
        lng,
      });

      let result = {};
      result.id = newVenue.id;
      result.groupId = newVenue.groupId;
      result.address = newVenue.address;
      result.city = newVenue.city;
      result.state = newVenue.state;
      result.lat = newVenue.lat;
      result.lng = newVenue.lng;

      res.json(result);
    } else {
      const err = new Error("The current user does not have access.");
      err.status = 403;
      next(err);
    }
  }
);

// Get all venues for a group specified by its id;
router.get("/:groupId/venues", requireAuth, async (req, res, next) => {
  const groupId = req.params.groupId;
  const currUserId = req.user.id;

  const group = await Group.findByPk(groupId);
  if (!group) {
    res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  const cohost = await Membership.findAll({
    where: {
      userId: currUserId,
      groupId,
      status: "co-host",
    },
  });
  if (group.organizerId === currUserId || cohost.length) {
    const Venues = await Venue.findAll();
    res.json({
      Venues,
    });
  } else {
    const err = new Error("The current user does not have access.");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
