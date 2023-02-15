import React from 'react';
import header from '../../assets/img/about-header.jpg';
import meaning from '../../assets/img/about-meaning.jpg';
import imageRecognition from '../../assets/img/about-image-recognition.png';
import mission from '../../assets/img/about-mission.png';
import offer from '../../assets/img/about-offer-2.jpg';

const About = () => {
    return (
        <div className='about'>
            <div
                className='header'
                style={{ background: 'url(' + header + ')' }}
            >
                <div className='container'>
                    <h1 className='white'>Who We Are</h1>
                </div>
            </div>
            <div className='meaning'>
                <div className='container container-content'>
                    <div className='img-container'>
                        <img src={meaning} alt='Meaning Behind Feast In' />
                    </div>
                    <div className='content'>
                        <h2 className='white'>Meaning Behind Feast In</h2>
                        <p className='white'>
                            "Feast" meaning to enjoy &amp; devour the food you
                            cook and "In" meaning right in your kitchen. No need
                            to order take-out for meals, or to drive out to your
                            local restaurant.
                            <br></br>
                            <br></br>
                            Feast-In also has the double meaning of ‘feasting’
                            to go with the name, as our product will allow you
                            to experience the joy of feasting indoors whenever
                            you desire.
                        </p>
                    </div>
                </div>
            </div>
            <div className='image-recognition'>
                <div className='container'>
                    <div className='img-container'>
                        <div>
                            <img
                                src={imageRecognition}
                                alt='ImageRecognition'
                            />
                        </div>
                    </div>
                    <div className='content'>
                        <h2 className='dark-blue'>Image Recognition</h2>
                        <p className='dark-blue'>
                            Using an advanced image recognition technology, our
                            website and app offers a unique feature where it
                            allows you to upload or capture a food image which
                            would be detected by the system and after, provide
                            recipes for the result.
                            <br></br>
                            <br></br>
                            <i>
                                *Image recognition is 80% accurate due to
                                similarities in certain food or image
                                uploaded/captured. Accuracy of detection may
                                vary accordingly. Here at Feast In, we strive to
                                improve ourselves*
                            </i>
                        </p>
                    </div>
                </div>
            </div>
            <div className='mission'>
                <div className='container'>
                    <div className='content'>
                        <h2 className='dark-blue'>Our Mission</h2>
                        <p className='dark-blue'>
                            With Feast-In, as long as the instructions are
                            followed through, step by step, anyone would be able
                            to cook great meals with the ingredients you already
                            have at home.
                        </p>
                    </div>
                    <div className='img-container'>
                        <div>
                            <img src={mission} alt='Our Mission' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='offer'>
                <div className='container container-content'>
                    <div className='img-container'>
                        <img src={offer} alt='What do we offer' />
                    </div>
                    <div className='content'>
                        <h2 className='white'>What Do We Offer?</h2>
                        <p className='white'>
                            Feast-In is here to help you cook the food you enjoy
                            with the ingredients you already have in your
                            pantry.
                            <br></br>
                            <br></br>
                            With our image recognition feature, this website/app
                            is here to help you cook up a hearty meal right in
                            your own kitchen.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
