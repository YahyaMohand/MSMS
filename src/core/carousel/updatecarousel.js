import React, {useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../layout';
// import { Spinner} from 'react-bootstrap';
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

const UpdateCarousel = (params) => {

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const carouselid = params.match.params.carouselid
    const [link, setLink]=useState()
    const [notes, setNotes]=useState()
    const [name,setName]=useState()
    const [itemid,setitemid]=useState()
    const [group,setgroup]=useState()
    const [active,setactive]=useState()
    const [buttonText, setButtonText]=useState('Update')
    const [image, setImage ] = useState()

    useEffect(()=>{
        axios.get(`${url}/admin/carousel/${carouselid}/${userid}`)
        .then(res => {
            setLink(res.data.carousel.link)
            setNotes(res.data.carousel.notes)
            setImage(res.data.carousel.image)
            setName(res.data.carousel.name)
            setitemid(res.data.carousel.itemid)
            setgroup(res.data.carousel.group)
            setactive(res.data.carousel.active)
            setError('')
            setTimeout(()=>{setLoading(false)})
        })   
        .catch(error => {
            setLoading(false)
            setLink({})
            setNotes({})
            setImage({})
            setName({})
            setitemid({})
            setgroup({})
            setactive({})
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
            url: `${url}/admin/carousel/update/${carouselid}/${userid}`,
            data: {link, notes, image,name,itemid,group,active}
        })
        .then(response =>{
            // console.log("Carousel Added to database successfully", response);
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
            <img src={`${url}/${image}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )


    const newCarouselForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Click Link</label>
                <input onChange={(event)=>{setLink(event.target.value)}} value={link} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Name for mobile appbar label</label>
                <input onChange={(event)=>{setName(event.target.value)}} value={name} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">item id for app</label>
                <input onChange={(event)=>{setitemid(event.target.value)}} value={itemid} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Group (in which group appears)</label>
                <input onChange={(event)=>{setgroup(event.target.value)}} value={group} type="number" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Status (Active=1, Disable=0)</label>
                <input onChange={(event)=>{setactive(event.target.value)}} value={active} type="number" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Notes to help mobile app understand</label>
                <select onChange={(event)=>{setNotes(event.target.value)}} value={notes}  type="text" className="form-control"  required>
                    <option>product</option>
                    <option>subcategory</option>
                    <option>classcategory</option>
                    <option>category</option>
                    <option>brand</option>
                    <option>group</option>
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
                        type="file" className="custom-file-input" name='file'  id='fileupload'  />
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
            <div className='container-fluid'>
            <div className="">
                {/* <ToastContainer /> */}
                {isAuth() ? null : <Redirect to='/'/>} 
                {JSON.stringify({link,notes,image,name,itemid})}
                <h1 className="p-5 text-center">Update Carousel</h1>
                {error ? error : null}
                {loading ? loadingSpinner():pictureBorder()}
                {loading ? loadingSpinner():newCarouselForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateCarousel;