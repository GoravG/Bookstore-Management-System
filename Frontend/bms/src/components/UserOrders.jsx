import React, { useState, useEffect } from 'react'
import OrderItem from './OrderItem';
import axios from 'axios';

function UserOrders({ pageNumber }) {
    const baseURL = process.env.REACT_APP_API_URL;
    const [orders, setOrders] = useState([]);
    async function getOrders() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'user/orders/' + pageNumber,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        };
        try {
            const response = await axios.request(config);
            const data = response.data;
            console.log(data);
            setOrders(data);
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
            <div className='container'>
                {orders.length == 0 && <div className='text-center fs-2 fw-bold mt-5'>
                    You have no orders currently.</div>}
                <div class="row">
                    <div class="col">
                        {orders.map((order) =>
                            <OrderItem key={order.orderId} order={order} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOrders