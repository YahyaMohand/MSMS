import React from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import Layout from '../layout';
import { Alert} from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'

const url = 'http://localhost:8000'

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'

const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const DeleteBrand = (params) =>{
    const brandid = params.match.params.brandid
    const history = useHistory()


    const clickSubmit = () => {
        // event.preventDefault()
        // console.log('axios invoked')
        axios({
            method: 'DELETE',
            url: `${url}/admin/brands/delete/${brandid}/${userid}`,
        })
        .then(response =>{
            toast.success(response.data.message);
        })
        .catch(error => {
            toast.error(error.response.data.error);
        })
    };

    const deleteAlert = ()=>(
          //delete alert start
        <div>
        <Alert  variant='danger' className='alert-danger text-center  align-items-center align-content-center justify-content-center'>
        <Alert.Heading>
            <p>Hey, you are going to delete item, Are you sure?</p>
        </Alert.Heading>
        <p>
            ستقوم بحذف معلومات من قاعدة البيانات ولايمكن الرجوع عن هذه الخطوة, هل انت واثق من عملية الحذف
        </p>
        <p>
            اذا كان هناك منتج مرتبط بهذه الفئة فلا تستطيع حذف هذه الفئة
        </p>
        <hr></hr>
        <div className='row align-items-center align-content-center justify-content-center'>
                <button onClick={()=>{ 
                    clickSubmit()
                    history.goBack()
                }} className='col-1 btn btn-danger m-1'>
                        Delete
                    </button>
                    <Link to={{
                        pathname: `/admin/brands`
                        }} className='col-10 btn btn-light m-1'>
                        Cancel
                    </Link>
                </div>
        </Alert>
        </div>
  //delete alret end
    )

    return(
        <Layout>
            <div className="col-d-6">
            <ToastContainer />
                {isAuth() ? null : <Redirect to='/'/>}
                <h1 className='text-center m-lg-5'>Delete Item</h1> 
                {deleteAlert()}
                </div>
        </Layout>
    )
}

export default DeleteBrand


