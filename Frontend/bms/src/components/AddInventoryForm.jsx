import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

function AddInventoryForm() {
    const baseURL = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(false);
    const [titles, setTitles] = useState([]);
    const token = sessionStorage.getItem("token");
    const [bookId, setBookID] = useState();
    const [costPrice, setCostPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [stock, setStock] = useState();

    const loadTitles = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'commons/titles',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setTitles(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Unable to load titles");
                setLoading(false);
            });
    }
    useEffect(() => {
        setLoading(true);
        loadTitles();
        setLoading(false);
    }, [])

    const submitData = async () => {
        let data = JSON.stringify({
            "bookId": bookId,
            "costPrice": costPrice,
            "sellingPrice": sellingPrice,
            "stock": stock
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/add_or_update_inventory',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                toast.success("Successfully added records");
            })
            .catch((error) => {
                toast.error("Unable to add records");
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        submitData();
        setBookID("");
        setCostPrice("");
        setSellingPrice("");
        setStock("");
    }
    return (
        (loading
            ?
            (<><div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div></>)
            :
            (<>
                <div className="container container-fluid mt-1">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                            </div>
                            <div className="col-6">
                                <div className="container  p-3">
                                    <form action="submit" noValidate>
                                        <div className="mb-3">
                                            <div className="text-center mt-2 fw-bolder">
                                                <h1>Add / Update Existing Book From Inventory</h1>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e) => setBookID(e.target.value)}>
                                                    {titles.map((book) => <option key={book.id} value={book.id}>{book.title}</option>)}
                                                </select>
                                                <label for="floatingSelect">Select a Title</label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <input type="number" class="form-control" id="costPrice" placeholder="Enter cost price" onChange={(e) => setCostPrice(e.target.value)} value={costPrice} required />
                                                <label for="costPrice">Cost Price</label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <input type="number" class="form-control" id="sellingPrice" onChange={(e) => setSellingPrice(e.target.value)} value={sellingPrice} required min={0} step={0.50} placeholder="Enter selling price" />
                                                <label for="sellingPrice">Selling Price</label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <input type="number" class="form-control" id="stock" onChange={(e) => setStock(e.target.value)} value={stock} required min={0} step={1} placeholder="Enter stock" />
                                                <label for="stock">Stock</label>
                                            </div>
                                        </div>
                                        <div className="d-grid text-center mb-2">
                                            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Add New Book/Update Existing Book</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col">
                            </div>
                        </div>
                    </div >
                </div >

            </>)
        )
    )
}

export default AddInventoryForm