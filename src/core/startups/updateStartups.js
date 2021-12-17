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

const UpdateStartup = (params) => {

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const startupid = params.match.params.startupid
    const [startup_name, setStartup_name]=useState()
    const [startup_logo, setStartup_logo]=useState()
    const [startup_idea,setStartup_idea]=useState()
    const [startup_sector,setStartup_sector]=useState()
    const [startup_stage,setStartup_stage]=useState()
    const [startup_startdate,setStartup_startdate]=useState()
    const [startup_facebook, setStartup_facebook ] = useState()
    const [startup_instagram, setStartup_instagram ] = useState()
    const [startup_website, setStartup_website ] = useState()
    const [buttonText, setButtonText]=useState('Update')

    useEffect(()=>{
        axios.get(`${url}/admin/startups/update/${startupid}/${userid}`)
        .then(res => {
            console.log(res.data)
            setStartup_name(res.data.startup.startup_name)
            setStartup_logo(res.data.startup.startup_logo)
            setStartup_idea(res.data.startup.startup_idea)
            setStartup_sector(res.data.startup.startup_sector)
            setStartup_stage(res.data.startup.startup_stage)
            setStartup_startdate(res.data.startup.startup_startdate)
            setStartup_facebook(res.data.startup.startup_facebook)
            setStartup_instagram(res.data.startup.startup_instagram)
            setStartup_website(res.data.startup.startup_website)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setStartup_name({})
            setStartup_logo({})
            setStartup_idea({})
            setStartup_sector({})
            setStartup_stage({})
            setStartup_startdate({})
            setStartup_facebook({})
            setStartup_instagram({})
            setStartup_website({})
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

    // const onSubmitFile = async e => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);
        
    //     try {
    //         const res = await axios.post(`${url}/admin/carousel/upload/${userid}`,
    //         formData,
    //         {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
            


    //         const {fileName, filePath} = res.data;
            
    //         setUploadedFile({ fileName, filePath});
    //         setImage(filePath);
    //         toast.success('Image uploaded to the server')
    //     } catch(err){
    //         if(err.response.status === 500){
    //             toast.error('There is a problem with the server');
    //         }else{
    //             toast.error(err.response.data.message);
    //         }
    //     }
    // }


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/startups/update/${startupid}/${userid}`,
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
            } 
        })
        .then(response =>{
            // console.log("Carousel Added to database successfully", response);
            setButtonText('Update')
            setLoading(false)
            setStartup_name('')
            setStartup_logo('')
            setStartup_idea('')
            setStartup_sector('')
            setStartup_stage('')
            setStartup_startdate('')
            setStartup_facebook('')
            setStartup_instagram('')
            setStartup_website('')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('Update')
            toast.error(error.response.data.error);
        })
    };

    // const pictureBorder = () => (
    //     <div className='mb-5'>
    //         <img src={`${url}/${image}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
    //     </div>
    // )


    const newStartupForm = () => (
        <form onSubmit={clickSubmit}>
            <ToastContainer position='bottom-right'/>
  <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={(event)=>{setStartup_name(event.target.value)}} value={startup_name} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Logo</label>
                <input onChange={(event)=>{setStartup_logo(event.target.value)}} value={startup_logo} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Startup idea</label>
                <input onChange={(event)=>{setStartup_idea(event.target.value)}} value={startup_idea} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Startup sector</label>
                <input onChange={(event)=>{setStartup_sector(event.target.value)}} value={startup_sector} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Startup stage</label>
                <input onChange={(event)=>{setStartup_stage(event.target.value)}} value={startup_stage} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Start date</label>
                <input onChange={(event)=>{setStartup_startdate(event.target.value)}} value={startup_startdate} type="date" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Facebook</label>
                <input onChange={(event)=>{setStartup_facebook(event.target.value)}} value={startup_facebook} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Instagram</label>
                <input onChange={(event)=>{setStartup_instagram(event.target.value)}} value={startup_instagram} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Website</label>
                <input onChange={(event)=>{setStartup_instagram(event.target.value)}} value={startup_instagram} type="text" className="form-control" required/>
            </div>

            {/* <div className='input-group mb-3'>
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
            <div className='container-fluid'>
            <div className="">
                {/* <ToastContainer /> */}
                {isAuth() ? null : <Redirect to='/'/>} 
                {/* {JSON.stringify({link,notes,image,name,itemid})} */}
                <h1 className="p-5 text-center">Update Startup </h1>
                {error ? error : null}
                {/* {loading ? loadingSpinner():pictureBorder()} */}
                {loading ? loadingSpinner():newStartupForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateStartup;