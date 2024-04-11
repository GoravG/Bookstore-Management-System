import React from 'react'
import { Link } from 'react-router-dom'

function CategoryCard({ name, desc, id }) {
    return (
        <div className="col-3">
            <div className="card text-bg-light mb-3 h-100 ">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{desc}</p>
                </div>
                <div className="card-footer">
                    <Link className='btn btn-outline-dark' to={"/category/" + id}>Browse {name}</Link>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard