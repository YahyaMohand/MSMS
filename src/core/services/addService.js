import React, {useState ,useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'

const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const AddService = () => {

    const [values, setValues] = useState({
        serviceid: "",
        service_name:'',
        service_description: "",
        service_file:"",
        service_beneficiary: "",
        service_price: "",
        service_workduration:"",
        service_madeby: "",
        buttonText:"Submit"
    });

    const {
        serviceid,
        service_name,
        service_description,
        service_file,
        service_beneficiary,
        service_price,
        service_workduration,
        service_madeby,
        buttonText
    } = values

    const handleChange = (val) => (event) => {
        setValues({...values, [val]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/services/create/${userid}`,
            data: {
                serviceid,
                service_name,
                service_description,
                service_file,
                service_beneficiary,
                service_price,
                service_workduration,
                service_madeby,
                buttonText
            }
        })
        .then(response =>{
            // console.log("STORE Added to database successfully", response);
            setValues({...values, 
                serviceid: "",
                service_name:'',
                service_description: "",
                service_file:"",
                service_beneficiary: "",
                service_price: "",
                service_workduration:"",
                service_madeby: "",
                communityid:"",
            });
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };





    const newServiceForm = () => (
        <form onSubmit={clickSubmit}>


            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('service_name')} value={service_name} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('service_description')} value={service_description} type="text" className="form-control" required/>
            </div>


            <div className="form-group">
                <label className="text-muted">File</label>
                <input onChange={handleChange('service_file')} value={service_file} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Beneficiary</label>
                <input onChange={handleChange('service_beneficiary')} value={service_beneficiary} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('service_price')} value={service_price} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Work Duration</label>
                <input onChange={handleChange('service_workduration')} value={service_workduration} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Made by</label>
                <input onChange={handleChange('service_madeby')} value={service_madeby} type="text" className="form-control" required />
            </div>

            <div>
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
                <h1 className="p-5 text-center">Add Services</h1>
                {/* {pic ? pictureBorder():null} */}
                {newServiceForm()}
            </div></div>
        </Layout>
    );
}

export default AddService;