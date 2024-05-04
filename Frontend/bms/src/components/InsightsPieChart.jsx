import { PieChart } from '@mui/x-charts'
import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';

function InsightsPieChart({ title }) {
    const [data, setData] = useState([]);
    const baseURL = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem("token");

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + "admin/orders/get_order_count_by_order_status",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    async function getData() {
        try {
            const response = await axios.request(config);
            console.log(response.data);
            setData(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div class="card bg-light h-100">
            <div class="card-body">
                <h5 className='cart-title'>{title}</h5>
                <PieChart
                    colors={["#f94144", "#f8961e", "#f9c74f", "#90be6d", "#577590"]}
                    series={[
                        {
                            data: data.map((item, index) => ({ id: index, value: item.value, label: item.key })),
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    width={600}
                    height={300}
                    margin={{ top: 40, bottom: 10, left: 10, right: 10 }}
                />
            </div>
        </div>
    )
}

export default InsightsPieChart