import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder, adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import Sidebar from "./Sidebar";
import jsPDF from 'jspdf';

export default function OrderList() {
    const { adminOrders = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderState);
    const dispatch = useDispatch();

    const [filteredOrders, setFilteredOrders] = useState(adminOrders); // Initialize with all orders

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Number of Items',
                    field: 'noOfItems',
                    sort: 'asc',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc',
                },
            ],
            rows: [],
        };

        let increment = 1;

        filteredOrders.forEach((order) => { // Use filteredOrders here
            data.rows.push({
                id: `ORD0${increment++}`,
                noOfItems: order.orderItems.length,
                amount: `LKR ${order.totalPrice}`,
                status: (
                    <p style={{ color: order.orderStatus.includes('Processing') ? 'red' : 'green' }}>
                        {order.orderStatus}
                    </p>
                ),
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Button onClick={(e) => deleteHandler(e, order._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id));
    }

    const generatePDF = (dataToPrint) => { // Accept the data to print as a parameter
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 128);
        doc.text("Order Details Report", 105, 15, { align: "center" });

        const columns = ["ID", "Number of Items", "Amount", "Status"];
        const rows = [];

        let increment = 1;

        dataToPrint.forEach((order) => { // Use the passed dataToPrint parameter
            rows.push([
                `ORD0${increment}`,
                order.orderItems.length,
                `LKR ${order.totalPrice}`,
                order.orderStatus,
            ]);

            increment++;
        });

        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 30,
        });

        doc.save('orders.pdf');
    };

    // Function to filter orders and update the state
    const filterOrders = (filterCriteria) => {
        const filteredData = adminOrders.filter((order) => {
            // Add your filtering criteria here
            // For example, if you want to filter by order status, you can use:
            return order.orderStatus === filterCriteria;
        });
        setFilteredOrders(filteredData);
    };

    useEffect(() => {
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()); }
            });
            return;
        }
        if (isOrderDeleted) {
            toast('Order Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderDeleted()),
            });
            return;
        }

        dispatch(adminOrdersAction);
    }, [dispatch, error, isOrderDeleted]);

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Order List</h1>
                <Fragment>
                    {/* Add filter controls here */}
                    <Button onClick={() => filterOrders('Processing')} className="btn btn-secondary btn-block py-2">
                        Filter by Processing
                    </Button>
                    <Button onClick={() => filterOrders('Shipped')} className="btn btn-secondary btn-block py-2">
                        Filter by Shipped
                    </Button>
                    {/* Display the filtered orders */}
                    <div id="order-table">
                        {loading ? <Loader /> :
                            <MDBDataTable
                                data={setOrders()}
                                bordered
                                striped
                                hover
                                className="px-3"
                            />
                        }
                    </div>
                </Fragment>
                <Button
                    onClick={() => generatePDF(filteredOrders)} // Pass filteredOrders to generatePDF
                    className="btn btn-secondary btn-block py-2"
                    disabled={loading}
                >
                    Generate PDF Report
                </Button>
            </div>
        </div>
    );
}
