import React from 'react'
import Navbar from '../components/Navbar'
import InfoCard from '../components/InfoCard'
import InsightsBarChart from '../components/InsightsBarChart'
import InsightsPieChart from '../components/InsightsPieChart'
function InsightsPage() {
    return (
        <>
            <Navbar />
            <div className="container-fluid my-3">
                <div className='row g-2'>
                    <div className="col-4">
                        <InfoCard title={"Today's Profit"} unit={"₹"} variable={0} url={"admin/orders/get_last_n_day_profit?last_days="} />
                    </div>
                    <div className="col-4">
                        <InfoCard title={"Last Week's Profit"} unit={"₹"} variable={7} url={"admin/orders/get_last_n_day_profit?last_days="} />
                    </div>
                    <div className="col-4">
                        <InfoCard title={"Last Month's Profit"} unit={"₹"} variable={30} url={"admin/orders/get_last_n_day_profit?last_days="} />
                    </div>
                    <div className="col-3">
                        <InfoCard title={"Today's Sales"} variable={0} url={"admin/orders/last_n_day_orders?last_days="} />
                    </div>
                    <div className="col-3">
                        <InfoCard title={"Last Week's Sales"} variable={7} url={"admin/orders/last_n_day_orders?last_days="} />
                    </div>
                    <div className="col-3">
                        <InfoCard title={"Last Month's Sales"} variable={30} url={"admin/orders/last_n_day_orders?last_days="} />
                    </div>
                    <div className="col-3">
                        <InfoCard title={"Last Year's Sales"} variable={365} url={"admin/orders/last_n_day_orders?last_days="} />
                    </div>
                    <div className="col-4">
                        <InfoCard title={"Pending Orders"} variable={"PENDING"} url={"admin/orders/count_orders?status="} />
                    </div>
                    <div className="col-4">
                        <InfoCard title={"Delivered Orders"} variable={"DELIVERED"} url={"admin/orders/count_orders?status="} />
                    </div>
                    <div className="col-4">
                        <InfoCard title={"Cancelled Orders"} variable={"CANCELLED"} url={"admin/orders/count_orders?status="} />
                    </div>
                    <div className="col-6">
                        <InsightsBarChart title={"Orders"} url={"admin/orders/get_last_n_day_orders?last_days="} />
                    </div>
                    <div className="col-6">
                        <InsightsPieChart title={"Orders by Order Status"} url={"admin/orders/get_order_count_by_order_status"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InsightsPage