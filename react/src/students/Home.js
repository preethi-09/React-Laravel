import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

function Home() {

    const [tableData, setTableData] = useState();
    const [view, setView] = useState();
    const {register, formState: {errors}, handleSubmit , reset}=useForm();
    const {register:editForm, formState: {errors:editError}, handleSubmit:editSubmit , reset:editReset}=useForm();
    const navigate = useNavigate();

    const getStudents = () => {
        axios.get("http://localhost:8000/api/students").then((response) => {
            setTableData(response.data.data);
        });
    }

    const searchMethod = (e)=>{
        var search = e.target.value;

        if (search !== ""){
            setTableData(tableData.filter(value=>value.first_name.toLowerCase().includes(search.toLowerCase())));
        }else if(search === ""){
            getStudents();
        }
    }

    const onSubmit =(data)=>{
        var url_data = `first_name=${data.first_name}&last_name=${data.last_name}&email=${data.email}&phone=${data.phone}`;
        axios({
            method:'post',
            url:"http://localhost:8000/api/create-student?"+url_data
        }).then((response) => {
            Swal.fire({
                text:'Added successfully',
                timer:1700,
                showConfirmButton:false,
                icon:'success'
            })
            render();
            document.getElementById('registerModel').classList.remove("show");
            document.getElementById('close_model').click(); 
      })
      .catch((error) => {
        Swal.fire({
            text:'Something went wrong',
            timer:1700,
            showConfirmButton:false,
            icon:'error'
        })
      });
    }

    const updateUser=(data)=>{
        var url_data = `first_name=${data.first_name}&last_name=${data.last_name}&email=${data.email}&phone=${data.phone}&id=${data.id}`;
        axios({
            method:'post',
            url:"http://localhost:8000/api/create-student?"+url_data
        }).then((response) => {
            Swal.fire({
                text:'updated successfully',
                timer:1700,
                showConfirmButton:false,
                icon:'success'
            })
            render();
            document.getElementById('edituser').click();

      })
      .catch((error) => {
        Swal.fire({
            text:'Something went wrong',
            timer:1700,
            showConfirmButton:false,
            icon:'error'
        })
      });
    }

    const deletStudent = (id) => {
         Swal.fire({
          title: 'Are you sure',
          text: 'You want to delete ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete("http://localhost:8000/api/student/" + id)
              .then((response) => {
                Swal.fire({
                    text:'Deleted successfully',
                    timer:1700,
                    showConfirmButton:false,
                    icon:'success'
                });
                render();
              })
              .catch((error) => {
                Swal.fire({
                    text:'Something went wrong',
                    timer:1700,
                    showConfirmButton:false,
                    icon:'error'
                })
              });
          }
        })
    
    
      };

    

    useEffect(() => {
        getStudents();
        if(localStorage.getItem('user')){

        }else{
            Swal.fire({
                text: 'Session ended',
                icon: 'info',
                toast: true,
                showConfirmButton: false,
                timer: 1700
              });
              
            navigate('/');
            }
    }, [])

    const customStyles = {
        table: {
            style: {
                width:'1100px',
            },
        },
        headCells: {
            style: {
                fontSize: '15px',
                fontWeight: '510',
                
                
                // textTransform: 'uppercase',

            },
        },
        cells: {
            style: {
                fontSize: '15px',
            },
        },
       
    };
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "50px",
        },
        {
            name: 'First Name',
            selector: row => row.first_name,
            sortable: true,
            cell:(row)=>(<div className='text-wrap text-start'>{row?.first_name}</div>)
        },
        {
            name: 'Last Name',
            selector: row => row.last_name,
            sortable: true,
            cell:(row)=>(<div className='text-wrap text-start'>{row?.last_name}</div>)
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            cell:(row)=>(<div className='text-wrap text-start'>{row?.email}</div>)
        },
        {
            name: 'Contact Number',
            selector: row => row.phone,
            sortable: true,
        },

        {
            name: "Action",
            selector: (row) => row.membership,
            right: false,
            cell: (row) => (
                <>
                    <div className="d-flex text-nowrap ">

                        {
                            <div className="form_col mx-2">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-success"
                                    onClick={() => {setView(row);editReset(row)}}
                                    data-bs-toggle="modal" data-bs-target="#edituser"
                                >
                                    Edit
                                </button>
                            </div>
                        }

                        {
                            <div className="form_col">
                                <button className='btn btn-sm btn-danger' onClick={() => { deletStudent(row.id)}}>Delete</button>

                            </div>
                        }
                    </div>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            maxWidth: '600px',
            
        }
    ];

    const render =()=>{
        getStudents();
        reset();
    }

    return (
        <div className="App container mt-4">
            <div className="d-flex justify-content-between mb-3">
                {/* Model for Add Studnet Record */}
                <button className='btn btn-sm btn-primary' data-bs-toggle="modal" data-bs-target="#registerModel">Add Student</button>
                <h4 className="font-weight-bold">Students Registration</h4>
                <Link to='/' onClick={() => { localStorage.clear() }} ><button className="btn btn-sm btn-danger">Logout</button></Link>
            </div>
            <div className='row mb-3'>
                <div className='col-lg-8'></div>
                <div className='col-lg-3'>
                    <div className='input-group'>     
                        <input className='form-control' type="text" onChange={e=>{searchMethod(e)}}/>
                        <button className='btn btn-info'>search</button>
                    </div>
                </div>
            </div>
            <DataTable
                pagination
                columns={columns}
                customStyles={customStyles}
                data={tableData} />

                
                            {/* EDIT MODAL */}
            <div className="modal fade" id="edituser" tabIndex="-1" aria-labelledby="editUserLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-zoom">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                           
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                       
                        <form  id='addForm' onSubmit={editSubmit(updateUser)}>
                        <div className="modal-body">
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className="mb-4">
                                            <label htmlFor="first-name" className="col-form-label">First Name <span className="text-danger">*</span></label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                id='first_name'                                                
                                                {...editForm("first_name", { required: true })} 
                                                aria-invalid={editError.first_name ? "true" : "false"} />
                                            {editError.first_name?.type === 'required' && <div className='text-danger'>First name is required</div>}
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="mb-4">
                                            <label htmlFor="last-name" className="col-form-label">Last Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="last-name"
                                                {...editForm("last_name", { required: true })} 
                                                aria-invalid={editError.last_name ? "true" : "false"} />
                                            {editError.last_name?.type === 'required' && <div className='text-danger'>Last name is required</div>}
                                        
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="mb-4">
                                            <label htmlFor="email-id" className="col-form-label">Email ID <span className="text-danger">*</span></label>
                                            <input
                                                type="text" 
                                                className="form-control" 
                                                id="email"
                                                {...editForm("email", { required: true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} 
                                                aria-invalid={editError.email ? "true" : "false"} />
                                            {editError.email?.type === 'pattern' && <div className='text-danger'>Enter valid mail ID</div>}
                                            {editError.email?.type === 'required' && <div className='text-danger'>Email ID is required</div>}
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="mb-4">
                                            <label htmlFor="mobile-no" className="col-form-label">Phone No <span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" id="mobile-no"
                                                {...editForm("phone", { required: true,minLength:10,maxLength:10,pattern:/^[]?\d*(?:[.,]\d*)?$/ })} 
                                                aria-invalid={editError.phone ? "true" : "false"} />
                                            {editError.phone?.type === 'pattern' && <div className='text-danger'>Enter valid Phone number</div>}
                                            {editError.phone?.type === 'minLength' && <div className='text-danger'>Enter valid Phone number</div>}
                                            {editError.phone?.type === 'maxLength' && <div className='text-danger'>Enter valid Phone number</div>}
                                            {editError.phone?.type === 'required' && <div className='text-danger'>Phone number is required</div>}
                                            
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{render()}}>Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
                                            {/* ADD MODAL */}
            <div className="modal fade" id="registerModel" tabIndex="-1" aria-labelledby="registerModelLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-zoom">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                            {/* {logMsg?.status == 'failed' ?<div className='text-danger mx-4'>{logMsg?.detail}</div>:<div className='text-success mx-4'>{logMsg?.detail}</div>} */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form  id='addForm' onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-body">
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className="mb-4">
                                            <label htmlFor="first-name" className="col-form-label">First Name <span className="text-danger">*</span></label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                id='first_name'                                                
                                                {...register("first_name", { required: true })} 
                                                aria-invalid={errors.first_name ? "true" : "false"} />
                                            {errors.first_name?.type === 'required' && <div className='text-danger'>First name is required</div>}
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="mb-4">
                                            <label htmlFor="last-name" className="col-form-label">Last Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="last-name"
                                                {...register("last_name", { required: true })} 
                                                aria-invalid={errors.last_name ? "true" : "false"} />
                                            {errors.last_name?.type === 'required' && <div className='text-danger'>Last name is required</div>}
                                        
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="mb-4">
                                            <label htmlFor="email-id" className="col-form-label">Email ID <span className="text-danger">*</span></label>
                                            <input
                                                type="text" 
                                                className="form-control" 
                                                id="email"
                                                {...register("email", { required: true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} 
                                                aria-invalid={errors.email ? "true" : "false"} />
                                            {errors.email?.type === 'pattern' && <div className='text-danger'>Enter valid mail ID</div>}
                                            {errors.email?.type === 'required' && <div className='text-danger'>Email ID is required</div>}
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="mb-4">
                                            <label htmlFor="mobile-no" className="col-form-label">Phone No <span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" id="mobile-no"
                                                {...register("phone", { required: true,minLength:10,maxLength:10,pattern:/^[]?\d*(?:[.,]\d*)?$/ })} 
                                                aria-invalid={errors.phone ? "true" : "false"} />
                                            {errors.phone?.type === 'pattern' && <div className='text-danger'>Enter valid Phone number</div>}
                                            {errors.phone?.type === 'minLength' && <div className='text-danger'>Enter valid Phone number</div>}
                                            {errors.phone?.type === 'maxLength' && <div className='text-danger'>Enter valid Phone number</div>}
                                            {errors.phone?.type === 'required' && <div className='text-danger'>Phone number is required</div>}
                                            
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button id="close_model" type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{render()}}>Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home