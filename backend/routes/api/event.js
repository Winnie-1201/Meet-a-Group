const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const {
  Group,
  User,
  EventImage,
  Venue,
  Membership,
  Event,
  Attendance,
  sequelize,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const e = require("express");
const user = require("../../db/models/user");

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

// Get all events;
router.get("/", async (req, res, next) => {
  const events = await Event.scope("allEvents").findAll({
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

// Get details of an event specified by its id;
router.get("/:eventId", async (req, res, next) => {
  const eventId = req.params.eventId;
  let events = await Event.findByPk(eventId, {
    include: [
      {
        model: Group,
        attributes: ["id", "name", "private", "city", "state"],
      },
      {
        model: Venue,
        attributes: ["id", "address", "city", "state", "lat", "lng"],
      },
      {
        model: EventImage,
        attributes: ["id", "url", "preview"],
      },
    ],
  });

  if (!events) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }

  const attendees = await Attendance.findAll({
    where: { eventId },
  });

  events = events.toJSON();
  events.numAttending = attendees.length;

  res.json(events);
});

// Add an image to an event based on the event's id;
router.post("/:eventId/images", requireAuth, async (req, res, next) => {
  const eventId = req.params.eventId;
  const userId = req.user.id;
  const { url, preview } = req.body;

  const event = await Event.findByPk(eventId);
  if (!event) {
    res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404,
    });
  }
  const groupId = event.toJSON().groupId;
  const group = await Group.findByPk(groupId);

  const authUsers = await Attendance.findAll({
    where: {
      userId,
      eventId,
      status: "member",
    },
  });

  if (group.toJSON().organizerId === userId || authUsers.length) {
    const newImage = await EventImage.create({
      eventId,
      url,
      preview,
    });
    res.json({
      id: newImage.id,
      url,
      preview,
    });
  } else {
    const err = new Error("The current user does not have access.");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
