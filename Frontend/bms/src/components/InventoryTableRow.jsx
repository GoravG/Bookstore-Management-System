import React from 'react'

function InventoryTableRow({ inventoryId, title, bookId, costPrice, sellingPrice, stock }) {
    return (
        <tr>
            <td>{inventoryId}</td>
            <td>{title}</td>
            <td>{bookId}</td>
            <td>{costPrice}</td>
            <td>{sellingPrice}</td>
            <td>{stock}</td>
            <td><button type="button" class="btn btn-warning btn-sm">Edit</button></td>
            <td><button type="button" class="btn btn-danger btn-sm">Remove</button></td>
        </tr>
    )
}

export default InventoryTableRow