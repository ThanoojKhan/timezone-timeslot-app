import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Timezone from "@/models/Timezone"

export async function GET() {
  await connectDB()
  const data = await Timezone.find()
    .select("-_id id name offset iana")
  return NextResponse.json(data)
}