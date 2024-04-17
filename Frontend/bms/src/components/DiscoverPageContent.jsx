import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from './BookCard';
import { useNavigate, useParams } from 'react-router-dom';

function DiscoverPageContent() {
    const [dep, setDep] = useState(false);
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const { pageNumber } = useParams();
    const [pages, setPages] = useState([]);
    const baseURL = process.env.REACT_APP_API_URL;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + 'commons/discover/' + (pageNumber - 1),
        headers: {}
    };

    async function getBooks() {
        try {
            const response = await axios.request(config);
            console.log(response.data);
            setBooks(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNoOfPages();
        getBooks();
    }, [dep])

    const handlePrevButton = () => {
        if (pageNumber == 1)
            return;
        navigate("/discover/" + (pageNumber - 1));
        setDep(!dep);
    }
    const handleNextButton = () => {
        if (pageNumber == pages.length)
            return;
        navigate("/discover/" + (Number(pageNumber) + 1));
        setDep(!dep);
    }
    const getNoOfPages = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'commons/discover/pages',
            headers: {}
        };

        async function makeRequest() {
            try {
                const response = await axios.request(config);
                let temp = [];
                for (let i = 1; i <= response.data; i++) {
                    temp.push(i);
                }
                setPages(temp);
            }
            catch (error) {
                console.log(error);
            }
        }

        makeRequest();
    }

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
                <nav aria-label="Page navigation example ">
                    <ul class="pagination justify-content-center">
                        <li class="page-item"><a class="page-link" onClick={handlePrevButton}>Previous</a></li>
                        {pages.map((page) => <li class="page-item"><a class="page-link" href={'/discover/' + page}>{page}</a></li>)}
                        <li class="page-item"><a class="page-link" onClick={handleNextButton}>Next</a></li>
                    </ul>
                </nav>
            </div>
        </div >
    )
}

export default DiscoverPageContent