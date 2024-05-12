import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InventoryTableRow({ inventoryId, title, bookId, costPrice, sellingPrice, stock, mrp }) {
    const navigate = useNavigate();
    const baseURL = window._env_.API_URL;
    const token = sessionStorage.getItem("token");
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: baseURL + 'admin/remove_from_inventory/' + inventoryId,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    async function deleteItem() {
        try {
            const response = await axios.request(config);
            toast.success(response.data);
        }
        catch (error) {
            toast.error(error.data);
        }
    }



    const handleRemoveButton = () => {
        if (window.confirm("Are you sure?") == true) {
            deleteItem();
            navigate("/admin/dashboard");
        } else {
        }
    }
    const handleEditButton = () => {
        navigate("/admin/inventory/edit/" + inventoryId);
    }
    return (
        <>
            <tr>
                <td>{inventoryId}</td>
                <td>{title}</td>
                <td>{bookId}</td>
                <td>{costPrice}</td>
                <td>{sellingPrice}</td>
                <td>{mrp}</td>
                <td>{stock}</td>
                <td><button type="button" className="btn btn-warning btn-sm" onClick={handleEditButton}>Edit</button></td>
                <td><button type="button" className="btn btn-danger btn-sm" onClick={handleRemoveButton}>Remove</button></td>
            </tr>
        </>
    )
}

export default InventoryTableRow