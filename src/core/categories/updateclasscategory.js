import React, {useState, useEffect} from 'react';
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

const UpdateClassCategory = (params) => {

    const classcateid = params.match.params.classcateid

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState({})
    const [subcategories, setSubCategories] = useState({})
    const [nameArabic, setNameArabic]= useState()
    const [nameEnglish, setNameEnglish] =useState()
    const [logoPath, setLogoPath ] = useState()
    const [categoryid, setCategoryid] =useState()
    const [subcateid, setSubcateid]=useState()
    const [buttonText, setButtonText]=useState('Update')

    useEffect(()=>{
        axios.get(`${url}/admin/classcategories/create/${userid}`)
        .then(res => {
            // console.log('first axios', res.data)
            setCategories(res.data.categories)
            setSubCategories(res.data.subcategories)
            setError('')
            // setLoading(true)
        })   
        .catch(error => {
            // setLoading(true)
            setCategories({})
            setSubCategories({})
            setError('Somthing went wrong')
        })

        axios.get(`${url}/admin/classcategories/${classcateid}/${userid}`)
         .then(res => {
            // console.log('second axios', res.data)
             setNameArabic(res.data.classcategory.nameArabic)
             setNameEnglish(res.data.classcategory.nameEnglish)
             setLogoPath(res.data.classcategory.logoPath)
             setCategoryid(res.data.classcategory.categoryid)
             setSubcateid(res.data.classcategory.subcateid)
             setError('')
             setTimeout(()=>{setLoading(false)})
         })   
         .catch(error => {
             setLoading(false)
             setNameArabic({})
             setNameEnglish({})
             setCategoryid({})
             setSubcateid({})
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
                toast.error(err.response.data.message);
            }
        }
    }


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/classcategories/update/${classcateid}/${userid}`,
            data: {categoryid, subcateid,nameArabic,nameEnglish,logoPath}
        })
        .then(response =>{
            // console.log("Class-Categories Added to database successfully", response);
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
            <img src={`${url}/${logoPath}`} alt="class-category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
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
                            
                            <select onChange={(event)=>{setCategoryid(event.target.value)}} value={categoryid} type="text" className="form-control"  required>
                            <option>Select one</option>
                            {categories.map(({categoryid, nameEnglish})=><option value={categoryid}>{nameEnglish+` (${categoryid})`}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Sub Category</span>
                            </div>
                            
                            <select onChange={(event)=>{setSubcateid(event.target.value)}} value={subcateid} type="text" className="form-control" required>
                            <option>Select one</option>
                            {subcategories.map(({subcateid, nameEnglish})=><option value={subcateid}>{nameEnglish+` (${categoryid})`}</option>)}
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
                    type="file" className="custom-file-input" name='file'  id='fileupload'  />
                    <label className='custom-file-label'>{filename}</label>
                </div>
                <div className="input-group-append">
                    <button className="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
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
                {JSON.stringify({categoryid,subcateid, nameArabic,nameEnglish,logoPath})}
                <h1 className="p-5 text-center">Update Class-Category</h1>
                {/* {console.log('reachhed below render of JX')} */}
                {error ? error : null}
                {loading ? loadingSpinner():pictureBorder()}
                {loading ? loadingSpinner():newClassCateForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateClassCategory;