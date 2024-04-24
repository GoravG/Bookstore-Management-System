import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

function InventoryEditPage() {
    const { inventoryId } = useParams();
    const baseURL = process.env.REACT_APP_API_URL;
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [bookId, setBookId] = useState();
    const [costPrice, setCostPrice] = useState();
    const [sellingPrice, setSellingPrice] = useState();
    const [mrp, setMrp] = useState();
    const [stock, setStock] = useState();
    const navigate = useNavigate();

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + 'admin/inventory/' + inventoryId,
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    };

    async function getData() {
        try {
            const response = await axios.request(config);
            setTitle(response.data.title);
            setId(response.data.id);
            setBookId(response.data.bookId);
            setCostPrice(response.data.costPrice);
            setSellingPrice(response.data.sellingPrice);
            setMrp(response.data.mrp);
            setStock(response.data.stock);
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleEditDetails = () => {
        const baseURL = process.env.REACT_APP_API_URL;
        let data = JSON.stringify({
            "inventoryId": inventoryId,
            "costPrice": costPrice,
            "sellingPrice": sellingPrice,
            "mrp": mrp,
            "stock": stock
        });

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/inventory/edit',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            },
            data: data
        };

        async function makeRequest() {
            try {
                const response = await axios.request(config);
                toast.success(response.data);
                navigate("/admin/inventory");
            }
            catch (error) {
                toast.error(error);
            }
        }

        makeRequest();
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container w-50">
                <h2 className="fw-bold text-center mt-2">Edit Inventory</h2>
                <div class="form-floating mb-1">
                    <input type="text" class="form-control" id="inventoryId" placeholder="InventoryID"
                        value={id} readOnly disabled />
                    <label for="inventoryId">Inventory ID</label>
                </div>
                <div class="form-floating mb-1">
                    <input type="text" class="form-control" id="title" placeholder="Title"
                        value={title} readOnly disabled />
                    <label for="title">Title</label>
                </div>
                <div class="form-floating mb-1">
                    <input type="text" class="form-control" id="bookId" placeholder="Book ID"
                        value={bookId} readOnly disabled />
                    <label for="bookId">Book ID</label>
                </div>
                <div class="form-floating mb-1">
                    <input type="number" class="form-control" id="costPrice" placeholder="Cost Price"
                        value={costPrice} onChange={(e) => setCostPrice(e.target.value)} />
                    <label for="costPrice">Cost Price</label>
                </div>
                <div class="form-floating mb-1">
                    <input type="number" class="form-control" id="sellingPrice" placeholder="Selling Price"
                        value={sellingPrice} min={costPrice} max={mrp} step={1} onChange={(e) => setSellingPrice(e.target.value)} />
                    <label for="sellingPrice">Selling Price</label>
                </div>
                <div class="form-floating mb-1">
                    <input type="number" class="form-control" id="mrp" placeholder="Maximum Retail Price"
                        value={mrp} min={sellingPrice} onChange={(e) => setMrp(e.target.value)} />
                    <label for="mrp">Maximum Retail Price</label>
                </div>
                <div class="form-floating mb-1">
                    <input type="number" class="form-control" id="stock" placeholder="Stock"
                        value={stock} min={0} onChange={(e) => setStock(e.target.value)} />
                    <label for="stock">Stock</label>
                </div>
                <div className="d-grid">
                    <button className="btn btn-success" onClick={handleEditDetails}>Edit Details</button>
                </div>
            </div>
        </>
    )
}

export default InventoryEditPage