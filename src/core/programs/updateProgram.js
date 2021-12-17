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

const UpdateProgram = (params) => {

    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const programid = params.match.params.programid
    const [program_name, setProgram_name]=useState()
    const [program_drivelink, setProgram_drivelink]=useState()
    const [program_startdate, setProgram_startdate]=useState()
    const [program_enddate, setProgram_enddate]=useState()
    const [program_donor, setProgram_donor ] = useState()
    const [program_description, setProgram_description ] = useState()
    const [program_objectives, setProgram_objectives ] = useState()
    const [program_activities, setProgram_activities ] = useState()
    const [program_goals, setProgram_goals ] = useState()
    const [program_beneficiaries, setProgram_beneficiaries ] = useState()
    const [buttonText, setButtonText]=useState('Update')

    
    
    useEffect(()=>{
        axios.get(`${url}/admin/programs/update/${programid}/${userid}`)
        .then(res => {
            setProgram_name(res.data.programs.program_name)
            setProgram_drivelink(res.data.programs.program_drivelink)
            setProgram_startdate(res.data.programs.program_startdate)
            setProgram_enddate(res.data.programs.program_enddate)
            setProgram_donor(res.data.programs.program_donor)
            setProgram_description(res.data.programs.program_description)
            setProgram_objectives(res.data.programs.program_objectives)
            setProgram_activities(res.data.programs.program_activities)
            setProgram_goals(res.data.programs.program_goals)
            setProgram_beneficiaries(res.data.programs.program_beneficiaries)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setProgram_name({})
            setProgram_drivelink({})
            setProgram_startdate({})
            setProgram_enddate({})
            setProgram_donor({})
            setProgram_description({})
            setProgram_objectives({})
            setProgram_activities({})
            setProgram_goals({})
            setProgram_beneficiaries({})
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
            url: `${url}/admin/programs/update/${programid}/${userid}`,
            data: {
                program_name,
                program_drivelink,
                program_startdate,
                program_enddate ,
                program_donor, 
                program_description, 
                program_objectives ,
                program_activities ,
                program_goals ,
                program_beneficiaries 
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

                <div className="form-group">
                <label className="text-muted">Program Name</label>
                <input onChange={(event)=>{setProgram_name(event.target.value)}} value={program_name} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Drive Link</label>
                <input onChange={(event)=>{setProgram_drivelink(event.target.value)}} value={program_drivelink} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Program start_date</label>
                <input onChange={(event)=>{setProgram_startdate(event.target.value)}} value={program_startdate} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Program end_date</label>
                <input onChange={(event)=>{setProgram_enddate(event.target.value)}} value={program_enddate} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Donor</label>
                <input onChange={(event)=>{setProgram_donor(event.target.value)}} value={program_donor} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={(event)=>{setProgram_description(event.target.value)}} value={program_description} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Objective</label>
                <input onChange={(event)=>{setProgram_objectives(event.target.value)}} value={program_objectives} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Activities</label>
                <textarea onChange={(event)=>{setProgram_activities(event.target.value)}} value={program_activities} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Goals</label>
                <textarea onChange={(event)=>{setProgram_goals(event.target.value)}} value={program_goals} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Beneficiaries</label>
                <textarea onChange={(event)=>{setProgram_beneficiaries(event.target.value)}} value={program_beneficiaries} type="text" className="form-control" required/>
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
                <h1 className="p-5 text-center">Update Program</h1>
                {error ? error : null}
                {/* {loading ? loadingSpinner():pictureBorder()} */}
                {loading ? loadingSpinner():newBrandForm()}
            </div></div>
        </Layout>
    );
}

export default UpdateProgram;