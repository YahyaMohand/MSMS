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

const AddMember = () => {

    const [values, setValues] = useState({
        mem_duration: "",
        mem_description : "",
        mem_teamname : "", 
        mem_price : "" ,
        mem_durationtype : "",
        mem_type : "",
        mem_enddate : "",
        mem_startdate : "",
        buttonText : "Submit"
    });


    const {mem_duration,
        mem_description,
        mem_teamname, 
        mem_price,
        mem_durationtype,
        mem_type,
        mem_enddate,
        mem_startdate,
        buttonText} = values

    const handleChange = (nameArabic) => (event) => {
        setValues({...values, [nameArabic]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/memberships/create/${userid}`,
            data:{mem_duration,
                mem_description,
                mem_teamname, 
                mem_price,
                mem_durationtype,
                mem_type,
                mem_enddate,
                mem_startdate,
                 buttonText}
        })
        .then(response =>{
            // console.log("BRAND Added to database successfully", response);
            setValues({...values, mem_duration:'', mem_description: '', 
            mem_teamname:'', mem_price:'',
            mem_durationtype: '', mem_type: '' , mem_enddate:'' ,
            mem_startdate: ''});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };




    const newMemberForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('mem_teamname')} value={mem_teamname} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Duration</label>
                <input onChange={handleChange('mem_duration')} value={mem_duration} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Duration Type</label>
                <select onChange={handleChange('mem_durationtype')} value={mem_durationtype} type="text" className="form-control" required >
                    <option>Select one</option>
                    <option >Hours</option>
                    <option>Days</option>
                    <option >Month</option>
                    <option >Year</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Type</label>
                <select onChange={handleChange('mem_type')} value={mem_type} type="text" className="form-control" required >
                    <option>Select one</option>
                    <option >Co-Working area</option>
                    <option >Maker Space</option>
                    <option>Training Room</option>
                    <option>Meeting Room</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('mem_description')} value={mem_description} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('mem_price')} value={mem_price} type="text" className="form-control" required/>
            </div>
          
            <div className="form-group">
                <label className="text-muted">Start date</label>
                <input onChange={handleChange('mem_startdate')} value={mem_startdate} type="date" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">End date</label>
                <input onChange={handleChange('mem_enddate')} value={mem_enddate} type="date" className="form-control" required/>
            </div>
          
            

            {/* <div className='input-group mb-3'>
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
                </div> */}
                {/* <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-danger'>Expiry Date</span>
                            </div>
                            <input onChange={handleChange('expiryDate')} value={expiryDate} type="date" className="form-control"  />
                            
                        </div> */}

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
                {/* {JSON.stringify({nameArabic,nameEnglish,bio,logo})} */}
                <h1 className="p-5 text-center">Add Membership</h1>
                {/* {pic ? pictureBorder():null} */}
                {newMemberForm()}
            </div></div>
        </Layout>
    );
}

export default AddMember;