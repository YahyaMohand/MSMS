import React, {useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const UpdateCity = (params) => {
  const cityid = params.match.params.cityid
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
//   const [city, setCity] = useState('')
  const [nameArabic, setNameArabic] = useState()
  const [nameEnglish, setNameEnglish] = useState()
  const [isOperational, setIsOperational] = useState()
  const [shippingCost, setShippingCost] = useState()
  const [x_cord, setX_cord] =useState()
  const [y_cord, setY_cord] =useState()
  const [buttonText, setButtonText] = useState('Update')

  useEffect(()=>{
    axios.get(`${url}/admin/cities/${cityid}/${userid}`)
    .then(res => {
        setNameArabic(res.data.city.nameArabic)
        setNameEnglish(res.data.city.nameEnglish)
        setIsOperational(res.data.city.isOperational)
        setShippingCost(res.data.city.shippingCost)
        setX_cord(res.data.city.x_cord)
        setY_cord(res.data.city.y_cord)
        setError('')
        setTimeout(()=>{setLoading(false)})
    })   
    .catch(error => {
        setLoading(false)
        setNameArabic({})
        setNameEnglish({})
        setIsOperational({})
        setShippingCost({})
        setX_cord({})
        setY_cord({})
        setError('Somthing went wrong')
    })
}, [])


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            url: `${url}/admin/cities/update/${cityid}`,
            data: {cityid, isOperational, nameArabic,  nameEnglish,shippingCost,x_cord,y_cord}
        })
        .then(response =>{
            // console.log("CITY Updated", response);
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('update')
            toast.error(error.response.data.error);
        })
    };


    const newCityForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Is Operational (0 => false) (1 => true)</label>
                <input onChange={(event)=>setIsOperational(event.target.value)} value={isOperational} type="number" min='0' max='1' className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Arabic Name</label>
                <input onChange={(event)=>setNameArabic(event.target.value)} value={nameArabic} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">English Name</label>
                <input onChange={(event)=>setNameEnglish(event.target.value)} value={nameEnglish} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping Cost (IQD)</label>
                <input 
                onChange={(event)=>setShippingCost(event.target.value)}
                value={shippingCost} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">X Cordinates (Long)</label>
                <input onChange={(event)=>setX_cord(event.target.value)} value={x_cord} type="text" className="form-control" placeholder="43.13XXXX" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Y Cordinates (Lat)</label>
                <input onChange={(event)=>setY_cord(event.target.value)} value={y_cord} type="text" className="form-control" placeholder="36.34XXXX" required/>
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
                <ToastContainer />
                {isAuth() ? null : <Redirect to='/'/>} 
                {/* {JSON.stringify({cityid,isOperational,nameArabic,nameEnglish,shippingCost,x_cord,y_cord})} */}
                <h1 className="p-5 text-center">Update City</h1>
                {error ? error : null}
                {loading ? loadingSpinner():newCityForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateCity;