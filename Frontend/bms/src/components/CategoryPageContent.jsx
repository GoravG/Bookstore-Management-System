import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from './BookCard';

function CategoryPageContent({ categoryId }) {
    const [books, setBooks] = useState([]);
    const getBooksByCategory = () => {
        const baseURL = process.env.REACT_APP_API_URL;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'commons/category/' + categoryId,
            headers: {}
        };

        async function getData() {
            try {
                const response = await axios.request(config);
                setBooks(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getData();
    }
    useEffect(() => {
        getBooksByCategory();
    }, [])
    return (
        (books.length == 0 ?
            <>
                <div className="container mt-5 text-center">
                    <h3>
                        "Looks like we're exploring new horizons! 🌟 While we don't currently have books in this category, let's broaden our search or dive into a different genre together. 📚 There's a world of knowledge waiting to be discovered! 🌍✨"</h3>
                </div>
            </>
            :
            (<div className="container mt-2 mb-2">
                <div className="row">
                    <div className="container-fluid mt-2 mb-2">
                        <div className="row row-cols-4 g-2">
                            {books.map((book) => {
                                return <BookCard key={book.bookId}
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
            </div>))
    )
}

export default CategoryPageContent