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

const AddService = (params) => {
    const [discount, setDiscount] = useState()
    const centerid = params.match.params.centerid
    const [values, setValues] = useState({
        sname:"",
        price:"",
        discount:"",
        discountprice:"",
        pricetype:"",
        description:"",
        centerid:"",
        buttonText:"Submit"
    });
    const [pic, setPic]=useState(false)
    const [simage, setSimage ] = useState()
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
            setPic(true)
        } catch(err){
            if(err.response.status === 500){
                toast.error('There is a problem with the server');
            }else{
                toast.error(err.response.data.massage);
            }
        }
    }


    const {sname,
        price,
        // discount,
        discountprice,
        pricetype,
        description,
        buttonText} = values

    const handleChange = (sname) => (event) => {
        setValues({...values, [sname]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/bcservices/create/${userid}`,
            data: {sname,
            price,
            discount,
            discountprice,
            pricetype,
            description,
            centerid,
            simage}
        })
        .then(response =>{
            // console.log("Categories Added to database successfully", response);
            setValues({...values, buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${simage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const calculateMargins =()=>{
        
       
        if((discountprice)==(price)){
            
            setDiscount(0)
        }else{
           
            setDiscount(
                ((price-discountprice)/price).toFixed(2)
            )
        }
    }

    const newBeautyServiceForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">اسم الخدمة</label>
                <input onChange={handleChange('sname')} value={sname} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">وصف الخدمة</label>
                <input onChange={handleChange('description')} value={description} type="textarea" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">العملة دينار / دولار</label>
                <select onChange={handleChange('pricetype')} value={pricetype} type="number" className="form-control" required>
                    <option>يرجى الاختيار</option>
                    <option value='0'>دولار</option>
                    <option value='1'>دينار</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">سعر الخدمة</label>
                <input onChange={handleChange('price')} value={price} type="number" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">سعر التخفيض</label>
                <input onChange={handleChange('discountprice')} value={discountprice} type="number" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                        <div className='input-group-prepend '>
                            <span className='input-group-text badge-secondary'>نسبة التخفيض</span>
                        </div>
                        <input 
                        onChange={handleChange('discount')} 
                        
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
                    type="file" className="custom-file-input" name='file'  id='fileupload' required />
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
                <h1 className="p-5 text-center">اضافة مركز تجميل</h1>
                {pic ? pictureBorder(): null}
                {newBeautyServiceForm()}
            </div></div>
        </Layout>
    );
}

export default AddService;