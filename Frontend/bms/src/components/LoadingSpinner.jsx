import React from 'react'

function LoadingSpinner({ name }) {
    return (
        <div className="text-center mt-5">
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="text-center">Loading {name}</div>
        </div>
    )
}

export default LoadingSpinner