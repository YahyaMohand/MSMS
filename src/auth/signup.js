import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/layout';
import axios from 'axios';
import {isAuth} from './helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReactPixel from 'react-facebook-pixel';

const Signup = () =>{
    const [values, setValues] = useState({
        username: "",
        phonenumber: "",
        password:"",
        buttonText:"تسجيل حساب"
    });


    const {username, phonenumber, password, buttonText} = values

    const handleChange = (username) => (event) => {
        setValues({...values, [username]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'جاري التسجيل'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {username, phonenumber,  password}
        })
        .then(response =>{
            // console.log("SIGNUP Success", response);
            setValues({...values, username:'', phonenumber: '', password:'', buttonText: 'Submitted'});
            toast.success(response.data.message);
            ReactPixel.fbq('track', 'CompleteRegistration');
        })
        .catch(error => {
            // console.log('SINGUP ERROR', error.response.data)
            setValues({...values, buttonText: 'تسجيل حساب'});
            toast.error(error.response.data.error);
        })
    };

    const singupForm = ()=>(
        <form className='m-lg-5'>
            <div className="form-group">
                <label className="text-muted">الاسم الكامل</label>
                <input onChange={handleChange('username')} value={username} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">رقم الهاتف</label>
                <input onChange={handleChange('phonenumber')} value={phonenumber} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">الباسورد</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div>
                <button className="btn btn-primary mb-5 mt-3" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    )


    return(
        <Layout>
            <div className='container mb-lg-5 mt-lg-5'>
            <div className="col-d-6">
                {/* <ToastContainer /> */}
                {isAuth() ? <Redirect to='/'/> : null} 
                {/* {JSON.stringify({username,phonenumber,password})} */}
                <h1 className="p-5 text-center m-5">إنشاء حساب</h1>
                {singupForm()}
            </div></div>
        </Layout>
    );
};

export default Signup;