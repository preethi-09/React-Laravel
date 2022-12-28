import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [view, setView] = useState(true);
    const onSubmit = (data) => {
        let url_data = `username=${data.username}&password=${data.password}`
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/login?' + url_data
        }).then((response) => {
            if (response.data.status) {
                Swal.fire({
                    text: 'Logged in successfully',
                    icon: 'success',
                    confirmButtonColor: 'green'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/home');
                        localStorage.setItem('user', data.username);
                    }
                })
            } else {
                Swal.fire({
                    text: 'Invalid user',
                    icon: 'error',
                    confirmButtonColor: 'red'
                })
            }
        })

    }

    return (

        <div className='row mt-5'>
            <div className='col-lg-3'></div>
            <div className='col-lg-4'>
                <div><center><h3>Login Form</h3></center>
                    <form id='loginForm' onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example1">Username <sapn className="text-danger">*</sapn></label>
                            <input type="text" id="form2Example1" class="form-control"
                                {...register('username', { required: true })}
                                aria-invalid={errors.username ? "true" : "false"}
                            />
                            {errors.username?.type === 'required' && <div className='text-danger'>Username is required</div>}

                        </div>

                        <div class="form-outline mb-4">
                            <label class="form-label" for="form2Example2">Password <sapn className="text-danger">*</sapn></label>
                            <div className='input-group'>
                            <input type={view?"password":"text"} id="form2Example2" class="form-control" 
                                 {...register('password',{required:true})}
                                 aria-invalid={errors.password ? "true" : "false"} 
                                  />
                                <span className='input-group-text' onClick={()=>{setView(!view)}}><i className={view?"fa fa-eye":"fa fa-eye-slash"}></i></span>
                            </div>

                            {errors.password?.type === 'required' && <div className='text-danger'>Password is required</div>}

                        </div>

                        <center> <button type="submit" class="btn btn-primary btn-block mb-4">Login</button></center>

                        <div class="text-center">
                            <p>Not a member? <Link to='/register'>Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
