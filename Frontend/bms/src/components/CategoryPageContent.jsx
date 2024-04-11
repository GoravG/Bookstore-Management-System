import React, { useEffect } from 'react'

function CategoryPageContent({ categoryId }) {
    //Complete Here Later
    useEffect(() => {
        getBooksByCategory();
    }, [])
    return (
        <div>CategoryPageContent {categoryId}</div>
    )
}

export default CategoryPageContent