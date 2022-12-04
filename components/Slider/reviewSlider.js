
import { urlFor } from "../../sanity"

const ReviewSlider = ({ review }) => {
    return (
            <div className="slide-container">
                <div className="slide-content">
                    <div className="review-wrapper">
                        <div className="review">

                            <div className="image-content">
                                <span className="overlay"></span>

                                <div className="review-image">
                                    <img src={urlFor(review.traveller.image)} />
                                </div>
                            </div>

                            <div className="review-content">
                                <h2 className="review-name">{review.traveller.name}</h2>
                                <p>⭐ {review.rating} ⭐</p>
                                <p className="review-description">{review.reviewDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ReviewSlider;