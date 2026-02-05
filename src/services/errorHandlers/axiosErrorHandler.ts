import axios from "axios";

export function handleApiError(error: unknown, fallback: string): never {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || fallback);
    }
    throw new Error(fallback);
}