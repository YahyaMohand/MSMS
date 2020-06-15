import React, {useState ,useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const UpdateStore = (params) => {

    const storeid = params.match.params.storeid
    console.log(storeid)
    //update status
    const [nameArabic, setNameArabic]=useState()
    const [nameEnglish, setNameEnglish] = useState()
    const [bio, setBio]=useState()
    const [cityid, setCityid]=useState()
    const [street, setStreet]=useState()
    const [x_cord, setX_cord]=useState()
    const [y_cord, setY_cord]=useState()
    const [buttonText, setButtonText]=useState('Update')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    //get method functions of cities list (father data)
    const [cities, setCities] = useState({})

    useEffect(()=>{
        axios.get(`http://localhost:8000/admin/stores/create/${userid}`)
        .then(res => {
            // console.log('second axios %%%%%%%%',res.data)
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

    useEffect(()=>{
        axios.get(`http://localhost:8000/admin/stores/${storeid}/${userid}`)
        .then(res => {
            // console.log('first effect store data',res.data.store)
            setNameArabic(res.data.store.nameArabic)
            setNameEnglish(res.data.store.nameEnglish)
            setBio(res.data.store.bio)
            setCityid(res.data.store.cityid)
            setStreet(res.data.store.street)
            setX_cord(res.data.store.x_cord)
            setY_cord(res.data.store.y_cord)
            setTimeout(()=>{setLoading(false)})
            setError('')
        })   
        .catch(error => {
            setLoading(false)
            setNameArabic({})
            setNameEnglish({})
            setBio({})
            setCityid({})
            setStreet({})
            setX_cord({})
            setY_cord({})
            setError('Somthing went wrong')
            setLoading(false)
        })
    }, [])

    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            url: `http://localhost:8000/admin/stores/update/${storeid}/${userid}`,
            data: {nameArabic,nameEnglish, bio,  cityid, street, x_cord, y_cord}
        })
        .then(response =>{
            // console.log("City updated Successfully", response);
            setButtonText('Updated Successfully')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('Update')
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
                            <select onChange={(event)=>{setCityid(event.target.value)}} value={cityid} type="text" className="form-control" placeholder='Brands' required>
                            <option>Select one</option>
                            {console.log(cities)}
                            {cities.map(({cityid, nameEnglish})=><option value={cityid}>{nameEnglish}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div className='border-bottom border-maroon m-0'></div>
                </div>


            <div className="form-group">
                <label className="text-muted">Arabic Name</label>
                <input onChange={(event)=>{setNameArabic(event.target.value)}} value={nameArabic} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">English Name</label>
                <input onChange={(event)=>{setNameEnglish(event.target.value)}} value={nameEnglish} type="text" className="form-control" required/>
            </div>


            <div className="form-group">
                <label className="text-muted">Bio</label>
                <input onChange={(event)=>{setBio(event.target.value)}} value={bio} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Street</label>
                <input onChange={(event)=>{setStreet(event.target.value)}} value={street} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">X cordinates (Long)</label>
                <input onChange={(event)=>{setX_cord(event.target.value)}} value={x_cord} type="text" className="form-control" required placeholder="43.13XXXX"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Y cordinates (Lat)</label>
                <input onChange={(event)=>setY_cord(event.target.value)} value={y_cord} type="text" className="form-control" required placeholder="36.34XXXX"/>
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
                {loading ? loadingSpinner():newStoreForm()}
            </div>
        </Layout>
    );
}

export default UpdateStore;