import React, {useState, useEffect } from 'react';
import { Redirect} from 'react-router-dom';
import Layout from '../core/layout';
// import {SketchPicker} from 'react-color';
// import ImageUploader from 'react-images-upload';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../components/loadingspinner'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function UpdateUsd() {


    const [usdvalue, setusdvalue]=useState()
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [buttonText, setButtonText] = useState('Update')


    useEffect(()=>{
        // axios.get(`${url}/admin/styles/create/${userid}`)
        // .then(res => {
        //     setProducts(res.data.products)
        //     setError('')
        //     // setLoading(false)
        // })   
        // .catch(error => {
        //     // setLoading(false)
        //     setProducts({})
        //     setError('Somthing went wrong')
        // })

       
        axios.get(`${url}/admin/getusd/${userid}`)
        .then(res => {

            setusdvalue(res.data.usdtoiqd)
            
            setTimeout(()=>{setLoading(false)})
            setError('')
        })   
        .catch(error => {
            // setLoading(false)
            setError('Somthing went wrong')
            setLoading(false)
        })

    }, [])


    
  

    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/updateusd/${userid}`,
            data: {usdvalue,
                buttonText}
        })
        .then(response =>{
            // console.log("Product Added to database successfully", response);
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('Update')
            toast.error(error.response.data.error);
        })
    };

  
    const newAddStyleForm = () => (
        <form onSubmit={clickSubmit}>
            
                
                <div className='form-group'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>USD to IQD</span>
                        </div>
                        <input onChange={(event)=>{setusdvalue(event.target.value)}} value={usdvalue} type="Number" className="form-control" required /> 
                    </div>

                </div>
                
                <div>
                    <button className="btn btn-primary mb-5">
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
                {/* {JSON.stringify({name,bio,city,street,x_cord,y_cord})} */}
                {/* {JSON.stringify({productid,
                name,
                cost,
                color,
                margin,
                price,
                discountMargin,
                discount,
                discountPrice,
                images,
                quantity,
                size
                })} */}
                <h1 className="p-5 text-center">Update USD to IQD</h1>
                {error ? error : null}
                {loading ? loadingSpinner():newAddStyleForm()}
                
            </div></div>
        </Layout>
    );
    
}

export default UpdateUsd;