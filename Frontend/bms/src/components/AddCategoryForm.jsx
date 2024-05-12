import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

function AddCategoryForm() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const baseURL = window._env_.API_URL;

    const submitForm = async () => {
        const token = sessionStorage.getItem("token");
        let data = JSON.stringify({
            "name": name,
            "description": desc
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/add_category',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                toast.success(response.data);
            })
            .catch((error) => {
                toast.error(error);
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitForm();
        setName("");
        setDesc("");
    }
    return (
        <>
            <div className="container container-fluid mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col">
                            <div className="container  p-3">
                                <form action="submit">
                                    <div className="mb-3">
                                        <div className="text-center mt-2 fw-bolder mb-2"><h1>Add New Category</h1></div>
                                        <div className="form-floating mb-2">
                                            <input type="text" className="form-control" id="name" placeholder="Enter category name" onChange={(e) => setName(e.target.value)} value={name} required />
                                            <label htmlFor="name">Category Name</label>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-2">
                                        <textarea type="desc" className="form-control" id="desc" placeholder="Enter description" onChange={(e) => setDesc(e.target.value)} value={desc} required style={{ height: 200 }} />
                                        <label htmlFor="desc">Description</label>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-grid gap-2 text-center">
                                            <button type="submit" className="btn btn-primary mt-2" onClick={e => handleSubmit(e)}>Add Category</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div >
            </div >
        </>

    )
}

export default AddCategoryForm