import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import UserOrders from '../components/UserOrders';

function UserOrdersPage() {
    const baseURL = process.env.REACT_APP_API_URL;
    const [pages, setPages] = useState([]);
    const { pageNumber } = useParams();
    async function getNoOfPages() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'user/order_count',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        };
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
                    <UserOrders pageNumber={pageNumber} />
                    <ul class="pagination justify-content-center">
                        {pages.map((page) =>
                            <li class="page-item"><a class="page-link" href={!(page == pageNumber) ? '/user/orders/' + page : null} >{page}</a></li>)}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default UserOrdersPage