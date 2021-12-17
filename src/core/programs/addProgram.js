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

const AddProgram = () => {

    const [values, setValues] = useState({
        program_name: "",
        program_drivelink : "",
        program_startdate : "", 
        program_enddate : "" ,
        program_donor : "",
        program_description : "",
        program_objectives : "",
        program_activities : "",
        program_goals : "",
        program_beneficiaries : "",
        buttonText : "Submit"
    });
    const [pic, setPic]=useState(false)
    const [logo, setLogo ] = useState()
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
            const res = await axios.post(`${url}/admin/programs/upload/${userid}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            


            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            setLogo(filePath);
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

    const {program_name,
        program_drivelink,
        program_startdate, 
        program_enddate,
        program_donor,
        program_description,
        program_objectives,
        program_activities,
        program_goals,
        program_beneficiaries,
        buttonText} = values

    const handleChange = (nameArabic) => (event) => {
        setValues({...values, [nameArabic]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/programs/create/${userid}`,
            data:{program_name,
                 program_drivelink,
                 program_startdate, 
                 program_enddate,
                 program_donor,
                 program_description,
                 program_objectives,
                 program_activities,
                 program_goals,
                 program_beneficiaries,
                 buttonText}
        })
        .then(response =>{
            // console.log("BRAND Added to database successfully", response);
            setValues({...values, program_name:'', program_drivelink: '', 
            program_startdate:'', program_enddate:'',
            program_donor: '', program_description: '' , program_objectives:'' ,
            program_activities: '' , program_goals: '' ,program_beneficiaries: ''});
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
            <img src={`${url}/${logo}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newBrandForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Program Name</label>
                <input onChange={handleChange('program_name')} value={program_name} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Drive Link</label>
                <input onChange={handleChange('program_drivelink')} value={program_drivelink} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Program start_date</label>
                <input onChange={handleChange('program_startdate')} value={program_startdate} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Program end_date</label>
                <input onChange={handleChange('program_enddate')} value={program_enddate} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Donor</label>
                <input onChange={handleChange('program_donor')} value={program_donor} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('program_description')} value={program_description} type="textarea" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Objective</label>
                <textarea onChange={handleChange('program_objectives')} value={program_objectives} type="textarea" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Activities</label>
                <textarea onChange={handleChange('program_activities')} value={program_activities} type="textarea" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Goals</label>
                <textarea onChange={handleChange('program_goals')} value={program_goals} type="textarea" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Beneficiaries</label>
                <textarea onChange={handleChange('program_beneficiaries')} value={program_beneficiaries} type="textarea" className="form-control" required/>
            </div>
            

            {/* <div className='input-group mb-3'>
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
                </div> */}
                {/* <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-danger'>Expiry Date</span>
                            </div>
                            <input onChange={handleChange('expiryDate')} value={expiryDate} type="date" className="form-control"  />
                            
                        </div> */}

            <div className='mb-lg-5 mt-5'>
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
                <h1 className="p-5 text-center">Add Program</h1>
                {pic ? pictureBorder():null}
                {newBrandForm()}
            </div></div>
        </Layout>
    );
}

export default AddProgram;