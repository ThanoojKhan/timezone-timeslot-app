import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { getTimezones } from "@/services/timezone.service"
import type { Timezone } from "@/types/timezone"

export async function getTimezonesController(): Promise<NextResponse> {
    try {
        await connectDB()

        const data: Timezone[] = await getTimezones()

        return NextResponse.json(data)
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Unknown error"

        console.error("Failed to fetch timezones:", message)

        return NextResponse.json(
            { message: "Failed to fetch timezones" },
            { status: 500 }
        )
    }
}