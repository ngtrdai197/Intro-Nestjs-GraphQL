import { Schema } from 'mongoose'

export const PostSchema = new Schema(
  {
    name: { type: String, required: true },
    content: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id, delete ret.__v
      },
    },
  },
)
