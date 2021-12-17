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

const AddCity = () => {

    const [values, setValues] = useState({
        isOperational: "",
        nameArabic: "",
        nameEnglish:"",
        shippingCost: "",
        x_cord: "",
        y_cord:"",
        buttonText:"Submit"
    });

    const {isOperational, nameArabic, nameEnglish,shippingCost, x_cord, y_cord, buttonText} = values

    const handleChange = (nameArabic) => (event) => {
        setValues({...values, [nameArabic]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/cities/create/${userid}`,
            data: {isOperational, nameArabic,  nameEnglish,shippingCost,x_cord,y_cord}
        })
        .then(response =>{
            // console.log("CITY Added to database successfully", response);
            setValues({...values, mainCategory:'', subCategory: '', classCategory:'', buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };
    //destructure user and token from localstorge
    // const {} = 


    const newCityForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Is Operational (0 => false) (1 => true)</label>
                <input onChange={handleChange('isOperational')} value={isOperational} type="number" min='0' max='1' className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Arabic Name</label>
                <input onChange={handleChange('nameArabic')} value={nameArabic} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">English Name</label>
                <input onChange={handleChange('nameEnglish')} value={nameEnglish} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping Cost (IQD)</label>
                <input onChange={handleChange('shippingCost')} value={shippingCost} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">X Cordinates (Long)</label>
                <input onChange={handleChange('x_cord')} value={x_cord} type="text" className="form-control" placeholder="43.13XXXX" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Y Cordinates (Lat)</label>
                <input onChange={handleChange('y_cord')} value={y_cord} type="text" className="form-control" placeholder="36.34XXXX" required/>
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
                {JSON.stringify({isOperational,nameArabic,nameEnglish,shippingCost,x_cord,y_cord})}
                <h1 className="p-5 text-center">Add City</h1>
                {newCityForm()}
            </div></div>
        </Layout>
    );
}

export default AddCity;