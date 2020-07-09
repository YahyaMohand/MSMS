import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/layout';
import axios from 'axios';
import {authenticate, isAuth} from './helpers';
import {ToastContainer, toast} from 'react-toastify';
import Google from './google';
import Facebook from './facebook';
import 'react-toastify/dist/ReactToastify.min.css';


const Signin = ({history}) =>{
    const [values, setValues] = useState({
        phonenumber: "",
        password:"",
        buttonText:"تسجيل الدخول"
    });


    const {phonenumber, password, buttonText} = values

    const handleChange = (username) => (event) => {
        setValues({...values, [username]: event.target.value});
    }

    const informParent =response =>{
        authenticate(response, ()=>{
            // toast.success(`Hey ${response.data.user.username}, Welcome back!`);
            isAuth() && isAuth().role ===1 ? history.push('/admin') : history.push('/private'); 
        });

    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'جاري التسجيل'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {phonenumber,  password}
        })
        .then(response =>{
            // console.log("SIGNIN Success", response);

            //save the response (user, token) localstorage/cookie
            authenticate(response, ()=>{
                setValues({...values, username:'', phonenumber: '', password:'', buttonText: 'Submitted'});
                // toast.success(`Hey ${response.data.user.username}, Welcome back!`);
                isAuth() && isAuth().role ===1 ? history.push('/admin') : history.push('/private'); 
            });

            
        })
        .catch(error => {
            // console.log('SINGIN ERROR', error.response.data)
            setValues({...values, buttonText: 'تسجيل الدخول'});
            toast.error(error.response.data.error);
        })
    };

    const signinForm = ()=>(
        <form>

            <div className="form-group">
                <label className="text-muted">رقم الهاتف</label>
                <input onChange={handleChange('phonenumber')} value={phonenumber} type="text" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">الباسورد</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>

            <div>
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
                <ToastContainer />
                {/* if the user is loged in it will convert it to home page */}
                {isAuth() ? <Redirect to='/'/> : null} 
                {/* {JSON.stringify({phonenumber,password})} */}
                <h1 className="p-5 text-center">تسجيل الدخول</h1>
                <Google informParent={informParent}/>
                <Facebook informParent={informParent}/>
                {signinForm()}
            </div></div>
        </Layout>
    );
};

export default Signin;