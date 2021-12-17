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

const Addstaff = (params) => {

    const centerid = params.match.params.centerid
    const [values, setValues] = useState({
        snameArabic:"",
        snameEnglish:"",
        position:"",
        gender:"",
        birthday:"",
        buttonText:"Submit"
    });
    // const [pic, setPic]=useState(false)
    // const [simage, setSimage ] = useState()
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
    //         setPic(true)
    //     } catch(err){
    //         if(err.response.status === 500){
    //             toast.error('There is a problem with the server');
    //         }else{
    //             toast.error(err.response.data.massage);
    //         }
    //     }
    // }


    const {
        snameArabic,
        snameEnglish,
        position,
        gender,
        birthday,
        buttonText} = values

    const handleChange = (snameArabic) => (event) => {
        setValues({...values, [snameArabic]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/bcstaff/create/${userid}`,
            data: {
                centerid,
                snameArabic,
                snameEnglish,
                position,
                gender,
                birthday,}
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

    // const pictureBorder = () => (
    //     <div className='mb-5'>
    //         <img src={`${url}/${simage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
    //     </div>
    // )

  

    const newBeautyStaffForm = () => (
        <form onSubmit={clickSubmit}>
           <div className="form-group">
                <label className="text-muted">الاسم بالعربي</label>
                <input onChange={handleChange('snameArabic')} value={snameArabic} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">الاسم بالانكليزي</label>
                <input onChange={handleChange('snameEnglish')} value={snameEnglish} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">الموقع الوظيفي</label>
                <input onChange={handleChange('position')} value={position} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">الجنس</label>
                <select onChange={handleChange('gender')} value={gender} type="text" className="form-control" required >
                    <option>يرجى الاختيار</option>
                    <option value='Male'>ذكر</option>
                    <option value='Female'>انثى</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">تاريخ الميلاد</label>
                <input onChange={handleChange('birthday')} value={birthday} type="date" className="form-control" required/>
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
                {/* {pic ? pictureBorder(): null} */}
                {newBeautyStaffForm()}
            </div></div>
        </Layout>
    );
}

export default Addstaff;