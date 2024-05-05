import React from 'react'
import { useNavigate } from 'react-router-dom';

function OrderRow({ order }) {
    const navigate = useNavigate();
    const navigateToUpdatePage = () => {
        navigate("/admin/orders/update/" + order.orderId)
    }
    return (
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
            <td><button className="btn btn-primary btn-sm" onClick={navigateToUpdatePage} disabled={order.orderStatus == "CANCELLED" || order.orderStatus === "DELIVERED"} >Update</button></td>
        </tr>
    )
}

export default OrderRow