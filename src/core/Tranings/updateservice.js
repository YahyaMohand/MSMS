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

const UpdateBeautycenterService = (params) => {

    const serviceid = params.match.params.serviceid

    const [sname, setSname] =useState()
    const [price, setPrice] = useState()
    const [discountprice,setdiscountprice]=useState()
    const [buttonText, setButtonText] = useState('Update')
    const [discount,setDiscount]=useState()
    const [pricetype,setPricetype]=useState()
    const [description, setDescription]=useState()
    const [simage,setSimage]=useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    //bring now data of category
    useEffect(()=>{
        axios.get(`${url}/admin/bcservices/one/${serviceid}/${userid}`)
        .then(res => {
            setSname(res.data.bcservices.sname)
            setDescription(res.data.bcservices.description)
            setPrice(res.data.bcservices.price)
            setDiscount(res.data.bcservices.discount)
            setdiscountprice(res.data.bcservices.discountprice)
            setPricetype(res.data.bcservices.pricetype)
            setSimage(res.data.bcservices.simage)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setSname({})
            setDescription({})
            setPrice({})
            setDiscount({})
            setdiscountprice({})
            setPricetype({})
            setDescription({})
            setSimage({})
            setError('Somthing went wrong')
        })
    }, [])




    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    const onSubmitFile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const res = await axios.post(`${url}/admin/beautycenters/upload/${userid}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            setSimage(filePath);
            toast.success('Image uploaded to the server')
        } catch(err){
            if(err.response.status === 500){
                toast.error('There is a problem with the server');
            }else{
                toast.error(err.response.data.massage);
            }
        }
    }


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
            url: `${url}/admin/bcservices/update/${serviceid}/${userid}`,
            data: {sname,
                price,
                discount,
                discountprice,
                pricetype,
                description,
                simage}
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

    const calculateMargins =()=>{
        if((discountprice)==(price)){
            setDiscount(0)
        }else{ 
            setDiscount(
                ((price-discountprice)/price).toFixed(2)
            )
        }
    }


    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${simage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newBeautyServiceForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">اسم الخدمة</label>
                <input onChange={(event)=>{setSname(event.target.value)}} value={sname} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">وصف الخدمة</label>
                <input onChange={(event)=>{setDescription(event.target.value)}} value={description} type="textarea" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">العملة دينار / دولار</label>
                <select onChange={(event)=>{setPricetype(event.target.value)}} value={pricetype} type="number" className="form-control" required>
                    <option>يرجى الاختيار</option>
                    <option value='0'>دولار</option>
                    <option value='1'>دينار</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">سعر الخدمة</label>
                <input onChange={(event)=>{setPrice(event.target.value)}} value={price} type="number" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">سعر التخفيض</label>
                <input onChange={(event)=>{setdiscountprice(event.target.value)}} value={discountprice} type="number" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                        <div className='input-group-prepend '>
                            <span className='input-group-text badge-secondary'>نسبة التخفيض</span>
                        </div>
                        <input 
                        onChange={(event)=>{setDiscount(event.target.value)}} 
                        
                        value={discount} type="number" className="form-control" disabled /> 
                    </div>

                <div className='row text-center mb-5'>
                    <button type='button' onClick={()=>calculateMargins()} className='btn btn-outline-danger btn-block'>حساب التخفيض</button>
                </div>


            <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>Select Square Image</span>
                </div>
                <div className='custom-file'>
                    <input 
                    onChange={onUpload} 
                    // value={filename} 
                    type="file" className="custom-file-input" name='file'  id='fileupload' />
                    <label className='custom-file-label'>{filename}</label>
                </div>
                <div class="input-group-append">
                    <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>رفع</button>
                </div>
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
                {/* {JSON.stringify({nameArabic,nameEnglish,logoPath})} */}
                <h1 className="p-5 text-center">تحديث الخدمة</h1>
                {error ? error : null}
                {loading ? loadingSpinner():pictureBorder()}
                {loading ? loadingSpinner():newBeautyServiceForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateBeautycenterService;