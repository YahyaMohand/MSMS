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

const UpdateEvents = (params) => {

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const eventid = params.match.params.eventid
    const [event_type, setEvent_type]=useState()
    const [event_name, setEvent_name]=useState()
    const [event_description, setEvent_description]=useState()
    const [event_place, setEvent_place]=useState()
    const [event_durationdays, setEvent_durationdays]=useState()
    const [event_durationhours, setEvent_durationhours]=useState()
    const [event_startdate, setEvent_startdate]=useState()
    const [event_enddate, setEvent_enddate]=useState()
    const [event_partenrs, setEvent_partenrs]=useState()
    const [programid, setProgramid]=useState()
    const [buttonText, setButtonText]=useState('Update')

    useEffect(()=>{
        axios.get(`${url}/admin/events/update/${eventid}/${userid}`)
        .then(res => {console.log(res.data)
            setEvent_type(res.data.events.event_type)
            setEvent_name(res.data.events.event_name)
            setEvent_description(res.data.events.event_description)
            setEvent_place(res.data.events.event_place)
            setEvent_durationdays(res.data.events.event_durationdays)
            setEvent_durationhours(res.data.events.event_durationhours)
            setEvent_startdate(res.data.events.event_startdate)
            setEvent_enddate(res.data.events.event_enddate)
            setEvent_partenrs(res.data.events.event_partenrs)
            setProgramid(res.data.events.programid)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setEvent_type({})
            setEvent_name({})
            setEvent_description({})
            setEvent_place({})
            setEvent_durationdays({})
            setEvent_durationhours({})
            setEvent_startdate({})
            setEvent_enddate({})
            setEvent_partenrs({})
            setProgramid({})
            console.log(error)
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
    //         const res = await axios.post(`${url}/admin/brands/upload/${userid}`,
    //         formData,
    //         {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
            


    //         const {fileName, filePath} = res.data;
            
    //         setUploadedFile({ fileName, filePath});
    //         setLogo(filePath);
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
            url: `${url}/admin/events/update/${eventid}/${userid}`,
            data: {
                event_type,
                event_name,
                event_description,
                event_place,
                event_durationdays,
                event_durationhours,
                event_startdate,
                event_enddate,
                event_partenrs,
                programid
            }
        })
        .then(response =>{
            // console.log("BRAND Added to database successfully", response);
            setButtonText('Updated')
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
    //         <img src={`${url}/${logo}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
    //     </div>
    // )


    const newBrandForm = () => (
        <form onSubmit={clickSubmit}>
            <ToastContainer position='bottom-right'/>


            <div className="form-group">
                <label className="text-muted">Activity Type</label>
                <input onChange={(event)=>{setEvent_type(event.target.value)}} value={event_type} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Activity Name</label>
                <input onChange={(event)=>{setEvent_name(event.target.value)}} value={event_name} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={(event)=>{setEvent_description(event.target.value)}} value={event_description} type="textarea" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Activity Place</label>
                <input onChange={(event)=>{setEvent_place(event.target.value)}} value={event_place} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Duration day</label>
                <input onChange={(event)=>{setEvent_durationdays(event.target.value)}} value={event_durationdays} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Duration hours</label>
                <input onChange={(event)=>{setEvent_durationhours(event.target.value)}} value={event_durationhours} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Start date</label>
                <input onChange={(event)=>{setEvent_startdate(event.target.value)}} value={event_startdate} type="date" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">End date</label>
                <input onChange={(event)=>{setEvent_enddate(event.target.value)}} value={event_enddate} type="date" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Partner</label>
                <input onChange={(event)=>{setEvent_partenrs(event.target.value)}} value={event_partenrs} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Program id</label>
                <input onChange={(event)=>{setEvent_partenrs(event.target.value)}} value={programid} type="text" className="form-control" required/>
            </div>
            {/* <div className="form-group">
                <label className="text-muted">Arabic Name</label>
                <input onChange={(event)=>{setNameArabic(event.target.value)}} value={nameArabic} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">English Name</label>
                <input onChange={(event)=>{setNameEnglish(event.target.value)}} value={nameEnglish} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Bio</label>
                <textarea onChange={(event)=>{setBio(event.target.value)}} value={bio} type="textarea" className="form-control" required/>
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
                    <div class="input-group-append">
                        <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
                    </div>
                </div> */}



            <div className='mb-5 mt-5'>
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
                {/* {JSON.stringify({nameArabic,nameEnglish,bio,logo})} */}
                <h1 className="p-5 text-center">Update Activity</h1>
                {error ? error : null}
                {/* {loading ? loadingSpinner():pictureBorder()} */}
                {loading ? loadingSpinner():newBrandForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateEvents;