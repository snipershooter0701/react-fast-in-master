import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import systemContext from '../../../../context/System/systemContext';
import Contact from './Contact';
import ContactItem from './ContactItem';
import Loading from '../../../reusable/Loading';

const Feedback = () => {
    const { contacts, getContacts, loading } = useContext(systemContext);

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    return (
        <section id='contacts' className='background'>
            <div className='head'>
                <div className='title'>
                    <h2>Contacts</h2>
                </div>
                <div className='table-title'>
                    <h4>Contacts</h4>
                </div>
            </div>
            <Switch>
                <Route exact path='/admin/contacts'>
                    {contacts !== null && !loading ? (
                        contacts.length ? (
                            contacts.map((contact) => (
                                <ContactItem contact={contact} />
                            ))
                        ) : (
                            'No messages'
                        )
                    ) : (
                        <Loading />
                    )}
                </Route>
                <Route exact path='/admin/contacts/:id' component={Contact} />
                <Redirect to='404' />
            </Switch>
        </section>
    );
};

export default Feedback;
