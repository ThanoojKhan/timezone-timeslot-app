import Timezone from "@/models/Timezone"

export async function getTimezones() {
  return Timezone.find()
    .select("-_id id name offset iana")
}