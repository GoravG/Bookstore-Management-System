import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InventoryTableRow from './InventoryTableRow';

function InventoryTable() {
    const [inventory, setInventory] = useState([]);
    const baseURL = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        getInventory();
    }, [])

    const getInventory = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: baseURL + 'admin/inventory',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        async function makeRequest() {
            try {
                const response = await axios.request(config);
                console.log(JSON.stringify(response.data));
                setInventory(response.data);
                console.log(inventory);
            }
            catch (error) {
                console.log(error);
            }
        }
        makeRequest();
    }

    return (
        (inventory.length == 0)
            ?
            <h1>Looks Like Inventory is Empty</h1>
            :
            (<table class="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col">InventoryID</th>
                        <th scope="col">Title</th>
                        <th scope="col">BookID</th>
                        <th scope="col">Cost Price</th>
                        <th scope="col">Selling Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => <InventoryTableRow
                        inventoryId={item.id}
                        title={item.title}
                        bookId={item.bookId}
                        costPrice={item.costPrice}
                        sellingPrice={item.sellingPrice}
                        stock={item.stock}
                    />)}
                </tbody>
            </table>)
    )
}

export default InventoryTable