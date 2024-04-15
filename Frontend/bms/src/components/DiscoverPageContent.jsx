import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from './BookCard';

function DiscoverPageContent() {
    const [books, setBooks] = useState([]);
    const baseURL = process.env.REACT_APP_API_URL;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + 'commons/discover',
        headers: {}
    };

    async function getBooks() {
        try {
            const response = await axios.request(config);
            setBooks(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBooks();
    }, [])

    return (
        <div className="container mt-2 mb-2">
            <div className="row">
                <div className="teext-center border">
                    <button className="btn btn-primary me-2">Sort By Price Low to High</button>
                    <button className="btn btn-primary me-2">Sort By Price High to Low</button>
                    <button className="btn btn-primary me-2">Sort By Discount</button>
                </div>
                <div className="container-fluid mt-2 mb-2">
                    <div className="row row-cols-4 g-2">
                        {books.map((book) => {
                            return <BookCard
                                bookId={book.bookId}
                                title={book.title}
                                author={book.author}
                                description={book.description}
                                noOfPages={book.noOfPages}
                                coverImage={book.coverImage}
                                stock={book.stock}
                                sellingPrice={book.sellingPrice}
                                mrp={book.mrp}
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscoverPageContent