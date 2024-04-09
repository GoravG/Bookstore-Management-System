import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify'

function InventoryTableRow({ inventoryId, title, bookId, costPrice, sellingPrice, stock }) {
    const [show, setShow] = useState(false);
    const handleRemoveButton = () => {
        setShow(true)
        if (window.confirm("Are you sure?") == true) {
            toast.success("Yes");
        } else {
            toast.warn("No");
        }
    }
    return (
        <>
            <tr>
                <td>{inventoryId}</td>
                <td>{title}</td>
                <td>{bookId}</td>
                <td>{costPrice}</td>
                <td>{sellingPrice}</td>
                <td>{stock}</td>
                <td><button type="button" class="btn btn-warning btn-sm">Edit</button></td>
                <td><button type="button" class="btn btn-danger btn-sm" onClick={handleRemoveButton}>Remove</button></td>
            </tr>
        </>
    )
}

export default InventoryTableRow