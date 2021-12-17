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

const UpdateHR = (params) => {

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const hrid = params.match.params.hrid
    const [first,setFirst]=useState()
    const [middle, setMiddle]=useState()
    const [last, setLast]=useState()
    const [family,setFamily]=useState()
    const [nationalid, setNationalid]=useState()
    const [email, setEmail]=useState()
    const [mobile, setMobile]=useState()
    const [nationality, setNationality]=useState()
    const [address, setAddress]=useState()
    const [city, setCity]=useState()
    const [country,setCountry]=useState()
    const [euserid,setEuserid]=useState()
    const [emplymentstatus,setemplymentstatus]=useState()
    const [maritalstatus,setmaritalstatus]=useState()
    const [position,setposition]=useState()
    const [numofchildren,setnumofchildren]=useState()           
    const [buttonText, setButtonText]=useState('Update')
    const [idimage, setidimage ] = useState()

    useEffect(()=>{
        axios.get(`${url}/admin/hr/${hrid}/${userid}`)
        .then(res => {
            setFirst(res.data.hr.first)
            setMiddle(res.data.hr.middle)
            setLast(res.data.hr.last)
            setFamily(res.data.hr.family)
            setNationalid(res.data.hr.nationalid)
            setEmail(res.data.hr.email)
            setMobile(res.data.hr.mobile)
            setNationality(res.data.hr.nationality)
            setAddress(res.data.hr.address)
            setCity(res.data.hr.city)
            setCountry(res.data.hr.country)
            setEuserid(res.data.hr.userid)
            setemplymentstatus(res.data.hr.emplymentstatus)
            setmaritalstatus(res.data.hr.maritalstatus)
            setposition(res.data.hr.position)
            setnumofchildren(res.data.hr.numofchildren)
            setidimage(res.data.hr.idimage)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setFirst({})
            setMiddle({})
            setLast({})
            setFamily({})
            setNationalid({})
            setEmail({})
            setMobile({})
            setNationality({})
            setAddress({})
            setCity({})
            setCountry({})
            setEuserid({})
            setemplymentstatus({})
            setmaritalstatus({})
            setposition({})
            setnumofchildren({})
            setidimage({})
            setError('Somthing went wrong')
        })
    }, [])

    
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
            setidimage(filePath);
            toast.success('Image uploaded to the server')
        } catch(err){
            if(err.response.status === 500){
                toast.error('There is a problem with the server');
            }else{
                toast.error(err.response.data.message);
            }
        }
    }


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/hr/update/${hrid}/${userid}`,
            data: {first,
                middle,
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
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('Update')
            toast.error(error.response.data.error);
        })
    };

    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${idimage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )


    const newEmployeeForm = () => (
        <form onSubmit={clickSubmit}>
            
            {/*  */}
            <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>First Name</span>
                        </div>
                        <input onChange={(event)=>{setFirst(event.target.value)}} value={first} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Second Name</span>
                        </div>
                        <input onChange={(event)=>{setMiddle(event.target.value)}} value={middle} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Last Name</span>
                        </div>
                        <input onChange={(event)=>{setLast(event.target.value)}} value={last} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Family Name</span>
                        </div>
                        <input onChange={(event)=>{setFamily(event.target.value)}} value={family} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Employee Position</span>
                        </div>
                        <input onChange={(event)=>{setposition(event.target.value)}} value={position} type="text" className="form-control" required /> 
                    </div>

                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>National ID</span>
                        </div>
                        <input onChange={(event)=>{setNationalid(event.target.value)}} value={nationalid} type="text" className="form-control" required /> 
                    </div>


            
                <div className='form-group'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>E-mail</span>
                        </div>
                        <input onChange={(event)=>{setEmail(event.target.value)}} value={email} type="email" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Phone Number</span>
                        </div>
                        <input onChange={(event)=>{setMobile(event.target.value)}} value={mobile} type="phone_number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Nationality</span>
                        </div>
                        <input onChange={(event)=>{setNationality(event.target.value)}} value={nationality} type="text" className="form-control" placeholder="iraqi" required/> 
                    </div>
                </div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>address</span>
                        </div>
                        <input 
                        onChange={(event)=>{setAddress(event.target.value)}} 
                        value={address}
                         type="textarea"  className="form-control"  name='address' required/>
                </div></div>
                
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>City</span>
                        </div>
                        <input onChange={(event)=>{setCity(event.target.value)}} value={city} type="text" className="form-control"  required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Country</span>
                        </div>
                        <input 
                        onChange={(event)=>{setCountry(event.target.value)}} 
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
                        <select onChange={(event)=>{setmaritalstatus(event.target.value)}} value={maritalstatus} type="text" className="form-control" required>
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
                        <select onChange={(event)=>{setemplymentstatus(event.target.value)}} value={emplymentstatus} type="text" className="form-control" required>
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
                        onChange={(event)=>{setnumofchildren(event.target.value)}} 
                        
                        value={numofchildren} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Employee User ID</span>
                        </div>
                        <input 
                        onChange={(event)=>{setEuserid(event.target.value)}} value={euserid} type="number" className="form-control" required /> 
                    </div>
                </div>
            {/*  */}

            <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Select Square Image</span>
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
                <h1 className="p-5 text-center">Update Employee Information</h1>
                {error ? error : null}
                {loading ? loadingSpinner():pictureBorder()}
                {loading ? loadingSpinner():newEmployeeForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateHR;