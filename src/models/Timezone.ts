import mongoose, { Schema } from "mongoose"

const TimezoneSchema = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        offset: { type: Number, required: true },
        iana: { type: String, required: true } // IANA timezone identifier that can be used to convert UTC to local time with automatic DST handling
    },
    { timestamps: true }
)

export default mongoose.models.Timezone ||
    mongoose.model("Timezone", TimezoneSchema)

export type Timezone = mongoose.InferSchemaType<typeof TimezoneSchema>