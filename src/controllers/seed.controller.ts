import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { seedDatabase } from "@/services/seed.service"

export async function seedController(): Promise<NextResponse> {
    try {
        await connectDB()
        await seedDatabase()

        return NextResponse.json({ message: "Seed completed" })
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Unknown error"

        console.error("Seed failed:", message)

        return NextResponse.json(
            { message: "Seed failed" },
            { status: 500 }
        )
    }
}