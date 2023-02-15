import React, { useContext, useEffect, Fragment } from 'react';
import systemContext from '../../../../context/System/systemContext';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import InternalLink from '../../../reusable/InternalLink';
import Back from '../../../icons/Back';
import Loading from '../../../reusable/Loading';

const Contact = () => {
    const { current, getContact, loading } = useContext(systemContext);

    const { id } = useParams();

    useEffect(() => {
        if (current === null) {
            getContact(id);
        }

        // eslint-disable-next-line
    }, []);

    return (
        <div className='contact'>
            <InternalLink to='/admin/contacts'>
                <div className='back-container'>
                    <Back fill='#f15a2e' width='18px' height='18px' />
                    <span>Back</span>
                </div>
            </InternalLink>
            <div className='message-container'>
                {current !== null && !loading ? (
                    <Fragment>
                        <div className='row'>
                            <label>First Name</label>
                            <p>{current.first_name}</p>
                        </div>
                        <div className='row'>
                            <label>Last Name</label>
                            <p>{current.last_name}</p>
                        </div>
                        <div className='row'>
                            <label>Email</label>
                            <p>{current.email}</p>
                        </div>
                        <div className='row'>
                            <label>Message</label>
                            <p>{current.message}</p>
                        </div>
                        <div className='row'>
                            <label>Message sent at</label>
                            <p>
                                {moment(current.createdAt).format(
                                    'MMMM DD, YYYY HH:mm:ss'
                                )}
                            </p>
                        </div>
                    </Fragment>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};

export default Contact;
