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

const OUpdateBeautycenterStaff = (params) => {

    const staffid = params.match.params.staffid

    const [snameArabic,setSnameArabic]=useState()
    const [snameEnglish, setSnameEnglish]=useState()
    const [position,setPotion]=useState()
    const [gender,setGender]=useState()
    const [birthday,setBrithday]=useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [buttonText, setButtonText] = useState('Update')
    //bring now data of category
    useEffect(()=>{
        axios.get(`${url}/bcstaff/one/${staffid}/${userid}`)
        .then(res => {
            setSnameArabic(res.data.bcstaff.snameArabic)
            setSnameEnglish(res.data.bcstaff.snameEnglish)
            setPotion(res.data.bcstaff.position)
            setGender(res.data.bcstaff.gender)
            setBrithday(res.data.bcstaff.birthday)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setSnameArabic({})
            setSnameEnglish({})
            setPotion({})
            setGender({})
            setBrithday({})
            setError('Somthing went wrong')
        })
    }, [])




    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/bcstaff/update/${staffid}/${userid}`,
            data: {snameArabic,snameEnglish,position,gender,birthday}
        })
        .then(response =>{
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
            setButtonText('Update')
            toast.error(error.response.data.error);
        })
    };



    // const pictureBorder = () => (
    //     <div className='mb-5'>
    //         <img src={`${url}/${simage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
    //     </div>
    // )

    const newBeautyContactForm = () => (
        <form onSubmit={clickSubmit}>
           <div className="form-group">
                <label className="text-muted">الاسم بالعربي</label>
                <input onChange={(event)=>{setSnameArabic(event.target.value)}} value={snameArabic} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">الاسم بالانكليزي</label>
                <input onChange={(event)=>{setSnameEnglish(event.target.value)}} value={snameEnglish} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">الموقع الوظيفي</label>
                <input onChange={(event)=>{setPotion(event.target.value)}} value={position} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">الجنس</label>
                <select onChange={(event)=>{setGender(event.target.value)}} value={gender} type="text" className="form-control" required >
                    <option>يرجى الاختيار</option>
                    <option value='Male'>ذكر</option>
                    <option value='Female'>انثى</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">تاريخ الميلاد</label>
                <input onChange={(event)=>{setBrithday(event.target.value)}} value={birthday} type="date" className="form-control" required/>
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
                {isAuth() && isAuth().bcowner == 1 ? null : <Redirect to='/'/>} 
                {/* {JSON.stringify({nameArabic,nameEnglish,logoPath})} */}
                <h1 className="p-5 text-center">تحديث الكادر</h1>
                {error ? error : null}
                {/* {loading ? loadingSpinner():pictureBorder()} */}
                {loading ? loadingSpinner():newBeautyContactForm()}
            </div></div>
        </Layout>
    );
}

export default OUpdateBeautycenterStaff;