import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Timezone from "@/models/Timezone"

export async function GET() {
  try {
    await connectDB()

    const data = await Timezone.find()
      .select("-_id id name offset iana")

    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch timezones:", error)

    return NextResponse.json(
      { message: "Failed to fetch timezones" },
      { status: 500 }
    )
  }
}
