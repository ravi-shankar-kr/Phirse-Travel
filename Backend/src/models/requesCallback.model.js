import mongoose from "mongoose";

const requestCallbackSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phoneNo: {
      type: String,
      unique: true,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "userId is required"]
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    enquiry: {
      type: String,
      trim: true,
      required: [true, "Enquiry details are required"],
    },
  },
  {
    timestamps: true,
  }
);

const requestCallbackModel = mongoose.model("RequestCallback", requestCallbackSchema);

export default requestCallbackModel;