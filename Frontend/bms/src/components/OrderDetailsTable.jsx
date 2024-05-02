import React from 'react'

function OrderDetailsTable({ o }) {
    return (
        <>
            <div className='container w-50'>
                <div className='fs-2 text-center my-2'>Order Details</div>
                <div class="card shadow border rounded mt-2 mb-3">
                    <div class="card-body">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>OrderID:</td>
                                    <td>{o.orderId}</td>
                                </tr>
                                <tr>
                                    <td>Payment Method:</td>
                                    <td>{o.paymentMethod}</td>
                                </tr>
                                <tr>
                                    <td>Payment Status:</td>
                                    <td>{o.paymentStatus}</td>
                                </tr>
                                <tr>
                                    <td>Order Status:</td>
                                    <td>{o.orderStatus}</td>
                                </tr>
                                <tr>
                                    <td>Amount:</td>
                                    <td>₹ {o.totalAmount}</td>
                                </tr>
                                <tr>
                                    <td>Ordered On:</td>
                                    <td>{new Date(o.createdAt).toLocaleString('en-IN')}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">BookID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col" className='text-center'>Quantity</th>
                                    <th scope="col" className='text-center'>Price</th>
                                    <th scope="col" className='text-end'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {o.items.map((item) =>
                                    <tr>
                                        <td>{item.bookId}</td>
                                        <td>{item.title}</td>
                                        <td className='text-center'>{item.quantity}</td>
                                        <td className='text-center'>{item.sellingPrice}</td>
                                        <td className='text-end'>{item.sellingPrice * item.quantity}</td>
                                    </tr>
                                )}
                            </tbody >
                            <tfoot>
                                <tr>
                                    <td colSpan={4} className='text-end fw-bold'>Total Amount:</td>
                                    <td className='text-end'>{o.totalAmount}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}

export default OrderDetailsTable