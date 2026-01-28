import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { getTimezones } from "@/services/timezone.service"

export async function getTimezonesController() {
  try {
    await connectDB()
    const data = await getTimezones()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch timezones:", error)
    return NextResponse.json(
      { message: "Failed to fetch timezones" },
      { status: 500 }
    )
  }
}
