import React from 'react'
import Navbar from '../components/Navbar'
import BookDetails from '../components/BookDetails'
import { useParams } from 'react-router-dom'

function BookDetailPage() {
    const { bookId } = useParams();
    return (
        <>
            <Navbar />
            <BookDetails bookId={bookId} />
        </>
    )
}

export default BookDetailPage