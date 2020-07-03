import React, {useState ,useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'

const url = 'https://www.kwaysidata.com'


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const AddStore = () => {

     //get method functions
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState('')
     const [cities, setCities] = useState({})
 
 
     useEffect(()=>{
         axios.get(`${url}/admin/stores/create/${userid}`)
         .then(res => {
             
             setCities(res.data.cities)
             setError('')
             setLoading(false)
         })   
         .catch(error => {
             setLoading(false)
             setCities({})
             setError('Somthing went wrong')
         })
     }, [])

    const [values, setValues] = useState({
        nameArabic: "",
        nameEnglish:'',
        bio: "",
        cityid:"",
        street: "",
        x_cord: "",
        y_cord:"",
        buttonText:"Submit"
    });

    const {nameArabic,nameEnglish, bio, cityid,street, x_cord, y_cord, buttonText} = values

    const handleChange = (nameArabic) => (event) => {
        setValues({...values, [nameArabic]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/stores/create/${userid}`,
            data: {nameArabic,nameEnglish, bio,  cityid, street, x_cord, y_cord}
        })
        .then(response =>{
            console.log("STORE Added to database successfully", response);
            setValues({...values, nameArabic:'',nameEnglish:"", bio: '', cityid:'',street:'', x_cord: '', y_cord:'', buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };


    const newStoreForm = () => (
        <form onSubmit={clickSubmit}>

                <div className='form-group'>   
                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>City</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={handleChange('cityid')} value={cityid} type="text" className="form-control" placeholder='Brands' required>
                            <option>Select one</option>
                            {cities.map(({cityid, nameEnglish})=><option value={cityid}>{nameEnglish}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div className='border-bottom border-maroon m-0'></div>
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
                <label className="text-muted">Bio</label>
                <input onChange={handleChange('bio')} value={bio} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Street</label>
                <input onChange={handleChange('street')} value={street} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">X cordinates (Long)</label>
                <input onChange={handleChange('x_cord')} value={x_cord} type="text" className="form-control" required placeholder="43.13XXXX"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Y cordinates (Lat)</label>
                <input onChange={handleChange('y_cord')} value={y_cord} type="text" className="form-control" required placeholder="36.34XXXX"/>
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
            <div className="col-d-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? null : <Redirect to='/'/>} 
                {JSON.stringify({nameArabic,nameEnglish,bio,cityid,street,x_cord,y_cord})}
                <h1 className="p-5 text-center">Add Store</h1>
                {error ? error : null}
                {loading ? 'Loading':newStoreForm()}
            </div>
        </Layout>
    );
}

export default AddStore;