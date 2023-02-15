import React from 'react';

const Faq = () => {
    return (
        <div className='faq-container'>

            <h1 className='faq-title'>Frequently Asked Questions (FAQ)</h1>

            <details>
                <summary>How do I report a problem or provide feedback?</summary>
                    <div className="faq-answer"> 
                        <p>Click on the 'Feedback' link in the footer to submit feedback or the 'Contact Us' 
                            link for any other problems you experience.
                        </p>
                    </div>
            </details>

            <details>
                <summary>How can I reset my password?</summary>
                    <div className="faq-answer"> 
                        <p>If you're already logged in to your account you can change your password
                            by navigating to your account settings. If you have forgotten your password, a reset 
                            request can be made at the login page.
                        </p>
                    </div>
            </details>

            <details>
                <summary>How can I rate a recipe I found on Feast-In?</summary>
                    <div className="faq-answer"> 
                        <p>On the recipes page, click on the star icon to provide your rating. An average
                            will be calculated from all users ratings and displayed for others to see.
                        </p>
                    </div>
            </details>

            <details>
                <summary>How can I edit a recipe?</summary>
                    <div className="faq-answer"> 
                        <p>On the recipes page, click on the 'Customise' button. This will save the
                            recipe to your profile, where you can edit the ingredients and steps.
                        </p>
                    </div>
            </details>

            <details>
                <summary>How can I upload a recipe of my own?</summary>
                    <div className="faq-answer"> 
                        <p>On your profile, click on the recipes section. From here there is an option
                            to upload your own recipe. Add the necessary ingredients and steps and upload
                            to your profile, or share it publicly with the community.
                        </p>
                    </div>
            </details>

            <details>
                <summary>How does the image recognition feature work?</summary>
                    <div className="faq-answer"> 
                        <p>On the 'Recipes' page next to the search feature, there is a button with a 
                            camera icon. Clicking on this icon will allow you to take a picture of a recipe 
                            or upload an existing picture you have on your device. The image recognition feature
                            will then recommend recipes that include the ingredients identified from the image.
                        </p>
                    </div>
            </details>

        </div>
    );
};

export default Faq;
