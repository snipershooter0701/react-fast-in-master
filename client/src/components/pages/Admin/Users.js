import React, { useContext, useEffect } from 'react';
import userContext from '../../../context/users/userContext';
import Loading from '../../reusable/Loading';

const Users = () => {
    const { users, getUsers, loading } = useContext(userContext);

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <section id='users' className='background'>
            <div className='head'>
                <div className='title'>
                    <h2>Manage Users</h2>
                </div>
                <div className='table-title'>
                    <h4>Users</h4>
                </div>
            </div>
            {users !== null && !loading ? (
                users.map(({ _id, email, username, type }) => (
                    <div className='item users' key={_id}>
                        <p>
                            <b>{username}</b>
                        </p>
                        <p>{type}</p>
                        <p>{email}</p>
                        <p>last login</p>
                    </div>
                ))
            ) : (
                <Loading />
            )}
        </section>
    );
};

export default Users;
