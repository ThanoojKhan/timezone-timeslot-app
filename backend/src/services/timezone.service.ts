import TimezoneModel from "../models/Timezone"
import type { Timezone } from "../types/timezone"

export async function getTimezonesService(): Promise<Timezone[]> {
    const data: Timezone[] = await TimezoneModel.find()
        .select("-_id id name offset iana")
        .lean()

    return data
}