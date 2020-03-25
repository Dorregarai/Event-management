const express = require('express');
const controller = require('../controllers/eventOrg');
const auth = require('../middleware/auth');
const router = express.Router();

router.get("/", controller.getEventList);
router.post("/", controller.createEvent);
//router.put("/:id", controller.subscribeEvent);

router.get("/current", auth, controller.getUsers);
router.post("/registrate", controller.registrateUser);
router.post("/authorization", controller.authorization);

module.exports = router;