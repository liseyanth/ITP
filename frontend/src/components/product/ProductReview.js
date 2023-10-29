import React from 'react';

export default function ProductReview({ reviews }) {
    return (
        <div className="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map(review => (
                <div key={review._id} className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${review.rating / 5 * 100}%` }}></div>
                    </div>
                    <p className="review_user">by {review.user ? review.user.name : 'Unknown User'}</p>
                    <p className="review_comment">{review.comment}</p>
                    <p className="review_date">Reviewed on {formatTimestamp(review.createdAt)}</p>
                    <hr />
                </div>
            ))}
        </div>
    );

    // Helper function to format the timestamp
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);

        // Check if the date is valid before formatting
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }
}
