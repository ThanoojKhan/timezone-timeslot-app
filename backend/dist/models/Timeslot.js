"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TimeslotSchema = new mongoose_1.Schema({
    utcTime: { type: String, required: true }
}, { timestamps: true });
const TimeslotModel = mongoose_1.models.Timeslot || (0, mongoose_1.model)("Timeslot", TimeslotSchema);
exports.default = TimeslotModel;
