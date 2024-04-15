import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Subtotal() {
    const cart = useSelector(state => state.cart);
    const [totalAmount, setTotalAmount] = useState();
    const calcTotalAmount = () => {
        var amt = 0;
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items.at(i);
            amt = amt + item.sellingPrice * item.qty;
        }
        setTotalAmount(amt);
    }
    useEffect(() => {
        calcTotalAmount();
    })
    return (
        <>
            <h3 className='text-center mt-3 fw-bolder'>Subtotal</h3>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Order</th>
                        <th className='text-end' scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.items.map((item) => (<tr>
                        <td className='fw-light'>{item.title} x {item.qty}</td>
                        <td className='text-end'>{item.sellingPrice * item.qty}</td>
                    </tr>))}
                </tbody>
                <tfoot>
                    <tr>
                        <td className='text-end fw-bold'>Total:</td>
                        <td className='text-end fw-bold'>₹ {totalAmount}</td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default Subtotal