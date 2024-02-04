import mongoose from "mongoose";

const promocodeSchema = new mongoose.Schema(
  {
    id: [
      {
        type: mongoose.ObjectId,
        ref: "promo",
      },
    ],
    name: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    slug: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    discount_rate: {
      type: Number,
      required: true,
    },
    use_time: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Promocodes", promocodeSchema);
