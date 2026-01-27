import { toZonedTime } from "date-fns-tz"
import { format } from "date-fns-tz"

//Converts UTC ISO string to a zoned Date object
export function convertUtcToZoneDate(
    utcTime: string,
    zone: string
): Date {
    const date = new Date(utcTime)
    return toZonedTime(date, zone)
}


// Format UTC ISO string as UTC 
export function formatUTC(utcTime: string): string {
    return format(
        new Date(utcTime),
        "dd MMM yyyy, hh:mm a",
        { timeZone: "UTC" }
    )
}


// Format offset as UTC
export function formatOffset(offset: number): string {
    const sign = offset >= 0 ? "+" : "-"
    const abs = Math.abs(offset)

    const hours = Math.floor(abs)
    const minutes = abs % 1 === 0 ? 0 : 30

    return `UTC${sign}${hours}${minutes ? ":30" : ""}`
}