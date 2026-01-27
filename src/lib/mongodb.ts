import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined")
}

/**
 * Global mongoose cache type
 * - conn: active mongoose connection
 * - promise: connection promise during initial connection
 *
 * This prevents creating multiple connections in development
 * and across API route executions.
 */
type MongooseCache = {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

let cached = (global as any).mongoose as MongooseCache
if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}

/**
 * Ensures a MongoDB connection exists.
 *
 * - Reuses an existing connection if available
 * - Creates a new connection only once per runtime
 * - Safe to call in every API route
 */
export async function connectDB() {
    if (cached.conn) return cached.conn
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI)
    }
    cached.conn = await cached.promise
    return cached.conn
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
export async function disconnectDB() {
    if (cached.conn) {
        await mongoose.disconnect()
        cached.conn = null
    }
}