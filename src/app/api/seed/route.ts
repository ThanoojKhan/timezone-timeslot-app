import { seedController } from "@/controllers/seed.controller"

export async function GET() {
  return seedController()
}