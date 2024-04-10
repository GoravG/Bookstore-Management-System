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
    const handleSortByInventoryID = () => {
        const copyArray = [...inventory];
        copyArray.sort((a, b) => {
            return (a.id - b.id);
        })
        setInventory(copyArray);
    }
    const handleSortByBookID = () => {
        const copyArray = [...inventory];
        copyArray.sort((a, b) => {
            return (a.bookId - b.bookId);
        })
        setInventory(copyArray);
    }
    const handleSortByCostPrice = () => {
        const copyArray = [...inventory];
        copyArray.sort((a, b) => {
            return (a.costPrice - b.costPrice);
        })
        setInventory(copyArray);
    }
    const handleSortByStock = () => {
        const copyArray = [...inventory];
        copyArray.sort((a, b) => {
            return (a.stock - b.stock);
        })
        setInventory(copyArray);
    }
    const handleSortBySellingPrice = () => {
        const copyArray = [...inventory];
        copyArray.sort((a, b) => {
            return (a.sellingPrice - b.sellingPrice);
        })
        setInventory(copyArray);
    }

    return (
        (inventory.length == 0)
            ?
            <h1>Looks Like Inventory is Empty</h1>
            :
            (<table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col" >InventoryID
                            <button type="button" className="btn btn-sm" onClick={handleSortByInventoryID}>
                                <i className="bi bi-sort-numeric-up"></i>
                            </button>
                        </th>
                        <th scope="col">Title
                        </th>
                        <th scope="col">BookID
                            <button type="button" className="btn btn-sm" onClick={handleSortByBookID}>
                                <i className="bi bi-sort-numeric-up"></i>
                            </button>
                        </th>
                        <th scope="col">Cost Price
                            <button type="button" className="btn btn-sm" onClick={handleSortByCostPrice}>
                                <i className="bi bi-sort-numeric-up"></i>
                            </button>
                        </th>
                        <th scope="col">Selling Price
                            <button type="button" className="btn btn-sm" onClick={handleSortBySellingPrice}>
                                <i className="bi bi-sort-numeric-up"></i>
                            </button>
                        </th>
                        <th scope="col">Stock
                            <button type="button" className="btn btn-sm" onClick={handleSortByStock}>
                                <i className="bi bi-sort-numeric-up"></i>
                            </button>
                        </th>
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