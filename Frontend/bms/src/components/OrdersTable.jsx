import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderRow from './OrderRow';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function OrdersTable() {
    const navigate = useNavigate();
    const [dep, setDep] = useState(false);
    const { pageNumber } = useParams()
    const [orders, setOrders] = useState([]);
    const baseURL = window._env_.API_URL;
    const token = sessionStorage.getItem("token");
    const [pages, setPages] = useState([]);

    async function getOrders() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/orders/' + Number(pageNumber - 1),
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        try {
            const response = await axios.request(config);
            setOrders(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    async function getPages() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/orders/no_of_pages',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
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
    useEffect(() => {
        getPages();
        getOrders();
    }, [dep])
    const handlePrevButton = () => {
        if (pageNumber == 1)
            return;
        navigate("/admin/orders/" + (pageNumber - 1));
        setDep(!dep);
    }
    const handleNextButton = () => {
        if (pageNumber == pages.length)
            return;
        navigate("/admin/orders/" + (Number(pageNumber) + 1));
        setDep(!dep);
    }
    return (
        <>
            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col">OrderID</th>
                        <th scope="col">UserID</th>
                        <th scope="col">PINCODE</th>
                        <th scope="col">Created<br></br>At</th>
                        <th scope="col">Last Updated At</th>
                        <th scope="col">Payment<br></br>Method</th>
                        <th scope="col">Payment<br></br>Status</th>
                        <th scope="col">Order<br></br>Status</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Update<br></br>Order</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) =>
                        <OrderRow key={order.orderId} order={order} />
                    )}
                </tbody>
            </table >
            <nav className='mt-2'>
                <ul className="pagination justify-content-center">
                    <li className="page-item"><button className="page-link" onClick={handlePrevButton} disabled={pageNumber == 1}>Previous</button></li>
                    {pages.map((page, index) => <li key={index} className="page-item"><a className="page-link" href={'/admin/orders/' + page}>{page}</a></li>)}
                    <li className="page-item"><button className="page-link btn-primary" onClick={handleNextButton} disabled={pageNumber == pages.length}>Next</button></li>
                </ul>
            </nav>
        </>
    )
}

export default OrdersTable