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
      type: Date, // Change to Date type for proper date handling
      required: true,
    },
    end_date: {
      type: Date, // Change to Date type for proper date handling
      required: true,
    },
    discount_rate: {
      type: Number,
      required: true,
    },
    use_time: {
      type: Number, // Change to Number type if use_time is a numerical value
      required: true,
    },
    active: {
      type: Boolean,
      default: true, // Set a default value if needed
    },
  },
  { timestamps: true }
);

export default mongoose.model("Promocodes", promocodeSchema);
