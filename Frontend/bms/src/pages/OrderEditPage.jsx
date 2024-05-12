import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

function OrderEditPage() {
    const { orderId } = useParams();
    const [userId, setUserId] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [items, setItems] = useState([]);
    const baseURL = window._env_.API_URL;


    async function getOrderDetails() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/order/' + orderId,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        };
        try {
            const response = await axios.request(config);
            setUserId(response.data.userId);
            setCreatedAt(response.data.createdAt);
            setPaymentMethod(response.data.paymentMethod);
            setPaymentStatus(response.data.paymentStatus);
            setOrderStatus(response.data.orderStatus);
            setTotalAmount(response.data.totalAmount);
            setItems(response.data.items);
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleOrderUpdate = () => {
        let data = JSON.stringify({
            "orderId": orderId,
            "paymentStatus": paymentStatus,
            "orderStatus": orderStatus
        });

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/order/update',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            data: data
        };

        async function updateOrder() {
            try {
                const response = await axios.request(config);
                toast.success(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }

        updateOrder();
    }

    useEffect(() => {
        getOrderDetails();
    }, [])

    return (
        <>
            <Navbar />
            <div className="h3 text-center mt-1">Order Status Update</div>
            <div className="row">
                <div className='col-1'>
                </div>
                <div className='col-4'>
                    <div className="h5 text-center">Order Details</div>
                    <div className="row g-1">
                        <div className="col">
                            <div className="form-floating mb-1">
                                <input type="text" className="form-control" id="OrderID" placeholder="OrderID" value={orderId} disabled />
                                <label for="OrderID">Order ID</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-1">
                                <input type="text" className="form-control" id="userId" placeholder="userId" value={userId} disabled />
                                <label for="userId">User ID</label>
                            </div>
                        </div>
                    </div>
                    <div className="row g-1">
                        <div className="col">
                            <div className="form-floating mb-1">
                                <input type="text" className="form-control" id="createdAt" placeholder="createdAt" value={new Date(createdAt).toLocaleString('en-IN')} disabled />
                                <label for="createdAt">Created At</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-1">
                                <input type="text" className="form-control" id="paymentMethod" placeholder="paymentMethod" value={paymentMethod} disabled />
                                <label for="paymentMethod">Payment Method</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-floating mb-1">
                        <select className="form-select" id="paymentStatus" aria-label="paymentStatus" onChange={(e) => setPaymentStatus(e.target.value)}>
                            <option selected>{paymentStatus}</option>
                            <option value="PENDING">PENDING</option>
                            <option value="SUCCESSFUL">SUCCESSFUL</option>
                            <option value="FAILED">FAILED</option>
                        </select>
                        <label for="paymentStatus">Payment Status</label>
                    </div>
                    <div className="form-floating mb-1">
                        <select className="form-select" id="orderStatus" aria-label="orderStatus" onChange={(e) => setOrderStatus(e.target.value)}>
                            <option selected>{orderStatus}</option>
                            <option value="PENDING">PENDING</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                        <label for="orderStatus">Order Status</label>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-success' onClick={handleOrderUpdate}>Update Order Status</button>
                    </div>
                </div>
                <div className='col-6'>
                    <div className="h5 text-center">Order Summery</div>
                    <table className="table table-bordered table-hover text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Book ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Selling Price</th>
                                <th scope="col">Cost Price</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.bookId}</td>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.sellingPrice}</td>
                                    <td>{item.costPrice}</td>
                                    <td>{item.sellingPrice * item.quantity}</td>
                                    <td>{(item.sellingPrice - item.costPrice) * item.quantity}</td>
                                </tr>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className='fw-bold' colSpan={8}>
                                    Total Amount: {totalAmount}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className='col-1'>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderEditPage