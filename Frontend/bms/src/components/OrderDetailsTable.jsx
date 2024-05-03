import React from 'react'

function OrderDetailsTable({ o }) {
    function print() {
        let printContents = document.getElementById('print').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
    return (
        <>
            <div className='container w-50'>
                <div class="card shadow border rounded mt-2 mb-2" id='print'>
                    <div class="card-body">
                        <div className="fs-2 fw-bold text-center">Order Details</div>
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
                                    <th scope="col" className='text-center'>BookID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col" className='text-center'>Quantity</th>
                                    <th scope="col" className='text-center'>Price</th>
                                    <th scope="col" className='text-center'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {o.items.map((item) =>
                                    <tr>
                                        <td className='text-center'>{item.bookId}</td>
                                        <td>{item.title}</td>
                                        <td className='text-center'>{item.quantity}</td>
                                        <td className='text-center'>{item.sellingPrice}</td>
                                        <td className='text-center'>{item.sellingPrice * item.quantity}</td>
                                    </tr>
                                )}
                            </tbody >
                            <tfoot>
                                <tr>
                                    <td colSpan={4} className='text-end fw-bold'>Total Amount:</td>
                                    <td className='text-center'>{o.totalAmount}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                {o.orderStatus === "DELIVERED" && <div className='d-grid text-center'>
                    <button className='btn btn-danger' onClick={print}>Print Invoice</button>
                </div>}
            </div >
        </>
    )
}

export default OrderDetailsTable