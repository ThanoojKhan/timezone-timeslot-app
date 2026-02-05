import { Timezone } from "@/types/timezone"
import { Timeslot } from "@/types/timeslot"
import api from "@/services/axiosConnection/axios"
import { handleApiError } from "../errorHandlers/axiosErrorHandler";

export const fetchTimezones = async (): Promise<Timezone[]> => {
    try {
        const response = await api.get<Timezone[]>("/timezones");
        return response.data;
    } catch (error) {
        handleApiError(error, "Could not load timezones.");
    }
};

export const fetchTimeslots = async (): Promise<Timeslot[]> => {
    try {
        const response = await api.get<Timeslot[]>("/timeslots");
        return response.data;
    } catch (error) {
        handleApiError(error, "Could not load timeslots.");
    }
};