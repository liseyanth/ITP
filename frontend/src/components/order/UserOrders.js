import { Fragment, useEffect,useRef} from 'react'
import MetaData from '../layouts/MetaData';
import {MDBDataTable} from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';
import "./s.css"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function UserOrders () {
    const { userOrders = []} = useSelector(state => state.orderState)
    const dispatch = useDispatch();
    const pref=useRef(null);
    const print = () => {
   
        const container  = pref.current;
    console.log("Lalu")
          html2canvas(container).then((Value)=>
    
          {
            const Url = Value.toDataURL('Report/png');
            const doc = new jsPDF('l','mm','a4');
            const h = doc.internal.pageSize.getHeight();
            const w = doc.internal.pageSize.getWidth();
    
            const CH = Value.height;
            const CW = Value.width;
    
            doc.addImage(Url,'PNG',0,0,w,h);
            doc.save('Report.pdf')
    
          }).catch((error)=>
          {
            console.log('fetch fail'+error);
          })
    }

    useEffect(() => {
        dispatch(userOrdersAction)
    },[])

    const setOrders = () => {
        const data = {
            columns: [
               /* {
                    label: "Order ID",
                    field: 'id',
                    sort: "asc"
                },*/
                {
                    label: "Number of Items",
                    field: 'numOfItems',
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: 'amount',
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: 'actions',
                    sort: "asc"
                }
            ],
            rows:[]
        }

        userOrders.forEach(userOrder => {
            data.rows.push({
               //id:  userOrder._id,
                numOfItems: userOrder.orderItems.length,
                amount: `LKR${userOrder.totalPrice}`,
                status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered') ?
                (<p style={{color: 'green'}}> {userOrder.orderStatus} </p>):
                (<p style={{color: 'red'}}> {userOrder.orderStatus} </p>),
                actions: <Link to={`/order/${userOrder._id}`} className="btn btn-primary" >
                    <i className='fa fa-eye'></i>
                </Link>
            })
        })


        return  data;
    }


    return (
        
        <Fragment>
            <div className="btnreport"
         onClick={print}>
            Download Report
         </div>
            
            <MetaData title="My Orders" />
            <h1 className='mt-5'>My Orders</h1> 
            <div ref={pref}>
            <MDBDataTable
                className='px-3'
                bordered
                striped
                hover
                entriesOptions={[5, 10, 15, 20]}
                 noBottomColumns={true} 
                      
                data={setOrders()}
            />
            </div>
        </Fragment>
    )
}