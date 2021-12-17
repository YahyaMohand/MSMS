import React, {useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const AddHr = () => {

    const [values, setValues] = useState({
        first:"",
        second: "",
        last: "",
        family:"",
        nationalid:"",
        email:"",
        mobile:"",
        nationality:"",
        address:"",
        city:"",
        country:"",
        emplymentstatus:"",
        maritalstatus:"",
        numofchildren:"",
        euserid:"",
        idimage:"",
        position:"",
        buttonText:"Submit"
    });
    const [pic, setPic]=useState(false)
    const [idimage, setIDImage ] = useState()
    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    const onSubmitFile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const res = await axios.post(`${url}/admin/hr/upload/${userid}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            


            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            setIDImage(filePath);
            toast.success('Image uploaded to the server')
            setPic(true)
        } catch(err){
            if(err.response.status === 500){
                toast.error('There is a problem with the server');
            }else{
                toast.error(err.response.data.massage);
            }
        }
    }

    const {first,
    second,
    last,
    family,
    nationalid,
    email,
    mobile,
    nationality,
    address,
    city,
    euserid,
    country,
    emplymentstatus,
    maritalstatus,
    position,
    numofchildren,buttonText} = values

    const handleChange = (first) => (event) => {
        setValues({...values, [first]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/hr/create/${userid}`,
            data: {first,
                second,
                last,
                family,
                nationalid,
                email,
                mobile,
                nationality,
                address,
                city,
                country,
                idimage,
                euserid,
                emplymentstatus,
                maritalstatus,
                position,
                numofchildren}
        })
        .then(response =>{
            // console.log("BRAND Added to database successfully", response);
            setValues({...values, first:"",
            second: "",
            last: "",
            family:"",
            nationalid:"",
            email:"",
            mobile:"",
            nationality:"",
            address:"",
            city:"",
            country:"",
            emplymentstatus:"",
            maritalstatus:"",
            numofchildren:"",
            euserid:"",
            idimage:"",
            position:"",
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
            <img src={`${url}/${idimage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newHRForm = () => (
        <form onSubmit={clickSubmit}>
            <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>First Name</span>
                        </div>
                        <input onChange={handleChange('first')} value={first} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Second Name</span>
                        </div>
                        <input onChange={handleChange('second')} value={second} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Last Name</span>
                        </div>
                        <input onChange={handleChange('last')} value={last} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Family Name</span>
                        </div>
                        <input onChange={handleChange('family')} value={family} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Employee Position</span>
                        </div>
                        <input onChange={handleChange('position')} value={position} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>National ID</span>
                        </div>
                        <input onChange={handleChange('nationalid')} value={nationalid} type="text" className="form-control" required /> 
                    </div>

            
                <div className='form-group'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>E-mail</span>
                        </div>
                        <input onChange={handleChange('email')} value={email} type="email" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Phone Number</span>
                        </div>
                        <input onChange={handleChange('mobile')} value={mobile} type="phone_number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Nationality</span>
                        </div>
                        <input onChange={handleChange('nationality')} value={nationality} type="text" className="form-control" placeholder="iraqi" required/> 
                    </div>
                </div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>address</span>
                        </div>
                        <input 
                        onChange={handleChange('address')} 
                        value={address}
                         type="textarea"  className="form-control"  name='address' required/>
                </div></div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>City</span>
                        </div>
                        <input onChange={handleChange('city')} value={city} type="text" className="form-control"  required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Country</span>
                        </div>
                        <input 
                        onChange={handleChange('country')} 
                        // onKeyUpCapture={()=>setPrice(parseInt(cost/(1-margin)))}
                        value={country} type="text" className="form-control" required placeholder="iraq" /> 
                    </div>
                    
                </div>
                {/* <label>Label</label> */}
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Marial Status</span>
                            {/* <span className='input-group-text'>IQD</span> */}
                        </div>
                        <select onChange={handleChange('maritalstatus')} value={maritalstatus} type="text" className="form-control" required>
                            <option value="null">Select one</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="engaged">Engaged</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                            <option value="separated">Separated</option>
                            </select>
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Employment Status</span>
                        </div>
                        <select onChange={handleChange('emplymentstatus')} value={emplymentstatus} type="text" className="form-control" required>
                            <option value="null">Select one</option>
                            <option value="staff">Staff</option>
                            <option value="left">Left</option>
                           
                            </select>
                       
                    </div>
                    </div>
                    <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend '>
                            <span className='input-group-text badge-secondary'>Number of Cildren</span>
                        </div>
                        <input 
                        onChange={handleChange('numofchildren')} 
                        
                        value={numofchildren} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Employee User ID</span>
                        </div>
                        <input 
                        onChange={handleChange('euserid')} value={euserid} type="number" className="form-control" required /> 
                    </div>
                </div>

            <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Select Square Image</span>
                    </div>
                    <div className='custom-file'>
                        <input 
                        onChange={onUpload} 
                        // value={filename} 
                        type="file" className="custom-file-input" name='file'  id='fileupload' required />
                        <label className='custom-file-label'>{filename}</label>
                    </div>
                    <div class="input-group-append">
                        <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
                    </div>
                </div>

            <div className='mb-lg-5 mt-5'>
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
                {/* {JSON.stringify({first,
                second,
                last,
                family,
                nationalid,
                email,
                mobile,
                nationality,
                address,
                city,
                country,
                idimage,
                euserid,
                emplymentstatus,
                maritalstatus,
                numofchildren})} */}
                <h1 className="p-5 text-center">Add Employee to Kwaysi Team</h1>
                {pic ? pictureBorder():null}
                {newHRForm()}
            </div></div>
        </Layout>
    );
}

export default AddHr;