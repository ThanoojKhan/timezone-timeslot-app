import mongoose from "mongoose";
import ENV from "../utils/validateEnv";

const MONGODB_URI = ENV.MONGODB_URI;

declare global {
    var mongooseCache:
        | {
            conn: typeof mongoose | null;
            promise: Promise<typeof mongoose> | null;
        }
        | undefined;
}

const cached = global.mongooseCache ?? {
    conn: null,
    promise: null,
};

global.mongooseCache = cached;

export async function connectMongoDB(): Promise<typeof mongoose> {
    if (cached.conn) {
        console.log("MongoDB already connected");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("Connecting to MongoDB...");

        const options: mongoose.ConnectOptions = {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, options)
            .then((mongooseInstance) => {
                console.log("MongoDB connected successfully");
                return mongooseInstance;
            })
            .catch((error) => {
                console.error("MongoDB connection error:", error);
                cached.promise = null;
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export async function disconnectMongoDB(): Promise<void> {
    if (!cached.conn) return;

    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;

    console.log("MongoDB disconnected");
}