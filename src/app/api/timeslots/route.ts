import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Timeslot from "@/models/Timeslot"

export async function GET() {
  try {
    await connectDB()

    const data = await Timeslot.find()
      .sort({ utcTime: 1 })
      .select("-_id utcTime")

    return NextResponse.json(
      data.map(d => d.utcTime)
    )
  } catch (error) {
    console.error("Failed to fetch timeslots:", error)

    return NextResponse.json(
      { message: "Failed to fetch timeslots" },
      { status: 500 }
    )
  }
}
