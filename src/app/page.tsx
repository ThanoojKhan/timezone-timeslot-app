"use client"

import { useEffect, useState } from "react"
import TimezoneDropdown from "@/components/TimezoneDropdown"
import TimeslotList from "@/components/TimeslotList"
import TimeslotDetails from "@/components/TimeslotDetails"
import { Timezone } from "@/types/timezone"
import { DisplaySlot } from "@/types/displaySlot"
import { convertUtcToZoneDate } from "@/lib/time"
import { fetchTimezones, fetchTimeslots } from "@/services/backendAPI/time";
import { Timeslot } from "@/types/timeslot"

export default function Home() {
  const [timezones, setTimezones] = useState<Timezone[]>([])
  const [timeslotsUTC, setTimeslotsUTC] = useState<Timeslot[]>([])
  const [selectedTimezoneId, setSelectedTimezoneId] = useState("")
  const [selectedUTC, setSelectedUTC] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [tzRes, slotData] = await Promise.all([
          fetchTimezones(),
          fetchTimeslots(),
        ]);

        setTimezones(tzRes)
        setTimeslotsUTC(slotData)

      } catch (err) {
        setError("Unable to load timezones or timeslots")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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
    <main className="min-h-screen flex items-center justify-center select-none">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">
          Timezone and Timeslot Management
        </h1>

        {/* Loading indicator */}
        {loading && (
          <p className="text-sm text-gray-500">
            Loading timezones and timeslots ...
          </p>
        )}

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Main UI content*/}
        {!loading && !error && (
          <>
            <TimezoneDropdown
              timezones={timezones}
              value={selectedTimezoneId}
              onChange={id => {
                setSelectedTimezoneId(id)
                setSelectedUTC(null)
                setShowDetails(false)
              }}
            />

            {selectedTimezone && displayedSlots.length === 0 && (
              <p className="mt-4 text-sm text-gray-500">
                No timeslots available for this timezone
              </p>
            )}

            {selectedTimezone && displayedSlots.length > 0 && (
              <TimeslotList
                slots={displayedSlots}
                selected={selectedUTC}
                onSelect={utc => {
                  setSelectedUTC(utc)
                  setShowDetails(false)
                }}
              />
            )}

            {selectedUTC && selectedTimezone && (
              <div className="mt-4">
                <button
                  onClick={() => setShowDetails(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition cursor-pointer"
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
          </>
        )}
      </div>
    </main>
  )
}