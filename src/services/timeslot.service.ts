import TimeslotModel from "@/models/Timeslot"
import type { Timeslot } from "@/types/timeslot"

export async function getTimeslotsUTC(): Promise<string[]> {
    const data: Timeslot[] = await TimeslotModel.find()
        .sort({ utcTime: 1 })
        .select("-_id utcTime")
        .lean()

    return data.map(d => d.utcTime)
}