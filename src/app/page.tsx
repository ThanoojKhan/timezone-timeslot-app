"use client"

import { useEffect, useState } from "react"
import TimezoneDropdown from "@/components/TimezoneDropdown"
import TimeslotList from "@/components/TimeslotList"
import TimeslotDetails from "@/components/TimeslotDetails"
import { Timezone } from "@/types/timezone"
import { DisplaySlot } from "@/types/displaySlot"
import { convertUtcToZoneDate } from "@/lib/time"

export default function Home() {
  const [timezones, setTimezones] = useState<Timezone[]>([])
  const [timeslotsUTC, setTimeslotsUTC] = useState<string[]>([])
  const [selectedTimezoneId, setSelectedTimezoneId] = useState("")
  const [selectedUTC, setSelectedUTC] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    fetch("/api/timezones")
      .then(res => res.json())
      .then(setTimezones)

    fetch("/api/timeslots")
      .then(res => res.json())
      .then(setTimeslotsUTC)
  }, [])

  const selectedTimezone = timezones.find(
    tz => tz.id === selectedTimezoneId
  )

  const displayedSlots: DisplaySlot[] = selectedTimezone
    ? timeslotsUTC.map((utc, index) => ({
      _id: `${utc}-${index}`,
      utc,
      date: convertUtcToZoneDate(
        utc,
        selectedTimezone.iana
      )
    }))
    : []

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">
          Timezone and Timeslot Management
        </h1>

        {/** Timezone Dropdown */}
        <TimezoneDropdown
          timezones={timezones}
          value={selectedTimezoneId}
          onChange={id => {
            setSelectedTimezoneId(id)
            setSelectedUTC(null)
            setShowDetails(false)
          }}
        />

        {/** Timeslot List */}
        {selectedTimezone && (
          <TimeslotList
            slots={displayedSlots}
            selected={selectedUTC}
            onSelect={utc => {
              setSelectedUTC(utc)
              setShowDetails(false)
            }}
          />
        )}

        {/** Timeslot Details */}
        {selectedUTC && selectedTimezone && (
          <div className="mt-4">
            <button
              onClick={() => setShowDetails(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition"
            >
              Show Timeslot Details
            </button>

            {showDetails && (
              <TimeslotDetails
                utc={selectedUTC}
                zonedDate={convertUtcToZoneDate(
                  selectedUTC,
                  selectedTimezone.iana
                )}
                offset={selectedTimezone.offset}
              />
            )}
          </div>
        )}
      </div>
    </main>
  )
}