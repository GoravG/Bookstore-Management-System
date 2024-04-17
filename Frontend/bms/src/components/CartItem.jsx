import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { updateQuantity } from '../features/cartSlice';
import { useDispatch } from 'react-redux';

function CartItem({ item }) {
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
        <div class="card m-2 shadow ">
            <div class="row g-0"><div class="col-2">
                <div className="mx-4 my-3">
                    <img src={imgURL} width={100} height={160} class="img-fluid rounded-start" alt="..." />
                </div>
            </div>
                <div class="col-4">
                    <div class="card-body text-center mt-2">
                        <h5 class="card-title fw-bolder my-1">{item.title}</h5>
                        <p class="card-text my-0 fw-bold mt-2">Selling Price: ₹ {item.sellingPrice}</p>
                        <p class="card-text my-0 text-decoration-line-through">MRP: ₹ {item.mrp}</p>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card-body text-center mt-2">
                        <h6 class="card-title my-1">Quantity</h6>
                        <p class="card-text my-0 my-3">
                            <button className="btn btn-danger btn-sm"
                                onClick={removeQty}><i class="bi bi-dash-circle"></i></button>
                            &nbsp; &nbsp;{item.qty} &nbsp; &nbsp;
                            <button className="btn btn-success btn-sm"
                                onClick={addQty}><i class="bi bi-plus-circle"></i></button>
                        </p>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card-body mt-4">
                        <p class="card-text my-0 fw-bold">Amount: ₹ {item.sellingPrice * item.qty}</p>
                        <p class="card-text text-success fw-bold my-0">Savings: ₹ {(item.mrp * item.qty) - (item.sellingPrice * item.qty)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem