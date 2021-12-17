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

function AddLogistics() {
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [hr, setHR] = useState({})
    const [transactions,setTransactions]=useState({})
    const [agrimage,setAgreimage]=useState()
    const [pic, setPic]=useState(false)

    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});

    useEffect(()=>{
        axios.get(`${url}/admin/hr/${userid}`)
        .then(res => {
            setHR(res.data.hr)
            if(res.status == 200){
                axios.get(`${url}/admin/transactions/${userid}`)
        .then(res => {
            
            setTransactions(res.data.transactions)
            // console.log(res.data)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setHR({})
            setError('Somthing went wrong')
        })
            }
            // console.log(res.data)
            setError('')
            setLoading(true)
        })   
        .catch(error => {
            setLoading(false)
            setHR({})
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
            setAgreimage(filePath);
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


    const [values, setValues] = useState({
        itemname: "",
        itemdescription: "",
        serialnumber: "",
        servicestate:"",
        itembrand:"",
        hrid:"",
        deliverystatus:"",
        deliverydate:"",
        transactionid:"",
        // agrimage:"",
        buttonText:"Submit"
    });
   

    const {itemname,
    itemdescription,
    serialnumber,
    servicestate,
    itembrand,
    hrid,
    deliverystatus,
    deliverydate,
    transactionid,
    // agrimage,
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
            url: `${url}/admin/logistics/create/${userid}`,
            data: {itemname,
                itemdescription,
                serialnumber,
                servicestate,
                itembrand,
                hrid,
                deliverystatus,
                deliverydate,
                transactionid,
                agrimage,}
        })
        .then(response =>{
            // console.log("Product Added to database successfully", response);
            setValues({...values,
                itemname: "",
                itemdescription: "",
                serialnumber: "",
                servicestate:"",
                itembrand:"",
                hrid:"",
                deliverystatus:"",
                deliverydate:"",
                transactionid:"",
                // agrimage:"",
                 buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

    
    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${agrimage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

   

    const newAddContractForm = () => (
        <form onSubmit={clickSubmit}>
            
                <div className='form-group'>   
                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Delivered to</span>
                            </div>
                          
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
                            <span className='input-group-text'>Item Name</span>
                        </div>
                        <input onChange={handleChange('itemname')} value={itemname} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Item Description</span>
                        </div>
                        <input onChange={handleChange('itemdescription')} value={itemdescription} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Item Brand</span>
                        </div>
                        <input onChange={handleChange('itembrand')} value={itembrand} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Serial Number</span>
                        </div>
                        <input onChange={handleChange('serialnumber')} value={serialnumber} type="text" className="form-control" required /> 
                    </div>

                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>Service Status</span>
                            </div>
                            <select onChange={handleChange('servicestate')} value={servicestate} type="text" className="form-control" required >
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
                            <span className='input-group-text'>Delivery Date</span>
                        </div>
                        <input 
                        onChange={handleChange('deliverydate')} 
                        value={deliverydate}
                         type="date"  className="form-control"  name='deliverydate' />
                </div></div>
                
                
                
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Delivery Status</span>
                           
                        </div>
                        <select 
                        onChange={handleChange('deliverystatus')} 
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
                        onChange={handleChange('transactionid')} 
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
                <h1 className="p-5 text-center">Add Logistics Item</h1>
                {error ? error : null}
                {pic ? pictureBorder():null}
                {loading ? loadingSpinner():newAddContractForm()}
                
            </div>
            </div>
        </Layout>
    );
    
    
}

export default AddLogistics;