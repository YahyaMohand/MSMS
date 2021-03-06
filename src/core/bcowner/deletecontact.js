import React, {useState, useEffect } from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import Layout from '../layout';
import { Button, Alert,Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'


const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const ODeleteBCContacts = (params) =>{
    const contactid = params.match.params.contactid
    // const history = useHistory()


    const clickSubmit = () => {
        // event.preventDefault()
        // console.log('axios invoked')
        axios({
            method: 'DELETE',
            url: `${url}/bccontacts/delete/${contactid}/${userid}`,
        })
        .then(response =>{
            toast.success(response.data.message);
            window.history.back()
        })
        .catch(error => {
            toast.error(error.response.data.error);
        })
    };

    const deleteAlert = ()=>(
          //delete alert start
        <div>
        <div  variant='danger' className=' text-center  align-items-center align-content-center justify-content-center'>
        <div>
            <p>Hey, you are going to delete item, Are you sure?</p>
        </div>
        <p>
            ستقوم بحذف معلومات من قاعدة البيانات ولايمكن الرجوع عن هذه الخطوة, هل انت واثق من عملية الحذف
        </p>
        {/* <p>
            اذا كان هناك منتج مرتبط بهذه الفئة فلا تستطيع حذف هذه الفئة
        </p> */}
        <hr></hr>
        <div className='row align-items-center align-content-center justify-content-center'>
                <button onClick={()=>{
                    clickSubmit()
                }} className='col-1 btn btn-danger m-1'>
                        حذف
                    </button>
                    <Link to={{pathname: '/'}}  className='col-10 btn btn-light m-1'>
                        الغاء
                    </Link>
                </div>
        </div>
        </div>
  //delete alret end
    )

    return(
        <Layout>
            <div className='container'>
            <div className="col-d-6">
            {/* <ToastContainer /> */}
                {isAuth() && isAuth().bcowner == 1? null : <Redirect to='/'/>}
                <h1 className='text-center m-lg-5'>حذف معلومات الاتصال</h1> 
                {deleteAlert()}
                </div></div>
        </Layout>
    )
}

export default ODeleteBCContacts


