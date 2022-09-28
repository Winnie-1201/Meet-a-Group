const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const {
  Group,
  User,
  GroupImage,
  Venue,
  Membership,
  Attendance,
  Event,
  EventImage,
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

const validateEvent = [
  check("venueId")
    .custom(async (value) => {
      const venue = await Venue.findByPk(value);
      if (venue) return true;
      else return false;
    })
    .withMessage("Venue does not exist"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage("Name must be at least characters"),
  check("type")
    .exists({ checkFalsy: true })
    .isIn(["Online", "In person"])
    .withMessage("Type must be 'Online' or 'In person'"),
  check("capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be an integer"),
  check("price").isNumeric().withMessage("Price is invalid"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("startDate")
    .exists({ checkFalsy: true })
    .isAfter()
    .withMessage("Start date must be in the future"),
  check("endDate")
    .exists({ checkFalsy: true })
    .custom((value, { req }) => {
      return new Date(value) - new Date(req.body.startDate) >= 0;
    })
    .withMessage("End date is less than start date"),
  handleValidationErrors,
];

const validateMember = [
  check("status")
    .exists({ checkFalsy: true })
    .custom((value) => {
      return value !== "pending";
    })
    .withMessage("Cannot change a membership status to pending"),
  check("id")
    .exists({ checkFalsy: true })
    .custom(async (value, { req }) => {
      const membership = await Membership.findOne({
        where: { userId: value },
      });
      return membership !== null;
    })
    .withMessage("User couldn't be found"),
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

// Get all events of a group specified by its id;
router.get("/:groupId/events", async (req, res, next) => {
  const groupId = req.params.groupId;

  const events = await Event.scope("allEvents").findAll({
    where: { groupId },
    include: [
      {
        model: Group,
        attributes: ["id", "name", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "city", "state"],
      },
    ],
  });

  const group = await Group.findByPk(groupId);
  if (!group) {
    res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  }

  let result = {};
  result.Events = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i].toJSON();

    const image = await EventImage.findOne({
      where: {
        eventId: event.id,
        preview: true,
      },
    });

    const attendees = await Attendance.findAll({
      where: {
        eventId: event.id,
        status: "member",
      },
    });

    event.numAttending = attendees.length;
    event.previewImage = image === null ? null : image.toJSON().url;

    result.Events.push(event);
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
    group.numMembers = numMembers.length;
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

// Create an event for a group specified by its id;
router.post(
  "/:groupId/events",
  requireAuth,
  validateEvent,
  async (req, res, next) => {
    const groupId = req.params.groupId;
    const userId = req.user.id;
    const {
      venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate,
    } = req.body;

    const group = await Group.findByPk(groupId);
    if (!group) {
      res.status(404).json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    const cohost = await Membership.findAll({
      where: {
        userId: userId,
        groupId,
        status: "co-host",
      },
    });

    if (group.organizerId === userId || cohost.length) {
      const newEvent = await Event.create({
        groupId,
        venueId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate,
      });

      res.json({
        id: newEvent.id,
        groupId: newEvent.groupId,
        venueId,
        name,
        type,
        capacity,
        price,
        description,
        startDate,
        endDate,
      });
    } else {
      const err = new Error("The current user does not have access.");
      err.status = 403;
      next(err);
    }
  }
);

// Request a membership for a group based on the group's id;
router.post("/:groupId/membership", requireAuth, async (req, res, next) => {
  const groupId = req.params.groupId;
  const group = await Group.findByPk(groupId);
  const userId = req.user.id;
  const memberPending = await Membership.findOne({
    where: {
      userId,
      status: "pending",
    },
  });
  const member = await Membership.findOne({
    where: {
      userId,
      status: "member",
    },
  });

  if (!group) {
    res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404,
    });
  } else if (memberPending) {
    res.status(400).json({
      message: "Membership has already been requested",
      statusCode: 400,
    });
  } else if (member) {
    res.status(400).json({
      message: "User is already a member of the gorup",
      statusCode: 400,
    });
  } else {
    const newMember = await Membership.create({
      userId,
      groupId,
      status: "pending",
    });
    res.json({
      memberId: newMember.userId,
      status: newMember.status,
    });
  }
});

// Change the status of a membership for a group specified by id;
router.put(
  "/:groupId/membership",
  requireAuth,
  validateMember,
  async (req, res, next) => {
    const groupId = req.params.groupId;
    const userId = req.user.id;
    const { memberId, status } = req.body;

    const group = await Group.findByPk(groupId);
    if (!group) {
      res.status(404).json({
        message: "Group couldn't be found",
        statusCode: 404,
      });
    }

    const member = await Membership.findOne({
      where: {
        // groupId,
        userId: memberId,
      },
    });

    const currMember = await Membership.findOne({
      where: {
        groupId,
        // userId,
        status: "co-host",
      },
    });

    // const curr = await Membership.findOne({
    //   where: { groupId },
    // });

    const preStatus = member.toJSON().status;

    // console.log("preStatue", preStatus);
    // console.log("status", status);
    // console.log(userId, group.toJSON().organizerId);
    // console.log(currMember);
    // console.log(curr);
    if (
      status === "member" &&
      preStatus === "pending" &&
      (userId === group.toJSON().organizerId || currMember)
    ) {
      member.update({
        userId: memberId,
        status: status,
      });
      res.json({
        memberId: member.userId,
        status,
      });
    } else if (
      status === "co-host" &&
      preStatus === "member" &&
      userId === group.toJSON().organizerId
    ) {
      member.update({
        userId: memberId,
        status: status,
      });
      res.json({
        memberId: member.userId,
        status,
      });
    } else {
      const err = new Error("The current user does not have access.");
      err.status = 403;
      next(err);
    }
  }
);

module.exports = router;
