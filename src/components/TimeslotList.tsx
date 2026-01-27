import { format } from "date-fns-tz"
import { DisplaySlot } from "@/types/displaySlot"

interface Props {
    slots: DisplaySlot[]
    selected: string | null
    onSelect: (utc: string) => void
}

export default function TimeslotList({
    slots,
    selected,
    onSelect
}: Props) {
    return (
        <ul className="grid grid-cols-2 gap-3 mt-4">
            {slots.map(slot => (
                <li key={slot.utc}>
                    <button
                        onClick={() => onSelect(slot.utc)}
                        className={`w-full rounded-lg border px-3 py-2 text-sm transition
              ${selected === slot.utc
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white hover:bg-blue-200 border-gray-300"
                            }`}
                    >
                        {format(slot.date, "dd MMM yyyy, hh:mm a")}
                    </button>
                </li>
            ))}
        </ul>
    )
}