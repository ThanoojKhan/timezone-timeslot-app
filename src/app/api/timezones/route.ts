import { getTimezonesController } from "@/controllers/timezone.controller"

export async function GET() {
  return getTimezonesController()
}