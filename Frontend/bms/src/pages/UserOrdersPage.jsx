import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function UserOrdersPage() {
    const baseURL = process.env.REACT_APP_API_URL;
    const [pages, setPages] = useState([]);
    const { pageNumber } = useParams();
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + 'user/order_count',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    };

    async function getNoOfPages() {
        try {
            const response = await axios.request(config);
            const items = response.data;
            const noOfPages = Math.ceil(items / 4);
            let temp = [];
            for (let i = 1; i <= noOfPages; i++) {
                temp.push(i);
            }
            setPages(temp);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getNoOfPages();
    }, [])
    return (
        <>
            <Navbar />
            <div className="container mt-2 mb-2">
                <nav className='mt-2'>
                    <ul class="pagination justify-content-center">
                        <li class="page-item"><button class="page-link" disabled={pageNumber == 1}>Previous</button></li>
                        {pages.map((page) =>
                            <li class="page-item"><a class="page-link" href={'/user/orders/' + page}>{page}</a></li>)}
                        <li class="page-item"><button class="page-link btn-primary" disabled={pageNumber == pages.length}>Next</button></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default UserOrdersPage