import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import recipeContext from '../../../context/recipe/recipeContext';
import ReviewModal from '../../modals/ReviewModal';
import profile from '../../../assets/img/profile.png';
import Avatar from '../../reusable/Avatar';
import Star from '../../icons/Star';
import authContext from '../../../context/auth/authContext';
import systemContext from '../../../context/System/systemContext';

const Reviews = () => {
    const { getReviews, reviews } = useContext(recipeContext);
    const { user } = useContext(authContext);
    const { openLoginModal } = useContext(systemContext);

    const { id } = useParams();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        getReviews(id);
        // eslint-disable-next-line
    }, []);

    const addReview = () => {
        if (user === null) {
            openLoginModal();
            return;
        }
        setOpen(true);
    };

    return (
        <div className='reviews section'>
            <h3 className='section-title'>Reviews</h3>
            <div className='content container'>
                {reviews && reviews.length
                    ? reviews.map((review) => (
                          <ReviewItem key={review._id} review={review} />
                      ))
                    : 'No reviews given yet'}
                <button
                    className='button rounded-md primary'
                    type='button'
                    onClick={addReview}
                >
                    Add a review
                </button>
                <ReviewModal open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

const ReviewItem = ({ review }) => (
    <div className='review-container'>
        <Avatar
            src={review.profile?.image?.location || profile}
            alt='profile picture'
            size='medium'
        />
        <div className='review-content'>
            <span>
                {review.rating}/5{' '}
                <Star fill='#f15a2e' width='16px' height='16px' />
            </span>
            <p>{review.comment}</p>
        </div>
    </div>
);

export default Reviews;
