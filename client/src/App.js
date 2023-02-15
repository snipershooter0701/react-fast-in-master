import React, { Fragment, useContext } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import ScrollToTop from './components/layout/ScrolltoTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home/Home';
import About from './components/pages/About';
import Admin from './components/pages/Admin/Admin';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ErrorPage from './components/pages/ErrorPage';
import './css/main.scss';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import UserState from './context/users/UserState';
import SystemState from './context/System/SystemState';
import IngredientState from './context/ingredient/IngredientState';
import RecipeState from './context/recipe/RecipeState';
import Terms from './components/pages/Terms';
import Faq from './components/pages/Faq';
import Recipes from './components/pages/Recipe/Recipes';
import Profile from './components/pages/Profile/Profile';
import Privacy from './components/pages/Privacy';
import Contact from './components/pages/Contact';
import FilterState from './context/filter/FilterState';

function App() {
    return (
        <Router>
            <AuthState>
                <UserState>
                    <SystemState>
                        <RecipeState>
                            <IngredientState>
                                <FilterState>
                                    <Fragment>
                                        <ScrollToTop />
                                        <Navbar />
                                        <main>
                                            <Switch>
                                                <Route
                                                    exact
                                                    path='/register'
                                                    component={Register}
                                                />
                                                <Route
                                                    exact
                                                    path='/login'
                                                    component={Login}
                                                />
                                                <PrivateRoute
                                                    admin={true}
                                                    path='/admin'
                                                    component={Admin}
                                                />
                                                <Route
                                                    exact
                                                    path='/'
                                                    component={Home}
                                                />
                                                <PrivateRoute
                                                    path='/profile/:id'
                                                    component={Profile}
                                                />
                                                <Route
                                                    exact
                                                    path='/about'
                                                    component={About}
                                                />
                                                <Route
                                                    path='/recipes'
                                                    component={Recipes}
                                                />
                                                <Route
                                                    exact
                                                    path='/terms'
                                                    component={Terms}
                                                />
                                                <Route
                                                    exact
                                                    path='/faq'
                                                    component={Faq}
                                                />
                                                <Route
                                                    exact
                                                    path='/404'
                                                    component={ErrorPage}
                                                />
                                                <Route
                                                    exact
                                                    path='/privacy'
                                                    component={Privacy}
                                                />
                                                <Route
                                                    exact
                                                    path='/contact'
                                                    component={Contact}
                                                />
                                                <Redirect to='/404' />
                                            </Switch>
                                        </main>
                                        <Footer />
                                    </Fragment>
                                </FilterState>
                            </IngredientState>
                        </RecipeState>
                    </SystemState>
                </UserState>
            </AuthState>
        </Router>
    );
}

export default App;
