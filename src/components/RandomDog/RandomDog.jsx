import React from 'react';

import './RandomDog.css'

export default function RandomDog ({ dogUrl, isLoadingDog }){
    return(
        <div>
        {
            isLoadingDog ? (
                <p className="loading-text">Loading...</p>
            ) : (
                <img src={dogUrl} alt="header" className="header-img" />
            )
        }
        </div>
    )
}
