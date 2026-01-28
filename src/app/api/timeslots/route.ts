import { getTimeslotsController } from "@/controllers/timeslot.controller"

export async function GET() {
  return getTimeslotsController()
}