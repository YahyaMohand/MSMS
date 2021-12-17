import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/layout';
import axios from 'axios';
import {authenticate, isAuth} from './helpers';
import {ToastContainer, toast} from 'react-toastify';
import Google from './google';
import Facebook from './facebook';
import 'react-toastify/dist/ReactToastify.min.css';
import ReactPixel from 'react-facebook-pixel';

const Signin = ({history}) =>{
    const [values, setValues] = useState({
        user_email: "",
        user_password:"",
        buttonText:"تسجيل الدخول"
    });


    const {user_email, user_password, buttonText} = values

    const handleChange = (user_email) => (event) => {
        setValues({...values, [user_email]: event.target.value});
    }

    const informParent =response =>{
        authenticate(response, ()=>{
            // toast.success(`Hey ${response.data.user.username}, Welcome back!`);
            isAuth() && isAuth().role >=1 ? history.push('/admin') : history.push('/private'); 
        });

    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'جاري التسجيل'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {user_email,  user_password}
        })
        .then(response =>{
            // console.log("SIGNIN Success", response);

            //save the response (user, token) localstorage/cookie
            authenticate(response, ()=>{
                setValues({...values, user_password: '', user_email:'', buttonText: 'Submitted'});
                // toast.success(`Hey ${response.data.user.username}, Welcome back!`);
                isAuth() && isAuth().role >=1 ? history.push('/admin') : isAuth() && isAuth().bcowner == 1? history.push('/bcowner') :history.push('/private'); 
            });

        })
        .catch(error => {
            // console.log('SINGIN ERROR', error.response.data)
            setValues({...values, buttonText: 'تسجيل الدخول'});
            toast.error(error.response.data.error);
        })
    };

    const signinForm = ()=>(
        <form className='m-lg-5'>

            <div className="form-group m-2">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('user_email')} value={user_email} type="text" className="form-control" />
            </div>

            <div className="form-group m-2">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('user_password')} value={user_password} type="password" className="form-control" />
            </div>

            <div className='m-2 mt-4 btn-block mb-5'>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    )


    return(
        <Layout>
        {/* {JSON.stringify(isAuth())} */}
        <div className='container mb-lg-5 mt-lg-5'>
            <div className="col-d-6">
              
                {/* if the user is loged in it will convert it to home page */}
                {/* {isAuth() ? <Redirect to='/'/> : null}  */}

                <h1 className="p-5 text-center m-5">Welcome to MSMS</h1>
               
                {signinForm()}
            </div></div>
        </Layout>
    );
};

export default Signin;