import React from 'react';
import InternalLink from '../reusable/InternalLink';
import Dashboard from '../icons/Dashboard';
import Feedback from '../icons/Feedback';
import Logs from '../icons/Logs';
import Recipes from '../icons/Recipes';
import Ingredients from '../icons/Ingredients';
import Users from '../icons/Users';

const SideNav = () => {
    return (
        <aside className='side-nav'>
            {/* <div className='logo'>feast in</div> */}
            <div className='side-nav-container'>
                <div className='side-nav__inner main'>
                    <h5>Main</h5>
                    <div className='links-container'>
                        <div className='icon-container'>
                            <Dashboard fill='#fff' width='20px' height='20px' />
                            <InternalLink to='/admin'>Dashboard</InternalLink>
                        </div>
                        <div className='icon-container'>
                            <Feedback fill='#fff' width='20px' height='20px' />
                            <InternalLink to='/admin/contacts'>
                                Contacts
                            </InternalLink>
                        </div>
                        <div className='icon-container'>
                            <Logs fill='#fff' width='16px' height='16px' />
                            <InternalLink to='/admin/logs'>Logs</InternalLink>
                        </div>
                    </div>
                </div>
                <div className='side-nav__inner manage'>
                    <h5>Manage</h5>
                    <div className='links-container'>
                        <div className='icon-container'>
                            <Ingredients
                                fill='#fff'
                                width='20px'
                                height='20px'
                            />
                            <InternalLink to='/admin/ingredients'>
                                Ingredients
                            </InternalLink>
                        </div>
                        <div className='icon-container'>
                            <Recipes fill='#fff' width='20px' height='20px' />
                            <InternalLink to='/admin/recipes'>
                                Recipes
                            </InternalLink>
                        </div>
                        <div className='icon-container'>
                            <Users fill='#fff' width='20px' height='20px' />
                            <InternalLink to='/admin/users'>Users</InternalLink>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideNav;
