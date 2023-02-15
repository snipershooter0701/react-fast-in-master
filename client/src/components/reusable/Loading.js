import React from 'react';
import loading from '../../assets/img/loading.gif';

const Loading = () => {
    return (
        <div className='loading-container'>
            <img src={loading} alt='Loading...' />
        </div>
    );
};

export default Loading;
