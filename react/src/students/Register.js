import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Register() {

    
  const { register, handleSubmit, formState: { errors } , getValues } = useForm();
  const navigate = useNavigate();
  const [view,setview] = useState(true);
  const [confirmView,setconfirmView] = useState(true);

  const onSubmit = (data) =>{
    let url = `username=${data.username}&email=${data.email}&password=${data.password}&confirm=${data.confirmPassword}`
    console.log(data);

    axios({
        method:'post',
        url:'http://127.0.0.1:8000/api/register?'+url,
    }).then((response)=>{
        Swal.fire({
            text:"Registered successfully",
            timer:1700,
            showConfirmButton:false,
            icon:'success'
        })
        navigate('/');
    }).catch((error)=>{
        console.log(error);
    })


  }

  return (
    <div>
      <div className='row mt-5'>
            <div className='col-lg-3'></div>
            <div className='col-lg-4'>
                <div><center><h3>Registration Form</h3></center>
                    <form id='form' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form2Example1">Username <sapn className="text-danger">*</sapn></label>
                            <input type="text" id="form2Example1" class="form-control" 
                                {...register('username',{required:true})}
                                aria-invalid={errors.username ? "true" : "false"} 
                                 />
                                 {errors.username?.type === 'required' && <div className='text-danger'>Username is required</div>}

                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form2Example1">Email <sapn className="text-danger">*</sapn></label>
                            <input type="text" id="form2Example1" class="form-control" 
                             {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                             aria-invalid={errors.email ? "true" : "false"} />
                           {errors.email?.type === 'pattern' && <div className='text-danger'>Enter valid mail ID</div>}
                           {errors.email?.type === 'required' && <div className='text-danger'>Email ID is required</div>}
                        </div>
                        <div className="form-outline mb-4">
                        <label className="form-label" for="form2Example1">Password <sapn className="text-danger">*</sapn></label>
                        <div class="input-group mb-2">
                            <input  type={view ? "password":"text" } id="form2Example1" class="form-control"
                            {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/ })}
                            aria-invalid={errors.password ? "true" : "false"} />
                            <span class="input-group-text" onClick={()=>{setview(!view)}}><i class={view?"fa fa-eye":"fa fa-eye-slash"}></i></span>
                        </div>                         
                        {errors.password?.type === 'required' && <div className='text-danger'>Password is required</div>}
                        {errors.password?.type === 'pattern' && <div className='text-danger'>
                          password field should contain <br />- at least one uppercase and one lowercase <br />- One special characters <br />- One number and minimum eight characters</div>}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form2Example2">Confirm password <sapn className="text-danger">*</sapn></label>
                            <div className='input-group'>
                            <input  type={confirmView ? "password":"text" }  id="form2Example2" class="form-control"  
                             {...register("confirmPassword", { required: true ,validate:value => value === getValues("password")})}
                             aria-invalid={errors.confirmPassword ? "true" : "false"} />
                             <span className='input-group-text' onClick={()=>{setconfirmView(!confirmView)}}><i class={confirmView?"fa fa-eye":"fa fa-eye-slash"}></i></span>
                            </div>  
                          {errors.confirmPassword?.type === 'required' && <div className='text-danger'>Confirm password is required</div>}
                          {errors.confirmPassword?.type === 'validate' && <div className='text-danger'>Confirm password should be same</div>}
                     
                        </div>

                    <center><button type="submit" class="btn btn-primary btn-block mb-4">Register</button>
                 
                        <Link className='mx-3' to='/'><button type="button" class="btn btn-primary btn-block mb-4">Login</button>
                        </Link></center>    
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
