"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = connectMongoDB;
exports.disconnectDB = disconnectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}
/**
 * Ensures a MongoDB connection exists.
 *
 * - Reuses an existing connection if available
 * - Creates a new connection only once per runtime
 * - Safe to call in every API route
 */
async function connectMongoDB() {
    if (cached.conn)
        return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose_1.default.connect(MONGODB_URI);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
/**
 * Disconnects MongoDB connection.
 *
 * This is generally NOT required in Next.js API routes
 * but is useful for:
 * - scripts
 * - tests
 * - controlled shutdown scenarios
 */
async function disconnectDB() {
    if (cached.conn) {
        await mongoose_1.default.disconnect();
        cached.conn = null;
    }
}
