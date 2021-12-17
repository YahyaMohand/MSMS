import React, {useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const AddStartup = () => {

    const [values, setValues] = useState({
        startup_name:"",
        startup_logo: "",
        startup_idea: "",
        startup_sector:"",
        startup_stage:"",
        startup_startdate:"",
        startup_facebook:"",
        startup_instagram:"",
        startup_website:"",
        buttonText:"Submit"
    });



    const [pic, setPic]=useState(false)
    const [image, setImage ] = useState()
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
            const res = await axios.post(`${url}/admin/startups/upload/${userid}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            


            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            setImage(filePath);
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

    const {
        startup_name,
        startup_logo,
        startup_idea,
        startup_sector,
        startup_stage,
        startup_startdate,
        startup_facebook,
        startup_instagram,
        startup_website,
        buttonText
    } = values

    const handleChange = (link) => (event) => {
        setValues({...values, [link]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/startups/create/${userid}`,
            data: {
                startup_name,
                startup_logo,
                startup_idea,
                startup_sector,
                startup_stage,
                startup_startdate,
                startup_facebook,
                startup_instagram,
                startup_website,
                buttonText
            }
        })
        .then(response =>{
            // console.log("Carousel Added to database successfully", response);
            setValues({...values,
                startup_name:"",
                startup_logo: "",
                startup_idea: "",
                startup_sector:"",
                startup_stage:"",
                startup_startdate:"",
                startup_facebook:"",
                startup_instagram:"",
                startup_website:""
            });
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
            <img src={`${url}/${image}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newStartupForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('startup_name')} value={startup_name} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Logo</label>
                <input onChange={handleChange('startup_logo')} value={startup_logo} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Startup idea</label>
                <input onChange={handleChange('startup_idea')} value={startup_idea} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Startup sector</label>
                <input onChange={handleChange('startup_sector')} value={startup_sector} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Startup stage</label>
                <input onChange={handleChange('startup_stage')} value={startup_stage} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Start date</label>
                <input onChange={handleChange('startup_startdate')} value={startup_startdate} type="date" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Facebook</label>
                <input onChange={handleChange('startup_facebook')} value={startup_facebook} type="link" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Instagram</label>
                <input onChange={handleChange('startup_instagram')} value={startup_instagram} type="link" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Website</label>
                <input onChange={handleChange('startup_website')} value={startup_website} type="link" className="form-control" required/>
            </div>
{/* 
            <div className="form-group">
                <label className="text-muted">Notes to help mobile app understand</label>
                <select onChange={handleChange('notes')} value={notes}  type="text" className="form-control"  required>
                    <option>selecte item ...</option>
                    <option>product</option>
                    <option>category</option>
                    <option>subcategory</option>
                    <option>classcategory</option>
                    <option>brand</option>
                    <option>group</option>
                </select>
            </div> */}
{/* 
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
                    <div className="input-group-append">
                        <button className="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
                    </div>
                </div> */}

            <div>
                <button className="btn btn-primary mt-5 mb-5">
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
                {/* {JSON.stringify({link,image,notes,name,itemid})} */}
                <h1 className="p-5 text-center">Add Startup</h1>
                {pic ? pictureBorder():null}
                {newStartupForm()}
            </div></div>
        </Layout>
    );
}

export default AddStartup;