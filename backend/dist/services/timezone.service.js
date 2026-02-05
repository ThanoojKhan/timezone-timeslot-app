"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimezones = getTimezones;
const Timezone_1 = __importDefault(require("../models/Timezone"));
async function getTimezones() {
    const data = await Timezone_1.default.find()
        .select("-_id id name offset iana")
        .lean();
    return data;
}
