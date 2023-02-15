import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SideNav from '../../layout/SideNav';
import Dashboard from './Dashboard';
import Contacts from './Contacts/Contacts';
import Logs from './Logs';
import Ingredients from './Ingredient/Ingredients';
import Recipes from './Recipe/Recipes';
import Users from './Users';

const Admin = () => {
    return (
        <div className='admin-container'>
            <SideNav />
            <div id='admin-content'>
                <Switch>
                    <Route path='/admin' exact component={Dashboard} />
                    <Route path='/admin/contacts' component={Contacts} />
                    <Route path='/admin/logs' exact component={Logs} />
                    <Route path='/admin/ingredients' component={Ingredients} />
                    <Route path='/admin/recipes' component={Recipes} />
                    <Route path='/admin/users' exact component={Users} />
                    <Redirect to='/404' />
                </Switch>
            </div>
        </div>
    );
};

export default Admin;
