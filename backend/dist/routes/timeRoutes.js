"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timezone_controller_js_1 = require("../controllers/timeController/timezone.controller.js");
const timeslot_controller_js_1 = require("../controllers/timeController/timeslot.controller.js");
const router = (0, express_1.Router)();
router
    .route('/timezones')
    .get(timezone_controller_js_1.getTimezonesController);
router
    .route('/timeslots')
    .get(timeslot_controller_js_1.getTimeslotsController);
exports.default = router;
