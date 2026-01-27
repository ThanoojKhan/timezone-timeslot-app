# Timezone & Timeslot Management Application

## Overview
This application demonstrates a robust approach to handling timezones and timeslots in a global context.
All times are stored in UTC and converted on the client based on the user’s selected timezone.
The implementation focuses on correctness, clarity and real-world timezone edge cases such as daylight saving time.

## Key Design Principles
- Store all timestamps in UTC
- Use IANA timezone identifiers for conversion
- Never rely on browser local timezone implicitly
- Separate conversion logic from presentation logic

## Framework & Architectural Standards

### Next.js App Router
- Built using Next.js App Router
- API routes implemented using app/api/*/route.ts
- Clear separation between server and client components
- "use client" is applied only where client-side state or effects are required

## Data Model

### Timeslot
- Stored as a UTC ISO string
- Example:
  2025-01-23T00:00:00Z
- Represents an absolute moment in time

### Timezone
Each timezone record includes:
- id – short identifier like IST or AKT
- name – human-readable name
- offset – base UTC offset used for display only
- iana – IANA timezone identifier such as Asia/Kolkata

## Backend Behavior

### Storage
- The backend stores all timeslots strictly in UTC
- No local timezone assumptions are made during insertion

### APIs
- /api/timeslots returns an ordered list of UTC timestamps
- /api/timezones returns timezone metadata including IANA identifiers
- /api/seed seeds hard-coded data into the database (used only for testing)

### Database Connection Management
- MongoDB is used as the primary data store
- Mongoose is used as the ODM
- A global connection cache is implemented to prevent multiple connections

## Frontend Architecture

### Conversion Flow
1. UTC times are fetched from the API
2. User selects a timezone
3. UTC times are converted using the selected IANA timezone
4. Converted times are displayed to the user

### Libraries Used
- date-fns-tz for timezone-aware conversion and formatting
- React hooks for state management

## Time Conversion Strategy

### Why IANA Timezones
IANA timezone identifiers automatically handle daylight saving time changes,
historical offset changes and regional timezone rules.

### Conversion Logic
- toZonedTime converts UTC to a local Date object
- formatInTimeZone ensures explicit timezone-safe formatting

UTC is always formatted explicitly using the UTC timezone to avoid browser-local leakage.

## Display Rules
- Original UTC is always formatted in UTC
- Selected Timezone is converted using the selected IANA timezone
- Offset is displayed as metadata and not used for conversion logic

## Example

For a stored UTC value:
2025-01-23T00:00:00Z

| Timezone | Displayed Time |
|---------|----------------|
| UTC | 23 Jan 2025, 12:00 AM UTC |
| India Standard Time | 23 Jan 2025, 05:30 AM |
| Alaska Time | 22 Jan 2025, 03:00 PM |

## Common Pitfalls Avoided
- Formatting UTC using browser local timezone
- Manual offset-based conversion
- Ignoring daylight saving time
- Storing local time in the database

## Final Notes
This project prioritizes correctness and clarity over shortcuts.
Timezone handling is one of the most error-prone areas in software and this implementation demonstrates a disciplined, production-safe approach suitable for interview assessments.