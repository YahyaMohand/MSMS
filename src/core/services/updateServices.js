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

const UpdateService = (params) => {

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const serviceid = params.match.params.serviceid
    const [service_name, setService_name]=useState()
    const [service_description, setService_description]=useState()
    const [service_file,setService_file]=useState()
    const [service_beneficiary,setService_beneficiary]=useState()
     const [service_price,setService_price]=useState()
    const [service_workduration,setService_workduration]=useState()
     const [service_madeby,setService_madeby]=useState()
    const [buttonText, setButtonText]=useState('Update')

    useEffect(()=>{
        axios.get(`${url}/admin/services/update/${serviceid}/${userid}`)
        .then(res => {
            console.log(res.data)
            setService_name(res.data.service.service_name)
            setService_description(res.data.service.service_description)
            setService_file(res.data.service.service_file)
            setService_beneficiary(res.data.service.service_beneficiary)
            setService_price(res.data.service.service_price)
            setService_workduration(res.data.service.service_workduration)
            setService_madeby(res.data.service.service_madeby)

            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setService_name({})
            setService_description({})
            setService_file({})
            setService_beneficiary({})
            setService_price({})
            setService_workduration({})
            setService_madeby({})
            console.log(error)
            setError('Somthing went wrong')
        })
    }, [])

    
    //file upload 
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
    //         const res = await axios.post(`${url}/admin/groups/upload/${userid}`,
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
            url: `${url}/admin/services/update/${serviceid}/${userid}`,
            data: {
                service_name,
                service_description,
                service_file,
                service_beneficiary,
                service_price,
                service_workduration,
                service_madeby
                }
        })
        .then(response =>{
            // console.log("Carousel Added to database successfully", response);
            setButtonText('Update')
            setService_name('')
            setService_description('')
            setService_file('')
            setService_beneficiary('')
            setService_price('')
            setService_workduration('')
            setService_madeby('')
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


    const newServiceForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={(event)=>{setService_name(event.target.value)}} value={service_name} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input onChange={(event)=>{setService_description(event.target.value)}} value={service_description} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">File</label>
                <input onChange={(event)=>{setService_file(event.target.value)}} value={service_file} type="date" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Beneficiary</label>
                <input onChange={(event)=>{setService_beneficiary(event.target.value)}} value={service_beneficiary} type="text" className="form-control" required/>
            </div>
              <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={(event)=>{setService_price(event.target.value)}} value={service_price} type="text" className="form-control" required/>
            </div>  <div className="form-group">
                <label className="text-muted">Work Duration</label>
                <input onChange={(event)=>{setService_workduration(event.target.value)}} value={service_workduration} type="text" className="form-control" required/>
            </div>  <div className="form-group">
                <label className="text-muted">Made by</label>
                <input onChange={(event)=>{setService_madeby(event.target.value)}} value={service_madeby} type="text" className="form-control" required/>
            </div>


{/* 
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
                {/* {JSON.stringify({link,notes,image,itemid,nameArabic,nameEnglish,info,active})} */}
                <h1 className="p-5 text-center">Update Service</h1>
                {error ? error : null}
                {/* {loading ? loadingSpinner():pictureBorder()} */}
                {loading ? loadingSpinner():newServiceForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateService;