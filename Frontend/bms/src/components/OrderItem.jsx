import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

function OrderItem({ order }) {
    const navigate = useNavigate();
    const handleCancelOrder = () => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            const baseURL = process.env.REACT_APP_API_URL;
            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: baseURL + 'user/order/' + order.orderId,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                }
            };

            async function makeRequest() {
                try {
                    const response = await axios.request(config);
                    toast.success(response.data);
                    navigate("/");
                }
                catch (error) {
                    console.log(error);
                }
            }

            makeRequest();
        } else {
        }
    }
    const handleViewOrderDetails = () => {
        navigate("/user/order/" + Number(order.orderId));
    }
    return (
        <>
            <div class="card mt-2 mb-2 shadow">
                <div class="card-body">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td>OrderID:</td>
                                <td>{order.orderId}</td>
                            </tr>
                            <tr>
                                <td>Shipping Address:</td>
                                <td>{order.address.firstLine},{order.address.city}, {order.address.state}, PINCODE:{order.address.pincode}</td>
                            </tr>
                            <tr>
                                <td>Payment Method:</td>
                                <td>{order.paymentMethod}</td>
                            </tr>
                            <tr>
                                <td>Payment Status:</td>
                                <td>{order.paymentStatus}</td>
                            </tr>
                            <tr>
                                <td>Order Status:</td>
                                <td>{order.orderStatus}</td>
                            </tr>
                            <tr>
                                <td>Amount:</td>
                                <td>₹ {order.totalAmount}</td>
                            </tr>
                            <tr>
                                <td>Ordered On:</td>
                                <td>{new Date(order.createdAt).toLocaleString('en-IN')}</td>
                            </tr>
                            <tr>
                                <td>Last Updated On:</td>
                                <td>{new Date(order.updatedAt).toLocaleString('en-IN')}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='text-center'>
                        <button type="button" class="btn btn-primary me-2" onClick={handleViewOrderDetails}>
                            View Order Details
                        </button>
                        <button className="btn btn-danger" onClick={handleCancelOrder} disabled={order.orderStatus === "CANCELLED" || order.orderStatus === "DELIVERED"}>Cancel Order</button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default OrderItem