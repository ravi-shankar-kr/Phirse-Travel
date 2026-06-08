import reviewsModel from "../models/reviews.model.js";

// 1. Create Review
export async function createReview(req, res) {
    try {
        const { rating, content } = req.body;

        // Validation: Check if data exists
        if (!rating || !content) {
            return res.status(400).json({
                message: "Rating and content are required",
                success: false
            });
        }

        // Create review using new model fields
        const reviewPost = await reviewsModel.create({
            rating: Number(rating), // Ensure rating is a number
            content,
            userId: req.user.id // Middleware (auth) se user id mil rahi hai
        });

        res.status(201).json({
            message: "Review submitted successfully",
            success: true,
            reviewPost
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating review",
            success: false,
            error: error.message
        });
    }
}

// 2. Get All Reviews
export async function getReview(req, res) {
    try {
        // .populate('userId', 'username name') use kar sakte hain agar user details chahiye
        const reviews = await reviewsModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Reviews fetched successfully",
            success: true,
            count: reviews.length,
            reviews: reviews.map(item => ({
                id: item._id,
                rating: item.rating,
                content: item.content,
                createdAt: item.createdAt,
                userId: item.userId
            }))
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching reviews",
            success: false,
            error: error.message
        });
    }
}