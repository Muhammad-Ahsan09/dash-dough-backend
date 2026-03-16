import Review from "../models/reviews-model.js"

export const createReview = async (req, res) => {
    try {
        
        const {userName, email, rating, review} = req.body;

        if (!userName || !rating || !review) {
            return res.status(400).json({
              message: "Name, rating and review are required"
            });
          }

        const newReview = await Review.create({userName, email, rating, review, createdAt})

        res.status(201).json({
            message: "Review added successfully",
            review: newReview
          });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add review",
            error: error.message
          });
    }
}