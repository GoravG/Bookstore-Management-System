import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

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
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.userId}</td>
                            <td>{order.address.pincode}</td>
                            <td>{new Date(order.createdAt).toLocaleString('en-IN')}</td>
                            <td>{new Date(order.updatedAt).toLocaleString('en-IN')}</td>
                            <td >{order.paymentMethod}</td>
                            <td>{order.paymentStatus}</td>
                            <td>{order.orderStatus}</td>
                            <td>{order.totalAmount}</td>
                            <td><button className="btn btn-primary btn-sm">Update</button></td>
                        </tr>
                    )}
                </tbody>
            </table >
        </>
    )
}

export default OrdersTable