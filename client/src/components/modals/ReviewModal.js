import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import { useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import recipeContext from '../../context/recipe/recipeContext';

const ReviewModal = ({ open, setOpen }) => {
    const { createReview } = useContext(recipeContext);

    const initialState = {
        rating: '',
        comment: '',
    };

    const [review, setReview] = useState(initialState);
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        createReview(id, review);
        setOpen(false);
    };

    return (
        <ReactModal
            contentLabel='Review modal'
            isOpen={open}
            className='review-modal modal'
            ariaHideApp={false}
        >
            <h3>Leave a review</h3>
            <form onSubmit={onSubmit}>
                <label>Rating (value between 1 to 5)</label>
                <input
                    type='number'
                    name='rating'
                    value={review.rating}
                    onChange={handleChange}
                    min={0}
                    max={5}
                    step='.01'
                    required
                />
                <label>Review</label>
                <TextareaAutosize
                    name='comment'
                    value={review.comment || ''}
                    onChange={handleChange}
                    required
                />
                <div className='button-container'>
                    <button
                        className='button rounded-md delete'
                        type='button'
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </button>
                    <button className='button rounded-md primary' type='submit'>
                        Confirm
                    </button>
                </div>
            </form>
        </ReactModal>
    );
};

export default ReviewModal;
