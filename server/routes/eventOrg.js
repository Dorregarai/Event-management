const express = require('express');
const controller = require('../controllers/eventOrg');
const router = express.Router();

router.get("/", controller.getEventList);
router.post("/", controller.createEvent);
router.put("/", controller.editEvent);
router.put("/:id", controller.removeEvent);

module.exports = router;