import { Timezone } from "@/types/timezone"

interface Props {
    timezones: Timezone[]
    value: string
    onChange: (id: string) => void
}

export default function TimezoneDropdown({
    timezones,
    value,
    onChange
}: Props) {
    return (
        <select value={value} onChange={e => onChange(e.target.value)}>
            <option value="">Select timezone</option>
            {timezones.map(tz => (
                <option key={tz.id} value={tz.id}>
                    {tz.name}
                </option>
            ))}
        </select>
    )
}