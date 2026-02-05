# Timezone & Timeslot Management Application

## Overview

This application demonstrates a robust approach to handling timezones
and timeslots in a global context. All times are stored in UTC and
converted on the client based on the user's selected timezone. The
implementation focuses on correctness, clarity and real-world timezone
edge cases such as daylight saving time.

## Key Design Principles

-   Store all timestamps in UTC
-   Use IANA timezone identifiers for conversion
-   Never rely on browser local timezone implicitly
-   Separate conversion logic from presentation logic

## Architecture Update

### Separation of Backend and Frontend

The system has been refactored into independent backend and frontend
applications.

#### Backend

-   Implemented using Node.js, Express and TypeScript
-   Provides REST APIs for timeslots and timezone metadata
-   Handles database access, validation and error management
-   Uses MongoDB with Mongoose and a global connection cache
-   Follows layered architecture: Routes, Controllers, Services, Models
    and Utilities

#### Frontend

-   Implemented as a separate client application
-   Responsible for fetching UTC data from APIs, performing timezone
    conversion and rendering formatted output
-   No business logic or database assumptions exist in the UI layer

This separation improves scalability, maintainability, deployment
flexibility and testability.

## Data Model

### Timeslot

-   Stored as a UTC ISO string
-   Example: 2025-01-23T00:00:00Z
-   Represents an absolute moment in time

### Timezone

Each timezone record includes: - id -- short identifier like IST or
AKT - name -- human-readable name - offset -- base UTC offset used for
display only - iana -- IANA timezone identifier such as Asia/Kolkata

## Backend Behavior

### Storage

-   The backend stores all timeslots strictly in UTC
-   No local timezone assumptions are made during insertion

### APIs

-   /api/timeslots returns an ordered list of UTC timestamps
-   /api/timezones returns timezone metadata including IANA identifiers
-   /api/seed seeds hard-coded data into the database for testing

### Database Connection Management

-   MongoDB is the primary data store
-   Mongoose is used as the ODM
-   A global cached connection prevents duplicate connections
-   Startup waits for successful DB connection before serving requests
-   Graceful shutdown safely closes DB connections

## Frontend Architecture

### Conversion Flow

1.  UTC times are fetched from the API
2.  User selects a timezone
3.  UTC times are converted using the selected IANA timezone
4.  Converted times are displayed to the user

### Libraries Used

-   date-fns-tz for timezone-aware conversion and formatting
-   React hooks for state management

## Time Conversion Strategy

### Why IANA Timezones

IANA timezone identifiers automatically handle daylight saving time
changes, historical offset changes and regional timezone rules.

### Conversion Logic

-   toZonedTime converts UTC to a local Date object
-   formatInTimeZone ensures explicit timezone-safe formatting

UTC is always formatted explicitly using the UTC timezone to avoid
browser-local leakage.

## Display Rules

-   Original UTC is always formatted in UTC
-   Selected timezone is converted explicitly using the chosen IANA
    identifier
-   Offset is displayed only as metadata and never used for conversion

## Example

For a stored UTC value: 2025-01-23T00:00:00Z

  Timezone              Displayed Time
  --------------------- ---------------------------
  UTC                   23 Jan 2025, 12:00 AM UTC
  India Standard Time   23 Jan 2025, 05:30 AM
  Alaska Time           22 Jan 2025, 03:00 PM

## Common Pitfalls Avoided

-   Formatting UTC using browser local timezone
-   Manual offset-based conversion
-   Ignoring daylight saving time
-   Storing local time in the database

## Final Notes

This project prioritizes correctness, clarity and architectural
discipline over shortcuts. The separation of backend and frontend
combined with strict UTC storage and IANA-based conversion demonstrates
a production-safe timezone handling strategy suitable for real-world
systems.