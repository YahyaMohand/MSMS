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

const AddCarousel = () => {

    const [values, setValues] = useState({
        itemid:"",
        Link: "",
        image: "",
        notes:"",
        name:"",
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
            const res = await axios.post(`${url}/admin/carousel/upload/${userid}`,
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

    const {link,itemid, notes,name,buttonText} = values

    const handleChange = (link) => (event) => {
        setValues({...values, [link]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/carousel/create/${userid}`,
            data: {link,itemid, image, notes,name}
        })
        .then(response =>{
            // console.log("Carousel Added to database successfully", response);
            setValues({...values, link:'', images: '', notes:'',name:'',itemid:'',buttonText: 'Submitted'});
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

    const newCarouselForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Web Link</label>
                <input onChange={handleChange('link')} value={link} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">item id for app</label>
                <input onChange={handleChange('itemid')} value={itemid} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Name for mobile appbar label (arabic)</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Notes to help mobile app understand</label>
                <select onChange={handleChange('notes')} value={notes}  type="text" className="form-control"  required>
                    <option>selecte item ...</option>
                    <option>product</option>
                    <option>category</option>
                    <option>subcategory</option>
                    <option>classcategory</option>
                    <option>brand</option>
                </select>
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
                    <div className="input-group-append">
                        <button className="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
                    </div>
                </div>

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
                <ToastContainer />
                {isAuth() ? null : <Redirect to='/'/>} 
                {JSON.stringify({link,image,notes,name,itemid})}
                <h1 className="p-5 text-center">Add Carousel</h1>
                {pic ? pictureBorder():null}
                {newCarouselForm()}
            </div></div>
        </Layout>
    );
}

export default AddCarousel;