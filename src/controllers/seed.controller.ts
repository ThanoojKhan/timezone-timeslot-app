import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { seedDatabase } from "@/services/seed.service"

export async function seedController() {
  try {
    await connectDB()
    await seedDatabase()
    return NextResponse.json({ message: "Seed completed" })
  } catch (error) {
    console.error("Seed failed:", error)
    return NextResponse.json(
      { message: "Seed failed" },
      { status: 500 }
    )
  }
}
