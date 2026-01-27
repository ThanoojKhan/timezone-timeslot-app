import mongoose, { Schema } from "mongoose"

const TimeslotSchema = new Schema(
    {
        utcTime: { type: String, required: true }
    },
    { timestamps: true }
)

export default mongoose.models.Timeslot ||
    mongoose.model("Timeslot", TimeslotSchema)

export type Timeslot = mongoose.InferSchemaType<typeof TimeslotSchema>