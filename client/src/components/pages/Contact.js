import React, { useContext, useState } from 'react';
import contactimage from '../../assets/img/contact-image.png';
import systemContext from '../../context/System/systemContext';

const Contact = () => {
    const { createContact } = useContext(systemContext);

    const initialState = {
        first_name: '',
        last_name: '',
        email: '',
        message: '',
    };

    const [form, setForm] = useState(initialState);

    const onSubmit = (e) => {
        e.preventDefault();
        createContact(form);
        setForm(initialState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const { first_name, last_name, email, message } = form;

    return (
        <div className='contact-container'>
            <div className='contact-image'>
                <img src={contactimage} alt='Messenger icon' />
            </div>

            <div className='contact-content'>
                <h1 className='contact-title'>Contact Us</h1>

                <form onSubmit={onSubmit}>
                    <p>First Name</p>
                    <input
                        placeholder='Enter First Name'
                        type='text'
                        name='first_name'
                        value={first_name}
                        required
                        onChange={handleChange}
                    />

                    <p>Last Name</p>
                    <input
                        placeholder='Enter Last Name'
                        type='text'
                        name='last_name'
                        value={last_name}
                        required
                        onChange={handleChange}
                    />

                    <p>E-mail</p>
                    <input
                        placeholder='Enter E-mail Address'
                        type='email'
                        name='email'
                        value={email}
                        required
                        onChange={handleChange}
                    />

                    <p>Subject</p>
                    <textarea
                        placeholder='Type your message'
                        name='message'
                        value={message}
                        required
                        onChange={handleChange}
                    />

                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
