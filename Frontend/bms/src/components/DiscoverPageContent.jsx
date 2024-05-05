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

    const handleSortByPriceAsc = () => {
        const copyArray = [...books];
        copyArray.sort((a, b) => {
            return (a.sellingPrice - b.sellingPrice);
        })
        setBooks(copyArray);
    }
    const handleSoryByPriceDesc = () => {
        const copyArray = [...books];
        copyArray.sort((a, b) => {
            return -(a.sellingPrice - b.sellingPrice);
        })
        setBooks(copyArray);
    }
    const handleSoryByDiscount = () => {
        const copyArray = [...books];
        copyArray.sort((a, b) => {
            let discA = ((a.mrp - a.sellingPrice) / a.mrp) * 100;
            let discB = ((b.mrp - b.sellingPrice) / b.mrp) * 100;
            return -(discA - discB);
        })
        setBooks(copyArray);
    }

    return (
        <div className="container mt-2 mb-2">
            <div className="row">
                <div className="teext-center">
                    <button className="btn btn-light border border-2 me-2" onClick={handleSortByPriceAsc}>Sort By Price Low to High <i className="bi bi-sort-numeric-up"></i></button>
                    <button className="btn btn-light border border-2 me-2" onClick={handleSoryByPriceDesc}>Sort By Price High to Low <i className="bi bi-sort-numeric-down-alt"></i></button>
                    <button className="btn btn-light border border-2 me-2" onClick={handleSoryByDiscount}>Sort By Highest Discount <i className="bi bi-sort-numeric-down-alt"></i></button>
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
                <nav className='mt-2'>
                    <ul className="pagination justify-content-center">
                        <li className="page-item"><button className="page-link" onClick={handlePrevButton} disabled={pageNumber == 1}>Previous</button></li>
                        {pages.map((page, index) => <li className="page-item" key={index}><a className="page-link" href={'/discover/' + page}>{page}</a></li>)}
                        <li className="page-item"><button className="page-link btn-primary" onClick={handleNextButton} disabled={pageNumber == pages.length}>Next</button></li>
                    </ul>
                </nav>
            </div>
        </div >
    )
}

export default DiscoverPageContent