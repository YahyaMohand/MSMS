import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'

const url = 'http://localhost:8000'

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const AddClassCategory = () => {

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState({})
    const [subcategories, setSubCategories] = useState({})
    const [pic,setPic]=useState(false)

    useEffect(()=>{
        axios.get(`${url}/admin/classcategories/create/${userid}`)
        .then(res => {
            
            setCategories(res.data.categories)
            setSubCategories(res.data.subcategories)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setCategories({})
            setSubCategories({})
            setError('Somthing went wrong')
        })
    }, [])

    const [values, setValues] = useState({
        categoryid: "",
        subcateid: "",
        nameArabic:"",
        nameEnglish:"",
        logoPath:"",
        buttonText:"Submit"
    });


    const [logoPath, setLogoPath ] = useState()
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
            const res = await axios.post(`${url}/admin/categories/upload/${userid}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            


            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            setLogoPath(filePath);
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

    const {categoryid, subcateid, nameArabic,nameEnglish, buttonText} = values

    const handleChange = (nameArabic) => (event) => {
        setValues({...values, [nameArabic]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/classcategories/create/${userid}`,
            data: {categoryid, subcateid,nameArabic,nameEnglish,logoPath}
        })
        .then(response =>{
            console.log("Class-Categories Added to database successfully", response);
            setValues({...values, nameArabic:'', nameEnglish: '', categoryid:'',subcateid:'',logoPath:"", buttonText: 'Submitted'});
            toast.success(response.data.message);
        })
        .catch(error => {
            console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${logoPath}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newClassCateForm = () => (
        <form onSubmit={clickSubmit}>

                <div className='form-group'>   
                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Main Category</span>
                            </div>
                            
                            <select onChange={handleChange('categoryid')} value={categoryid} type="text" className="form-control" placeholder='Brands' required>
                            <option value="0">Select one</option>
                            {categories.map(({categoryid, nameEnglish})=><option value={categoryid}>{nameEnglish+` (${categoryid})`}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Sub Category</span>
                            </div>
                            
                            <select onChange={handleChange('subcateid')} value={subcateid} type="text" className="form-control" placeholder='Brands' required>
                            <option value="0">Select one</option>
                            {subcategories.map(({subcateid, nameEnglish})=><option value={subcateid}>{nameEnglish+` (${categoryid})`}</option>)}
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
                    <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
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
            <div className="col-d-6 offset-md-3">
                <ToastContainer />
                {isAuth() ? null : <Redirect to='/'/>} 
                {JSON.stringify({categoryid,subcateid, nameArabic,nameEnglish,logoPath})}
                <h1 className="p-5 text-center">Add Class-Category</h1>
                {pic ? pictureBorder():null}
                {error ? error : null}
                {loading ? 'Loading':newClassCateForm()}
            </div>
        </Layout>
    );
}

export default AddClassCategory;