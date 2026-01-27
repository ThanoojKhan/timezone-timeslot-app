import { formatOffset } from "@/lib/time"
import { format, formatInTimeZone } from "date-fns-tz"

interface Props {
    utc: string
    zonedDate: Date
    offset: number
}

export default function TimeslotDetails({
    utc,
    zonedDate,
    offset
}: Props) {
    return (
        <div className="mt-4 rounded-lg border bg-gray-50 p-4">
            <p className="text-sm">
                <span className="font-semibold">Original UTC:</span>{" "}
                {formatInTimeZone(
                    new Date(utc),
                    "UTC",
                    "dd MMM yyyy, hh:mm a 'UTC'"
                )}
            </p>

            <p className="text-sm mt-1">
                <span className="font-semibold">Selected Timezone:</span>{" "}
                {format(zonedDate, "dd MMM yyyy, hh:mm a")},
                <span className="pl-2 font-semibold">Offset: {formatOffset(offset)}</span>
            </p>
        </div>
    )
}
