import React, {useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../layout';
// import { Spinner} from 'react-bootstrap';
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

const UpdateContract = (params) => {

    function formatedDate(x){
        const birthday = new Date(x)
        const day = birthday.getDate();
        const mon = birthday.getMonth()+1;
        const year = birthday.getFullYear();
        return (`${day}/${mon}/${year}`);
    }

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const contractid = params.match.params.contractid
    const [jobtitle,setJobtitle]=useState()
    const [contracttype,setContractype]=useState()
    const [department,setDepartment]=useState()
    const [managername,setMangername]=useState()
    const [startdate,setStartdate]=useState()
    const [enddate,setEnddate]=useState()
    const [hrid,setHrid]=useState()
    const [worktype,setWorktype]=useState()
    const [contractlink,setContactline]=useState()  
    const [buttonText, setButtonText]=useState('Update')
    const [hr, setHR] = useState({})

    useEffect(()=>{
        axios.get(`${url}/admin/contracts/${contractid}/${userid}`)
        .then(res => {
            setJobtitle(res.data.contracts.jobtitle)
            setContractype(res.data.contracts.contracttype)
            setDepartment(res.data.contracts.department)
            setMangername(res.data.contracts.managername)
            setStartdate(res.data.contracts.startdate)
            setEnddate(res.data.contracts.enddate)
            setHrid(res.data.contracts.hrid)
            setWorktype(res.data.contracts.worktype)
            setContactline(res.data.contracts.contractlink)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setJobtitle({})
            setContractype({})
            setDepartment({})
            setMangername({})
            setStartdate({})
            setEnddate({})
            setHrid({})
            setWorktype({})
            setContactline({})
            setError('Somthing went wrong')
        })

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

    
   


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/contracts/update/${contractid}/${userid}`,
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
            // console.log("BRAND Added to database successfully", response);
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('Update')
            toast.error(error.response.data.error);
        })
    };

   


    const newEmployeeForm = () => (
        <form onSubmit={clickSubmit}>
            
            <div className='form-group'>   
                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Employess</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={(event)=>{setHrid(event.target.value)}} value={hrid} type="text" className="form-control" placeholder='Brands' required>
                            <option value='0'>Select Employee</option>
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
                        <input onChange={(event)=>{setJobtitle(event.target.value)}} value={jobtitle} type="text" className="form-control" required /> 
                    </div>

                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>Contract Type</span>
                            </div>
                            <select onChange={(event)=>{setContractype(event.target.value)}} value={contracttype} type="text" className="form-control" required >
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
                        <input onChange={(event)=>{setDepartment(event.target.value)}} value={department} type="text" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Manager Name</span>
                        </div>
                        <input onChange={(event)=>{setMangername(event.target.value)}} value={managername} type="text" className="form-control" required /> 
                    </div>
                </div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>Contract Start Date {formatedDate(startdate)}</span>
                        </div>
                        <input 
                        onChange={(event)=>{setStartdate(event.target.value)}} 
                        value={formatedDate(startdate)}
                         type="date"  className="form-control"  name='startdate' />
                </div></div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Contract End Date {formatedDate(enddate)}</span>
                        </div>
                        <input onChange={(event)=>{setEnddate(event.target.value)}} value={formatedDate(enddate)} type="date" className="form-control" required /> 
                    </div>
                    
                </div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Type of Work</span>
                           
                        </div>
                        <select 
                        onChange={(event)=>{setWorktype(event.target.value)}} 
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
                        onChange={(event)=>{setContactline(event.target.value)}} 
                        value={contractlink} type="text"  className="form-control" required /> 
                    </div>
                    
                </div>
                
            <div className='mb-5 mt-5'>
                <button className="btn btn-primary">
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
                {/* {JSON.stringify({nameArabic,nameEnglish,bio,logo})} */}
                <h1 className="p-5 text-center">Update Contract Information</h1>
                {error ? error : null}
                
                {loading ? loadingSpinner():newEmployeeForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateContract;