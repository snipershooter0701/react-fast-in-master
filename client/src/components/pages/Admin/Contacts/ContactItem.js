import React, { useContext } from 'react';
import InternalLink from '../../../reusable/InternalLink';
import moment from 'moment';
import systemContext from '../../../../context/System/systemContext';

const ContactItem = ({ contact }) => {
    const { setCurrent } = useContext(systemContext);

    const { _id, first_name, last_name, email, message, createdAt } = contact;

    return (
        <InternalLink
            onClick={() => setCurrent(contact)}
            to={`/admin/contacts/${_id}`}
            className='item contacts'
        >
            <p>
                <b>{moment(createdAt).format('MMMM DD, YYYY HH:mm:ss')}</b>
            </p>
            <p>{first_name}</p>
            <p>{last_name}</p>
            <p>{email}</p>
            {/* Fix the width and use text-ellpipsis, coz we showing contact in a different page */}
            <p className='message'>{message}</p>
        </InternalLink>
    );
};

export default ContactItem;
