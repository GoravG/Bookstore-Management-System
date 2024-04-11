import React from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';
import CategoryPageContent from '../components/CategoryPageContent';

function CategoryPage() {
    const { categoryId } = useParams();
    return (
        <>
            <Navbar></Navbar>
            <CategoryPageContent categoryId={categoryId}></CategoryPageContent>
        </>
    )
}

export default CategoryPage