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

const UpdateMember = (params) => {

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const membershipsrentid = params.match.params.membershipsrentid
    const [mem_type, setMem_type]=useState()
    const [mem_startdate, setMem_startdate]=useState()
    const [mem_enddate, setMem_enddate]=useState()
    const [mem_durationtype, setMem_durationtype ] = useState()
    const [mem_price, setMem_price ] = useState()
    const [mem_teamname, setMem_teamname ] = useState()
    const [mem_description, setMem_description ] = useState()
    const [mem_duration, setMem_duration ] = useState()
    const [buttonText, setButtonText]=useState('Update')

    
    useEffect(()=>{
        axios.get(`${url}/admin/membershipsrent/update/${membershipsrentid}/${userid}`)
        .then(res => {
            setMem_type(res.data.membershipsrents.mem_type)
            setMem_startdate(res.data.membershipsrents.mem_startdate)
            setMem_enddate(res.data.membershipsrents.mem_enddate)
            setMem_durationtype(res.data.membershipsrents.mem_durationtype)
            setMem_price(res.data.membershipsrents.mem_price)
            setMem_teamname(res.data.membershipsrents.mem_teamname)
            setMem_description(res.data.membershipsrents.mem_description)
            setMem_duration(res.data.membershipsrents.mem_duration)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setMem_type({})
            setMem_startdate({})
            setMem_enddate({})
            setMem_durationtype({})
            setMem_price({})
            setMem_teamname({})
            setMem_description({})
            setMem_duration({})
            setLoading(false)
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
    //         const res = await axios.post(`${url}/admin/programs/upload/${userid}`,
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
            url: `${url}/admin/memberships/update/${membershipsrentid}/${userid}`,
            data: {
                mem_startdate,
                mem_enddate,
                mem_type,
                mem_durationtype ,
                mem_price, 
                mem_teamname, 
                mem_description ,
                mem_duration ,
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


    const newMemberForm = () => (
        <form onSubmit={clickSubmit}>
            <ToastContainer position='bottom-right'/>
                <div className="form-group">
                <label className="text-muted">Team name</label>
                <input onChange={(event)=>{setMem_teamname(event.target.value)}} value={mem_teamname} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Type</label>
                <input onChange={(event)=>{setMem_type(event.target.value)}} value={mem_type} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Start date</label>
                <input onChange={(event)=>{setMem_startdate(event.target.value)}} value={mem_startdate} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">End date</label>
                <input onChange={(event)=>{setMem_enddate(event.target.value)}} value={mem_enddate} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Duration type</label>
                <input onChange={(event)=>{setMem_durationtype(event.target.value)}} value={mem_durationtype} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Duration</label>
                <textarea onChange={(event)=>{setMem_duration(event.target.value)}} value={mem_duration} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input onChange={(event)=>{setMem_description(event.target.value)}} value={mem_description} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <textarea onChange={(event)=>{setMem_price(event.target.value)}} value={mem_price} type="text" className="form-control" required/>
            </div>

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
                <h1 className="p-5 text-center">Update Membership</h1>
                {error ? error : null}
                {/* {loading ? loadingSpinner():pictureBorder()} */}
                {loading ? loadingSpinner():newMemberForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateMember;