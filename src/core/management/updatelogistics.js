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

const UpdateLogistics = (params) => {

    function formatedDate(x){
        const birthday = new Date(x)
        const day = birthday.getDate();
        const mon = birthday.getMonth()+1;
        const year = birthday.getFullYear();
        return (`${day}/${mon}/${year}`);
    }

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const logisticsid = params.match.params.logisticsid
    const [itemname,setItemname]=useState()
    const [itemdescription,setItemsecription]=useState()
    const [serialnumber,setSerialnumber]=useState()
    const [servicestate,setServicestate]=useState()
    const [itembrand,setItembrand]=useState()
    const [hrid,setHrid]=useState()
    const [deliverystatus,setDeliverstatus]=useState()
    const [deliverydate,setDeliverydate]=useState()
    const [transactionid,setTransacctionid]=useState()
    const [agrimage,setAgrimage]=useState()
    
                
   
    const [pic, setPic]=useState(false)

    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});
    const [buttonText, setButtonText]=useState('Update')
    const [hr, setHR] = useState({})
    const [transactions,setTransactions]=useState()

    useEffect(()=>{
        axios.get(`${url}/admin/logistics/${logisticsid}/${userid}`)
        .then(res => {
            // console.log(res.data)
            setItemname(res.data.logistics.itemname)
            setItemsecription(res.data.logistics.itemdescription)
            setItembrand(res.data.logistics.itembrand)
            setSerialnumber(res.data.logistics.serialnumber)
            setServicestate(res.data.logistics.servicestate)
            setDeliverstatus(res.data.logistics.deliverystatus)
            setDeliverydate(res.data.logistics.deliverydate)
            setTransacctionid(res.data.logistics.transactionid)
            setAgrimage(res.data.logistics.agrimage)
            setHrid(res.data.logistics.hrid)
            setPic(true)
            setError('')
            // setTimeout(()=>{setLoading(false)})
            // console.log(res.status)
            if(res.status == 200){
                axios.get(`${url}/admin/hr/${userid}`)
                .then(res => {
                    setHR(res.data.hr)
                    if(res.status == 200){
                        axios.get(`${url}/admin/transactions/${userid}`)
                .then(res => {
                    
                    setTransactions(res.data.transactions)
                    // console.log(res.data)
                    setError('')
                    if(res.status == 200){
                        setLoading(false)
                    }
                    
                })   
                .catch(error => {
                    // setLoading(false)
                    setHR({})
                    setError('Somthing went wrong')
                })
                    }
                    // console.log(res.data)
                    setError('')
                    // setLoading(true)
                })   
                .catch(error => {
                    // setLoading(false)
                    setHR({})
                    setError('Somthing went wrong')
                })

        
        
            }
        })   
        .catch(error => {
            // setLoading(false)
            setItemname({})
            setItemsecription({})
            setItembrand({})
            setSerialnumber({})
            setServicestate({})
            setDeliverstatus({})
            setDeliverydate({})
            setTransacctionid({})
            setAgrimage({})
            setHrid({})
            setError('Somthing went wrong')
        })

       
    }, [])

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    const onSubmitFile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const res = await axios.post(`${url}/admin/logistics/upload/${userid}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            


            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            setAgrimage(filePath);
            toast.success('Image uploaded to the server')
            setPic(true)
        } catch(err){
            if(err.response.status === 500){
                toast.error('There is a problem with the server');
            }else{
                toast.error(err.response.data.message);
            }
        }
    }

    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${agrimage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )
   


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/logistics/update/${logisticsid}/${userid}`,
            data: {
                itemname,
                itemdescription,
                serialnumber,
                servicestate,
                itembrand,
                hrid,
                deliverystatus,
                deliverydate,
                transactionid,
                agrimage,
            }
        })
        .then(response =>{
         
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
        
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
                                <span className='input-group-text badge-dark'>Delivered to</span>
                            </div>
                          
                            <select onChange={(event)=>{setHrid(event.target.value)}} value={hrid} type="text" className="form-control" placeholder='Brands' required>
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
                            <span className='input-group-text'>Item Name</span>
                        </div>
                        <input onChange={(event)=>{setItemname(event.target.value)}} value={itemname} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Item Description</span>
                        </div>
                        <input onChange={(event)=>{setItemsecription(event.target.value)}} value={itemdescription} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Item Brand</span>
                        </div>
                        <input onChange={(event)=>{setItembrand(event.target.value)}} value={itembrand} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Serial Number</span>
                        </div>
                        <input onChange={(event)=>{setSerialnumber(event.target.value)}} value={serialnumber} type="text" className="form-control" required /> 
                    </div>

                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>Service Status</span>
                            </div>
                            <select onChange={(event)=>{setServicestate(event.target.value)}} value={servicestate} type="text" className="form-control" required >
                                <option>Select One</option>
                                <option value="in service">In-Service</option>
                                <option value="out of service">Out-of-Service</option>
                                </select> 
                        </div>
                       
                    </div>
                    </div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>Delivery Date {formatedDate(deliverydate)}</span>
                        </div>
                        <input 
                        onChange={(event)=>{setDeliverydate(event.target.value)}} 
                        value={deliverydate}
                         type="date"  className="form-control"  name='deliverydate' />
                </div></div>
                
                
                
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Delivery Status</span>
                           
                        </div>
                        <select 
                        onChange={(event)=>{setDeliverstatus(event.target.value)}} 
                        value={deliverystatus} type="text"  className="form-control" required >
                            <option >Select One</option>
                            <option value="new">New</option>
                            <option value="used clean">Used clean</option>
                            <option value="used old">Used old</option>
                        </select>
                    </div>
                    
                </div>

                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Transction Information</span>
                           
                        </div>
                        <select 
                        onChange={(event)=>{setTransacctionid(event.target.value)}} 
                        value={transactionid} type="text"  className="form-control" required >
                            <option>Select Transaction</option>
                            {transactions.map(({transactionid, description})=><option value={transactionid}> {description}</option>)}
                        </select>
                    </div>
                    
                </div>
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Agreement Image</span>
                    </div>
                    <div className='custom-file'>
                        <input 
                        onChange={onUpload} 
                        // value={filename} 
                        type="file" className="custom-file-input" name='file'  id='fileupload'  />
                        <label className='custom-file-label'>{filename}</label>
                    </div>
                    <div class="input-group-append">
                        <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
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
                {pic ? pictureBorder():null}
                {loading ? loadingSpinner():newEmployeeForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateLogistics;