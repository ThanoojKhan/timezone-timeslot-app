import Timeslot from "@/models/Timeslot"

export async function getTimeslotsUTC(): Promise<string[]> {
  const data = await Timeslot.find()
    .sort({ utcTime: 1 })
    .select("-_id utcTime")

  return data.map(d => d.utcTime)
}