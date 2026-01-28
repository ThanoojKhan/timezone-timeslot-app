import TimezoneModel from "@/models/Timezone"
import TimeslotModel from "@/models/Timeslot"
import type { Timezone } from "@/types/timezone"
import type { Timeslot } from "@/types/timeslot"

export async function seedDatabase(): Promise<void> {
    const timezoneCount: number = await TimezoneModel.countDocuments()
    const timeslotCount: number = await TimeslotModel.countDocuments()

    if (timezoneCount === 0) {
        const timezones: Timezone[] = [
            { id: "PT", name: "Pacific Time", offset: -8, iana: "America/Los_Angeles" },
            { id: "MT", name: "Mountain Time", offset: -7, iana: "America/Denver" },
            { id: "CT", name: "Central Time", offset: -6, iana: "America/Chicago" },
            { id: "ET", name: "Eastern Time", offset: -5, iana: "America/New_York" },
            { id: "AKT", name: "Alaska Time", offset: -9, iana: "America/Anchorage" },
            { id: "HAT", name: "Hawaii-Aleutian Time", offset: -10, iana: "Pacific/Honolulu" },
            { id: "IST", name: "India Standard Time", offset: 5.5, iana: "Asia/Kolkata" },
            { id: "CST", name: "China Standard Time", offset: 8, iana: "Asia/Shanghai" }
        ]

        await TimezoneModel.insertMany(timezones)
    }

    if (timeslotCount === 0) {
        const slots: Timeslot[] = [
            "2025-01-23T00:00:00Z",
            "2025-01-23T02:00:00Z",
            "2025-01-23T04:00:00Z",
            "2025-01-23T06:00:00Z",
            "2025-01-23T08:00:00Z",
            "2025-01-23T10:00:00Z",
            "2025-01-23T12:00:00Z",
            "2025-01-23T14:00:00Z",
            "2025-01-23T16:00:00Z",
            "2025-01-23T18:00:00Z",
            "2025-01-23T20:00:00Z",
            "2025-01-23T22:00:00Z",
            "2025-01-24T00:00:00Z",
            "2025-01-24T02:00:00Z",
            "2025-01-24T04:00:00Z",
            "2025-01-24T06:00:00Z",
            "2025-01-24T08:00:00Z",
            "2025-01-24T10:00:00Z",
            "2025-01-24T12:00:00Z",
            "2025-01-24T14:00:00Z"
        ].map((utcTime): Timeslot => ({ utcTime }))

        await TimeslotModel.insertMany(slots)
    }
}