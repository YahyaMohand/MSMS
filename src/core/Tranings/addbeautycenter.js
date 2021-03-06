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
                <label className="text-muted">?????????? ??????????????</label>
                <input onChange={handleChange('nameArabic')} value={nameArabic} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">?????????? ????????????????????</label>
                <input onChange={handleChange('nameEnglish')} value={nameEnglish} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">???????? ???? ????????????</label>
                <input onChange={handleChange('description')} value={description} type="textarea" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">?????????? ??????????</label>
                <input onChange={handleChange('worktime')} value={worktime} type="textarea" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">?????? ???????? ???????????????? ?????????????? (?????? ???????????? ???????? ??????????)</label>
                <input onChange={handleChange('ouserid')} value={ouserid} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>????????????????</span>
                            </div>
                            
                            <select onChange={handleChange('province')} value={province} type="text" className="form-control" placeholder='provinces' required>
                            <option>???????? ????????????????</option>
                            <option value='Baghdad'>??????????</option>
                            <option value='Nineveh'>??????????</option>
                            <option value='Basra'>????????????</option>
                            <option value='Babil'>????????</option>
                            <option value='Erbil'>??????????</option>
                            <option value='Sulaymaniyah'>????????????????????</option>
                            <option value='Al Anbar'>??????????????</option>
                            <option value='Dhi Qar'>???? ??????</option>
                            <option value='Diyala'>??????????</option>
                            <option value='Kirkuk'>??????????</option>
                            <option value='Saladin'>???????? ??????????</option>
                            <option value='Najaf'>??????????</option>
                            <option value='Karbala'>????????????</option>
                            <option value='Wasit'>????????</option>
                            <option value='Al Qadisiyyah'>????????????????</option>
                            <option value='Duhok'>????????</option>
                            <option value='Maysan'>??????????</option>
                            <option value='Muthanna'>????????????</option>
                            </select>
                        </div>

            <div className="form-group">
                <label className="text-muted">?????? ??????????????</label>
                <input onChange={handleChange('city')} value={city} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">??????????????</label>
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
                    <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>??????</button>
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
                <h1 className="p-5 text-center">?????????? ???????? ??????????</h1>
                {pic ? pictureBorder(): null}
                {newBeautyCenterForm()}
            </div></div>
        </Layout>
    );
}

export default AddBeautyCeter;