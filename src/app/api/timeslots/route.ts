import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Timeslot from "@/models/Timeslot"

export async function GET() {
  await connectDB()
  const data = await Timeslot.find()
    .sort({ utcTime: 1 })
    .select("-_id utcTime")

  return NextResponse.json(data.map(d => d.utcTime))
}