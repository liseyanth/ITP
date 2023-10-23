import { Fragment, useEffect,useRef } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteUser, getUsers } from "../../actions/userActions"
import { clearError, clearUserDeleted } from "../../slices/userSlice"
import Loader from '../layouts/Loader';
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import Sidebar from "./Sidebar"
import "../admin/r.css"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



export default function UserList() {
    const { users = [], loading = true, error, isUserDeleted }  = useSelector(state => state.userState)
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




    
    const setUsers = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },

                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        let increment = 1;
        users.forEach( user => {
            data.rows.push({
                id: `USER0${increment++}`,
                name: user.name,
                email : user.email,
                role: user.role ,
                actions: (
                    <Fragment>
                        <Link to={`/admin/user/${user._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, user._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if(error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isUserDeleted) {
            toast('User Deleted Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUserDeleted())
            })
            return;
        }

        dispatch(getUsers)
    },[dispatch, error, isUserDeleted])


    return (
        <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">User List</h1>
         <div className="btnreport"
         onClick={print}>
            Download Report
         </div>
        
            <Fragment  >
                {loading ? <Loader/> : 
                 <div ref={pref}>
                    <MDBDataTable
                       
                        data={setUsers()}
                        bordered
                        striped
                        hover
                        entriesOptions={[5, 10, 15, 20]}
                        noBottomColumns={true} 
                        className="px-3"
                    />
                                </div>
                }
            </Fragment>
            </div>
        </div>
    
    )
}