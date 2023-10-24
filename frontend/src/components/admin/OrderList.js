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
import html2canvas from 'html2canvas';

export default function OrderList() {
    const { adminOrders = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderState);
    const dispatch = useDispatch();

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
      
        adminOrders.forEach((order) => {
            data.rows.push({
                id: `ORD0${increment++}`,
                noOfItems: order.orderItems.length,
                amount: `LKR ${order.totalPrice}`, // Change the currency symbol to LKR
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

    const generatePDF = () => {
        const input = document.getElementById('order-table');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('orders.pdf');
        });
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
                    <div id="order-table">
                        {loading ? <Loader /> :
                            <MDBDataTable
                                data={setOrders()}
                                bordered
                                striped
                                hover
                                entriesOptions={[5, 10, 15, 20]}
                                noBottomColumns={true} 

                                className="px-3"
                            />
                        }
                    </div>
                </Fragment>
                <Button
                    onClick={generatePDF}
                    className="btn btn-secondary btn-block py-2"
                    disabled={loading}
                >
                    Generate PDF Report
                </Button>
            </div>
        </div>
    );
}