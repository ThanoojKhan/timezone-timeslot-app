import mongoose, { Schema, model, models, type Model } from "mongoose"

const TimeslotSchema = new Schema(
    {
        utcTime: { type: String, required: true }
    },
    { timestamps: true }
)

export type Timeslot = mongoose.InferSchemaType<typeof TimeslotSchema>

const TimeslotModel: Model<Timeslot> =
    models.Timeslot || model<Timeslot>("Timeslot", TimeslotSchema)

export default TimeslotModel