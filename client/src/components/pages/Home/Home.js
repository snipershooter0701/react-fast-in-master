import React from 'react';
import logo from '../../../assets/img/logo.png';
import IngredientSearch from './IngredientSearch';
import TopRatedRecipes from './TopRatedRecipes';

const Home = () => {
    return (
        <div className='home'>
            <div className='hero'>
                <div className='hero-container'>
                    <h1 className='white'>Be a Chef at Home with</h1>
                    <div className='logo-container'>
                        <img src={logo} alt='Feast In Logo' />
                    </div>
                    <IngredientSearch />
                </div>
            </div>
            <TopRatedRecipes />
        </div>
    );
};

export default Home;
