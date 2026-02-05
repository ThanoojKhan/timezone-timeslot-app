# Frontend -- Timezone & Timeslot Management

## Overview

This frontend is a **Next.js (App Router) TypeScript application**
responsible for:

-   Fetching UTC-based timeslot data from the backend API
-   Converting timestamps into user-selected timezones
-   Rendering timezone-safe formatted UI

The design ensures **no timezone logic is trusted to the browser
implicitly** and guarantees **globally correct time display**.

------------------------------------------------------------------------

# Tech Stack

-   **Next.js (App Router)**
-   **React + TypeScript**
-   **date-fns-tz** for timezone-safe conversion
-   **Axios** for API communication
-   **Tailwind CSS / PostCSS** for styling

------------------------------------------------------------------------

# Project Structure

    src
     ├─ app                 → Next.js App Router pages & layouts
     ├─ components          → Reusable UI components
     ├─ lib                 → Shared helpers & utilities
     ├─ services
     │   ├─ axiosConnection → Axios base configuration
     │   ├─ backendAPI      → API request wrappers
     │   └─ errorHandlers   → Centralized client error handling
     ├─ types               → Shared TypeScript domain types

### Architectural Principle

**UI → Service → Backend API**

-   UI components never call APIs directly
-   Services isolate networking logic
-   Types ensure strict data contracts

This improves:

-   maintainability
-   testability
-   scalability

------------------------------------------------------------------------

# Timezone Handling Strategy

## Core Rule

**All timestamps originate in UTC from the backend.**

The frontend is responsible for:

1.  Receiving UTC ISO timestamps
2.  Converting using selected **IANA timezone**
3.  Formatting safely for display

------------------------------------------------------------------------

## Why IANA Timezones

IANA identifiers:

-   Handle daylight saving automatically
-   Support historical timezone changes
-   Avoid manual offset errors

------------------------------------------------------------------------

## Conversion Flow

1.  Fetch UTC timestamps from backend
2.  User selects timezone
3.  Convert using `date-fns-tz`
4.  Render formatted local time

No browser-local assumptions are used.

------------------------------------------------------------------------

# Display Guarantees

-   UTC is always displayed using **explicit UTC formatting**
-   Local time uses **selected IANA timezone only**
-   Offset values are **informational only**, never used for math

This prevents:

-   DST bugs
-   incorrect regional offsets
-   inconsistent browser behavior

------------------------------------------------------------------------

# Running the Frontend

## Install

    npm install

## Development

    npm run dev

## Production build

    npm run build
    npm start

------------------------------------------------------------------------

# Production Safety Practices

-   Strict TypeScript typing across UI and services
-   Centralized API communication layer
-   Explicit timezone conversion using IANA
-   Separation of UI and networking logic
-   Environment-based backend URL configuration

These match **real-world production frontend standards**.

------------------------------------------------------------------------

# Relationship with Backend

-   Backend stores **UTC only**
-   Frontend performs **all timezone conversions**
-   Clear contract via **typed API responses**

This separation guarantees:

-   correctness across regions
-   independent deployment
-   scalable architecture

------------------------------------------------------------------------

# Author Note

This frontend is intentionally designed to demonstrate:

-   production-grade timezone handling
-   clean Next.js architecture
-   strict separation of concerns
-   interview-ready engineering quality