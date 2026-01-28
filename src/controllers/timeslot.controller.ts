import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { getTimeslotsUTC } from "@/services/timeslot.service"

export async function getTimeslotsController() {
  try {
    await connectDB()
    const data = await getTimeslotsUTC()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch timeslots:", error)
    return NextResponse.json(
      { message: "Failed to fetch timeslots" },
      { status: 500 }
    )
  }
}
