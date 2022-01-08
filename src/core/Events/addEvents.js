import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../layout';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { isAuth } from '../../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import { useEffect } from 'react';


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const AddEvent = () => {

    const [values, setValues] = useState({
        event_type: '',
        event_name: '',
        event_description: '',
        event_place: '',
        event_durationdays: '',
        event_durationhours: '',
        event_startdate: '',
        event_enddate: '',
        event_partenrs: '',
        programid: '',
        buttonText: "Submit"
    });
    const [pic, setPic] = useState(false)
    const [logo, setLogo] = useState()
    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});
    const [getName, setName] = useState()

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }

    const onSubmitFile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(`${url}/admin/events/upload/${userid}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });



            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });
            setLogo(filePath);
            toast.success('Image uploaded to the server')
            setPic(true)
        } catch (err) {
            if (err.response.status === 500) {
                toast.error('There is a problem with the server');
            } else {
                toast.error(err.response.data.massage);
            }
        }
    }

    const {
        event_type,
        event_name,
        event_description,
        event_place,
        event_durationdays,
        event_durationhours,
        event_startdate,
        event_enddate,
        event_partenrs,
        programid,
        buttonText
    } = values

    const handleChange = (nameArabic) => (event) => {
        setValues({ ...values, [nameArabic]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/events/create/${userid}`,
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
                programid,
                buttonText
            }
        })
            .then(response => {
                // console.log("BRAND Added to database successfully", response);
                setValues({
                    ...values,
                    event_type: '',
                    event_name: '',
                    event_description: '',
                    event_place: '',
                    event_durationdays: '',
                    event_durationhours: '',
                    event_startdate: '',
                    event_enddate: '',
                    event_partenrs: '',
                    programid: ''
                });
                toast.success(response.data.message);
            })
            .catch(error => {
                // console.log('Operation ERROR', error.response.data)
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            })
    };


    const getAddresses = async () => {
        return await axios.get(`${url}/admin/programs/${userid}`);
    }

    useEffect(()=>{
        const getUserInfo = async () => {


            try {
                const responses = await Promise.all([getAddresses()]);
                let newState = responses[0].data.programs; // map your state here
                let comm = newState.map((e) => e)
                setName(comm); // and then update the state
            } catch (error) {
                console.error(error.message);
            }
        }
        getUserInfo()

    },[])
 


    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${logo}`} alt="category pic" style={{ height: "200px" }} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newBrandForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Activity type</label>
                <input list='type' onChange={handleChange('event_type')} value={event_type} type="text" className="form-control" required />
                <datalist id="type">
                    <option value="Session" />
                    <option value="Workshops" />
                    <option value="Webiners" />
                    <option value="Hackathon" />
                    <option value="Meeting" />
                    <option value="Program" />
                    <option value="Conferance" />

                </datalist>
            </div>
            <div className="form-group">
                <label className="text-muted">Activity name</label>
                <input onChange={handleChange('event_name')} value={event_name} type="text" className="form-control" required />
            </div>

            {/* <div className="form-group">
                <label className="text-muted">Program ID</label>
                <input onChange={handleChange('programid')} value={programid} type="text" className="form-control" required/>
            </div> */}

            <div className="col input-group mb-2">
            <label style={{ padding: '10px' }} className="text-muted">Program id</label>
                <select onChange={handleChange('programid')} value={programid} type='text' className="form-control">
                <option>Select one</option>
                    {getName?.map((item) => (
                        <option value={item.programid}>{item.program_name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">description</label>
                <input onChange={handleChange('event_description')} value={event_description} type="textarea" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Activity place</label>
                <textarea onChange={handleChange('event_place')} value={event_place} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Duration days</label>
                <textarea onChange={handleChange('event_durationdays')} value={event_durationdays} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Duration hours</label>
                <textarea onChange={handleChange('event_durationhours')} value={event_durationhours} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Start date</label>
                <input onChange={handleChange('event_startdate')} value={event_startdate} type="date" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">End date</label>
                <input onChange={handleChange('event_enddate')} value={event_enddate} type="date" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Partenrs</label>
                <textarea onChange={handleChange('event_partenrs')} value={event_partenrs} type="text" className="form-control" required />
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

            <div className='mb-lg-5 mt-5'>
                <button className="btn btn-primary">
                    {buttonText}
                </button>
            </div>
        </form>
    );


    return (
        <Layout>
            <div className='container'>
                <div className="col-d-6">
                    {/* <ToastContainer /> */}
                    {isAuth() ? null : <Redirect to='/' />}
                    {/* {JSON.stringify({nameArabic,nameEnglish,bio,logo})} */}
                    <h1 className="p-5 text-center">Add Event</h1>
                    {pic ? pictureBorder() : null}
                    {newBrandForm()}
                </div></div>
        </Layout>
    );
}

export default AddEvent;