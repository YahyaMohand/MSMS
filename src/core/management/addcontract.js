import React, {useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import {SketchPicker} from 'react-color';
// import ImageUploader from 'react-images-upload';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function AddContract() {
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [hr, setHR] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/hr/${userid}`)
        .then(res => {
            
            setHR(res.data.hr)
            // console.log(res.data)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setHR({})
            setError('Somthing went wrong')
        })
    }, [])


    const [values, setValues] = useState({
        jobtitle:"",
        contracttype:"",
        department:"",
        managername:"",
        startdate:"",
        enddate:"",
        hrid:"",
        worktype:"",
        contractlink:"",
        buttonText:"Submit"
    });
   

    const {jobtitle,
    contracttype,
    department,
    managername,
    startdate,
    enddate,
    hrid,
    worktype,
    contractlink,
    buttonText} = values

    const handleChange = (jobtitle) => (event) => {
        setValues({...values, [jobtitle]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/contracts/create/${userid}`,
            data: {jobtitle,
                contracttype,
                department,
                managername,
                startdate,
                enddate,
                hrid,
                worktype,
                contractlink,}
        })
        .then(response =>{
            // console.log("Product Added to database successfully", response);
            setValues({...values,
                jobtitle:"",
                contracttype:"",
                department:"",
                managername:"",
                startdate:"",
                enddate:"",
                hrid:"",
                worktype:"",
                contractlink:"",
                 buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

    


   

    const newAddContractForm = () => (
        <form onSubmit={clickSubmit}>
            
                <div className='form-group'>   
                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Employess</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={handleChange('hrid')} value={hrid} type="text" className="form-control" placeholder='Brands' required>
                            <option >Select Employee</option>
                            {hr.map(({hrid, position})=><option value={hrid}> {position}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div className='border-bottom border-maroon m-0'></div>
                </div>
                <div className='form-group'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Job Title</span>
                        </div>
                        <input onChange={handleChange('jobtitle')} value={jobtitle} type="text" className="form-control" required /> 
                    </div>

                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>Contract Type</span>
                            </div>
                            <select onChange={handleChange('contracttype')} value={contracttype} type="text" className="form-control" required >
                                <option>Select Contract</option>
                                <option value="Employment">Employment</option>
                                <option value="Service">Service</option>
                                <option value="Partnership">Partnership</option>
                                <option value="Nondisclosure ">Nondisclosure </option>
                                </select> 
                        </div>
                       
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Department</span>
                        </div>
                        <input onChange={handleChange('department')} value={department} type="text" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Manager Name</span>
                        </div>
                        <input onChange={handleChange('managername')} value={managername} type="text" className="form-control" required /> 
                    </div>
                </div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>Contract Start Date</span>
                        </div>
                        <input 
                        onChange={handleChange('startdate')} 
                        value={startdate}
                         type="date"  className="form-control"  name='startdate' />
                </div></div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Contract End Date</span>
                        </div>
                        <input onChange={handleChange('enddate')} value={enddate} type="date" className="form-control" required /> 
                    </div>
                    
                </div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Type of Work</span>
                           
                        </div>
                        <select 
                        onChange={handleChange('worktype')} 
                        value={worktype} type="text"  className="form-control" required >
                            <option >Select One</option>
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="self-employed">Self-Employed</option>
                            <option value="freelance">Freelance</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                            <option value="apprenticeship">Apprenticeship</option>
                            <option value="seasonal">Seasonal</option>

                        </select>
                    </div>
                    
                </div>

                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Link of Contract file</span>
                           
                        </div>
                        <input 
                        onChange={handleChange('contractlink')} 
                        value={contractlink} type="text"  className="form-control" required /> 
                    </div>
                    
                </div>
                
                
                

                <div>
                    <button className="btn btn-primary mb-5">
                        {buttonText}
                    </button>
                </div>
            </form>
    );


    return(
        <Layout>
            <div className='container'>
            <div className="col-d-6">
            {/* <ToastContainer /> */}
                {isAuth() ? null : <Redirect to='/'/>} 
                {/* {JSON.stringify({name,bio,city,street,x_cord,y_cord})} */}
                {/* {JSON.stringify({productid,
                name,
                cost,
                color,
                margin,
                price,
                discountMargin,
                discount,
                discountPrice,
                images,
                quantity,
                size
                })} */}
                <h1 className="p-5 text-center">Add Contract</h1>
                
                {error ? error : null}
                {loading ? loadingSpinner():newAddContractForm()}
                
            </div>
            </div>
        </Layout>
    );
    
    
}

export default AddContract;