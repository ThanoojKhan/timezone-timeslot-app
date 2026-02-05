"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TimezoneSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    offset: { type: Number, required: true },
    iana: { type: String, required: true } // IANA timezone identifier that can be used to convert UTC to local time with automatic DST handling
}, { timestamps: true });
const TimezoneModel = mongoose_1.models.Timezone || (0, mongoose_1.model)("Timezone", TimezoneSchema);
exports.default = TimezoneModel;
