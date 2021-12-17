import React, {useState } from 'react';
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

const OAddContact = (params) => {
    const [discount, setDiscount] = useState()
    const centerid = params.match.params.centerid
    const [values, setValues] = useState({
        method:"",
        value:"",
        type:"",
        buttonText:"Submit"
    });
   
    

    const {
        method,
        value,
        type,
        buttonText} = values

    const handleChange = (sname) => (event) => {
        setValues({...values, [sname]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/bccontacts/create/${userid}`,
            data: {
                centerid,
                method,
                value,
                type}
        })
        .then(response =>{
            // console.log("Categories Added to database successfully", response);
            setValues({...values, buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

   

    const newBeautyContactForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">الفئة</label>
                <select onChange={handleChange('method')} value={method} type="text" className="form-control" required >
                    <option>يرجى الاختيار</option>
                    <option value='number'>رقم موبايل</option>
                    <option value='link'>رابط</option>
                    <option value='email'>ايميل</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">وصف الخدمة</label>
                <select onChange={handleChange('type')} value={type} type="textarea" className="form-control" required>
                    <option>يرجى الاختيار</option>
                    <option value='number'>رقم موبايل</option>
                    <option value='facebook'>فيس بوك</option>
                    <option value='instagram'>انستاغرام</option>
                    <option value='whatsapp'>واتس اب</option>
                    <option value='tiktok'>تيك توك</option>
                    <option value='telegram'>تلي كرام</option>
                    <option value='snapchat'>سناب جات</option>
                    <option value='email'>ايميل</option>
                    <option value='googlemaps'>خرائط كوكل</option>
                    
                </select>
            </div>

           

            <div className="form-group">
                <label className="text-muted">الرقم او الرابط</label>
                <input onChange={handleChange('value')} value={value} type="text" className="form-control" required/>
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
                {isAuth() && isAuth().bcowner == 1 ? null : <Redirect to='/'/>} 
                {/* {JSON.stringify({nameArabic,nameEnglish,logoPath})} */}
                <h1 className="p-5 text-center">اضافة طرق الاتصال بمركز التجميل</h1>
                {newBeautyContactForm()}
            </div></div>
        </Layout>
    );
}

export default OAddContact;