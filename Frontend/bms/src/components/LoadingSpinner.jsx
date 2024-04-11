import React from 'react'

function LoadingSpinner({ name }) {
    return (
        <div class="text-center mt-5">
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="text-center">Loading {name}</div>
        </div>
    )
}

export default LoadingSpinner