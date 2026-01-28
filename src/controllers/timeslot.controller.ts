import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { getTimeslotsUTC } from "@/services/timeslot.service"

export async function getTimeslotsController(): Promise<NextResponse> {
    try {
        await connectDB()

        const data: string[] = await getTimeslotsUTC()

        return NextResponse.json(data)
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Unknown error"

        console.error("Failed to fetch timeslots:", message)

        return NextResponse.json(
            { message: "Failed to fetch timeslots" },
            { status: 500 }
        )
    }
}