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

const AddBeautyCeter = () => {

    const [values, setValues] = useState({
        nameArabic: "",
        nameEnglish: "",
        description:"",
        ouserid:"",
        city:"",
        province:"",
        address:"",
        worktime:"",
        buttonText:"Submit"
    });
    const [pic, setPic]=useState(false)
    const [cimage, setCimage ] = useState()
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
            setCimage(filePath);
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


    const {nameArabic, nameEnglish,description,worktime,
    ouserid,
    city,
    province,
    address, buttonText} = values

    const handleChange = (nameArabic) => (event) => {
        setValues({...values, [nameArabic]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/beautycenters/create/${userid}`,
            data: {nameArabic, nameEnglish,  description,ouserid,city,province,address,cimage,worktime}
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
            <img src={`${url}/${cimage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newBeautyCenterForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">الاسم بالعربي</label>
                <input onChange={handleChange('nameArabic')} value={nameArabic} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">الاسم بالانكليزي</label>
                <input onChange={handleChange('nameEnglish')} value={nameEnglish} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">نبذة عن المركز</label>
                <input onChange={handleChange('description')} value={description} type="textarea" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">اوقات العمل</label>
                <input onChange={handleChange('worktime')} value={worktime} type="textarea" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">رقم حساب المستخدم المرتبط (اذا لايوجد يترك فارغا)</label>
                <input onChange={handleChange('ouserid')} value={ouserid} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>المحافظة</span>
                            </div>
                            
                            <select onChange={handleChange('province')} value={province} type="text" className="form-control" placeholder='provinces' required>
                            <option>يرجى الاختيار</option>
                            <option value='Baghdad'>بغداد</option>
                            <option value='Nineveh'>نينوى</option>
                            <option value='Basra'>البصرة</option>
                            <option value='Babil'>بابل</option>
                            <option value='Erbil'>اربيل</option>
                            <option value='Sulaymaniyah'>السليمانية</option>
                            <option value='Al Anbar'>الانبار</option>
                            <option value='Dhi Qar'>ذي قار</option>
                            <option value='Diyala'>ديالى</option>
                            <option value='Kirkuk'>كركوك</option>
                            <option value='Saladin'>صلاح الدين</option>
                            <option value='Najaf'>النجف</option>
                            <option value='Karbala'>كربلاء</option>
                            <option value='Wasit'>واسط</option>
                            <option value='Al Qadisiyyah'>القادسية</option>
                            <option value='Duhok'>دهوك</option>
                            <option value='Maysan'>ميسان</option>
                            <option value='Muthanna'>المثنى</option>
                            </select>
                        </div>

            <div className="form-group">
                <label className="text-muted">اسم المدينة</label>
                <input onChange={handleChange('city')} value={city} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">العنوان</label>
                <input onChange={handleChange('address')} value={address} type="text" className="form-control" required/>
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
                {newBeautyCenterForm()}
            </div></div>
        </Layout>
    );
}

export default AddBeautyCeter;