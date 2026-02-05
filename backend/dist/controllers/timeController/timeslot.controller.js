"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeslotsController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const timeslot_service_1 = require("../../services/timeslot.service");
exports.getTimeslotsController = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const data = await (0, timeslot_service_1.getTimeslotsUTC)();
    return res.status(200).json(data);
});
