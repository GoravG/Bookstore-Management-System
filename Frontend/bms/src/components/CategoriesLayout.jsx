import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner';



function CategoriesLayout() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const baseURL = window._env_.API_URL;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + 'commons/categories',
        headers: {}
    };

    async function getCategories() {
        try {
            setLoading(true);
            const response = await axios.request(config);
            setCategories(response.data);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])


    return (
        (loading == true ?
            <LoadingSpinner name={"Categories"} /> : (
                <div className="container-fluid">
                    <div className="row g-2 mt-2">
                        {loading == true ? <h1>Loading Data</h1> :
                            categories.map((item) =>
                                <CategoryCard key={item.id} name={item.name} desc={item.description} id={item.id} />
                            )
                        }
                    </div>
                </div>))
    )
}

export default CategoriesLayout