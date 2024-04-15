import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateQuantity } from '../features/cartSlice';
import { useState } from 'react';

function CartItemRow({ item }) {
    const dispatch = useDispatch();
    const addQty = () => {
        dispatch(updateQuantity({ bookId: item.bookId, qty: item.qty + 1 }));
    }
    const removeQty = () => {
        dispatch(updateQuantity({ bookId: item.bookId, qty: item.qty - 1 }));
    }
    const [imgURL, setImgURL] = useState("");
    const processImage = () => {
        const coverImg = item.coverImage;
        // Decode the base64 string
        const decodedImage = atob(coverImg);
        // Convert the decoded string to a Uint8Array
        const arrayBuffer = new Uint8Array(decodedImage.length);
        for (let i = 0; i < decodedImage.length; i++) {
            arrayBuffer[i] = decodedImage.charCodeAt(i);
        }
        // Create a blob from the Uint8Array
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // Change the type accordingly
        // Create a URL for the blob
        const imageUrl = URL.createObjectURL(blob);
        setImgURL(imageUrl);
    }
    useEffect(() => {
        processImage();
    }, [])
    return (
        <div className="card m-2 shadow">
            <div className="row g-0"><div className="col-2">
                <div className="mx-4 my-3">
                    <img src={imgURL} width={100} height={160} className="img-fluid rounded-start" alt="..." />
                </div>
            </div>
                <div className="col-4">
                    <div className="card-body text-center mt-3">
                        <h5 className="card-title fw-bolder my-1">{item.title}</h5>
                        <p className="card-text my-0 fw-bold mt-2">Selling Price: ₹ {item.sellingPrice}</p>
                        <p className="card-text my-0 text-decoration-line-through">MRP: ₹ {item.mrp}</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card-body text-center mt-3">
                        <h6 className="card-title my-1">Quantity</h6>
                        <p className="card-text my-0 my-3">
                            <button className="btn btn-outline-danger btn-sm"
                                onClick={removeQty}><i className="bi bi-dash-circle"></i></button>
                            &nbsp; &nbsp;{item.qty} &nbsp; &nbsp;
                            <button className="btn btn-outline-success btn-sm"
                                onClick={addQty}><i className="bi bi-plus-circle"></i></button>
                        </p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card-body mt-3">
                        <p className="card-text my-0 fw-bold my-1">Amount: ₹ {item.sellingPrice * item.qty}</p>
                        <p className="card-text text-success fw-bold my-0">Savings: ₹ {(item.mrp * item.qty) - (item.sellingPrice * item.qty)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItemRow