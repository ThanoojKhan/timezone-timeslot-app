import mongoose, { Schema, model, models, type Model } from "mongoose"

const TimezoneSchema = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        offset: { type: Number, required: true },
        iana: { type: String, required: true } // IANA timezone identifier that can be used to convert UTC to local time with automatic DST handling
    },
    { timestamps: true }
)


export type Timezone = mongoose.InferSchemaType<typeof TimezoneSchema>

const TimezoneModel: Model<Timezone> =
    models.Timezone || model<Timezone>("Timezone", TimezoneSchema)

export default TimezoneModel