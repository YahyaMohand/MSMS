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

const UpdateSubCategory = (params) => {

    const subcateid = params.match.params.subcateid
     //get method functions
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState('')
     const [categories, setCategories] = useState({})
     const [nameArabic,setNameArabic]= useState()
     const [nameEnglish, setNameEnglish]= useState()
     const [categoryid, setCategoryid]= useState()
     const [buttonText, setButtonText]= useState('Update')
     const [logoPath, setLogoPath ] = useState()
 
     useEffect(()=>{
         axios.get(`${url}/admin/subcategories/create/${userid}`)
         .then(res => {
             
             setCategories(res.data.categories)
             setError('')
             setLoading(false)
         })   
         .catch(error => {
             setLoading(false)
             setCategories({})
             setError('Somthing went wrong')
         })

         axios.get(`${url}/admin/subcategories/${subcateid}/${userid}`)
         .then(res => {
             setNameArabic(res.data.subcategory.nameArabic)
             setNameEnglish(res.data.subcategory.nameEnglish)
             setLogoPath(res.data.subcategory.logoPath)
             setCategoryid(res.data.subcategory.categoryid)
             setError('')
             setTimeout(()=>{setLoading(false)})
         })   
         .catch(error => {
             setLoading(false)
             setNameArabic({})
             setNameEnglish({})
             setCategoryid({})
             setLogoPath({})
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
        } catch(err){
            if(err.response.status === 500){
                toast.error('There is a problem with the server');
            }else{
                toast.error(err.response.data.massage);
            }
        }
    }


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/subcategories/update/${subcateid}/${userid}`,
            data: {nameArabic, nameEnglish,  categoryid, logoPath}
        })
        .then(response =>{
            // console.log("Sub-Categories updated", response);
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('Update')
            toast.error(error.response.data.error);
        })
    };

    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${logoPath}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>

                <div className='form-group'>   
                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Main Category</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={(event)=>{setCategoryid(event.target.value)}} value={categoryid} type="text" className="form-control" required>
                            <option>Select one ...</option>
                            {categories.map(({categoryid, nameEnglish})=><option value={categoryid}>{nameEnglish}</option>)}
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
                {JSON.stringify({nameArabic,nameEnglish,categoryid,logoPath})}
                <h1 className="p-5 text-center">Update Sub-Category</h1>
                {error ? error : null}
                {loading ?loadingSpinner():pictureBorder()}
                {loading ? loadingSpinner():newCategoryForm()}
            </div>
        </Layout>
    );
}

export default UpdateSubCategory;