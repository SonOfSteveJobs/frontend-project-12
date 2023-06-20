import React from 'react';
import cl from './Loader.module.css'

const Loader = () => {
    return (
        <div className={cl.loader}>
            <h2>Loading . . .</h2>
        </div>
    );
};

export default Loader;
