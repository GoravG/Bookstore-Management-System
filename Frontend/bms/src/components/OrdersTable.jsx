import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OrderRow from './OrderRow';

function OrdersTable() {
    const [orders, setOrders] = useState([]);
    const baseURL = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem("token");

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + 'admin/orders',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    async function getOrders() {
        try {
            const response = await axios.request(config);
            console.log(response.data);
            setOrders(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getOrders();
    }, [])
    return (
        <>
            <table class="table table-hover text-center">
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
        </>
    )
}

export default OrdersTable