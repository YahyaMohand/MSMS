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

const OUpdateBeautycenterContact = (params) => {

    const contactid = params.match.params.contactid

    const [method,setMethod]=useState()
    const [type,setType]=useState()
    const [value,setValue]=useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [buttonText, setButtonText] = useState('Update')
    //bring now data of category
    useEffect(()=>{
        axios.get(`${url}/bccontacts/one/${contactid}/${userid}`)
        .then(res => {
            setMethod(res.data.bccontacts.method)
            setType(res.data.bccontacts.type)
            setValue(res.data.bccontacts.value)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setMethod({})
            setType({})
            setValue({})
            setError('Somthing went wrong')
        })
    }, [])




    // //file upload 
    // const [file, setFile] = useState('')
    // const [filename, setFilename] = useState('Choose Image')
    // const [uploadedFile, setUploadedFile] = useState({});

    // const onUpload = e => {
    //     setFile(e.target.files[0]);
    //     setFilename(e.target.files[0].name)
    // }

    // const onSubmitFile = async e => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);
        
    //     try {
    //         const res = await axios.post(`${url}/admin/beautycenters/upload/${userid}`,
    //         formData,
    //         {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
            
    //         const {fileName, filePath} = res.data;
            
    //         setUploadedFile({ fileName, filePath});
    //         setSimage(filePath);
    //         toast.success('Image uploaded to the server')
    //     } catch(err){
    //         if(err.response.status === 500){
    //             toast.error('There is a problem with the server');
    //         }else{
    //             toast.error(err.response.data.massage);
    //         }
    //     }
    // }


    // const {nameArabic, nameEnglish, buttonText} = values

    // const handleChange = (nameArabic) => (event) => {
    //     setValues({...values, [nameArabic]: event.target.value});
    // }

    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/bccontacts/update/${contactid}/${userid}`,
            data: {method,type,value}
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
                <label className="text-muted">الفئة</label>
                <select onChange={(event)=>{setMethod(event.target.value)}} value={method} type="text" className="form-control" required >
                    <option>يرجى الاختيار</option>
                    <option value='number'>رقم موبايل</option>
                    <option value='link'>رابط</option>
                    <option value='email'>ايميل</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">وصف الخدمة</label>
                <select onChange={(event)=>{setType(event.target.value)}} value={type} type="textarea" className="form-control" required>
                    <option>يرجى الاختيار</option>
                    <option value='number'>رقم موبايل</option>
                    <option value='facebook'>فيس بوك</option>
                    <option value='instagram'>انستاغرام</option>
                    <option value='whatsapp'>واتس اب</option>
                    <option value='tiktok'>تيك توك</option>
                    <option value='telegram'>تلي كرام</option>
                    <option value='snapchat'>سناب جات</option>
                    <option value='email'>ايميل</option>
                    <option value='googlemaps'>خرائط كوكل</option>
                    <option value='website'>موقع الكتروني</option>
                </select>
            </div>

           

            <div className="form-group">
                <label className="text-muted">الرقم او الرابط</label>
                <input onChange={(event)=>{setValue(event.target.value)}} value={value} type="text" className="form-control" required/>
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
                <h1 className="p-5 text-center">تحديث معلومات الاتصال</h1>
                {error ? error : null}
                {/* {loading ? loadingSpinner():pictureBorder()} */}
                {loading ? loadingSpinner():newBeautyContactForm()}
            </div></div>
        </Layout>
    );
}

export default OUpdateBeautycenterContact;