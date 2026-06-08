import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema({
    // Rating field: 1 se 5 ke beech numerical value
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: 1,
        max: 5
    },
    // Content field: Jo textarea se 'content' state mein save ho raha hai
    content: {
        type: String,
        required: [true, "Review content is required"],
        trim: true
    },
    // User reference: Kaun review submit kar raha hai
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "UserId is required"]
    }
}, {
    // Timestamps: 'createdAt' se aapko review ki date mil jayegi
    timestamps: { createdAt: true, updatedAt: false }
});

const reviewsModel = mongoose.model("reviews", reviewsSchema);

export default reviewsModel;