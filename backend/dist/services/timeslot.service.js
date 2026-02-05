"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeslotsUTC = getTimeslotsUTC;
const Timeslot_1 = __importDefault(require("../models/Timeslot"));
async function getTimeslotsUTC() {
    const data = await Timeslot_1.default.find()
        .sort({ utcTime: 1 })
        .select("-_id utcTime")
        .lean();
    return data.map(d => d.utcTime);
}
