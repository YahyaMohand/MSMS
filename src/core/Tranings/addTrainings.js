import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { isAuth } from '../../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner';


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const AddTraining = (params) => {
    const [discount, setDiscount] = useState()
    const trainingid = params.match.params.trainingid
    const [values, setValues] = useState({
        train_title: "",
        train_description: "",
        train_startdate: "",
        train_enddate: "",
        train_durationdays: "",
        train_durationshours: "",
        train_price: "",
        train_modality: "",
        train_formlink: "",
        train_type: "",
        programid:'',

        buttonText: "Submit"
    });

    const [pic, setPic] = useState(false)
    const [simage, setSimage] = useState()
    const [getName, setName] = useState()
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
            const res = await axios.post(`${url}/admin/trainings/upload/${userid}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });



            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });
            setSimage(filePath);
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
        train_title,
        train_description,
        train_startdate,
        train_enddate,
        train_durationdays,
        train_durationshours,
        train_price,
        train_modality,
        train_formlink,
        train_type,
        programid,
        buttonText } = values

    const handleChange = (sname) => (event) => {
        setValues({ ...values, [sname]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/trainings/create/${userid}`,
            data: {
                train_title,
                train_description,
                train_startdate,
                train_enddate,
                train_durationdays,
                train_durationshours,
                train_price,
                train_modality,
                train_formlink,
                train_type,
                programid,
                buttonText
            }
        })
            .then(response => {
                // console.log("Categories Added to database successfully", response);
                setValues({
                    ...values, train_title: "",
                    train_description: "",
                    train_startdate: "",
                    train_enddate: "",
                    train_durationdays: "",
                    train_durationshours: "",
                    train_price: "",
                    train_modality: "",
                    train_formlink: "",
                    train_type: "",
                    programid: '', buttonText: 'Submit'
                });
                toast.success(response.data.message);
            })
            .catch(error => {
                // console.log('Operation ERROR', error.response.data)
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            })
    };

    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${simage}`} alt="category pic" style={{ height: "200px" }} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

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
                setName()
            }
        }
        getUserInfo()

    },[])




    const newTrainingsForm = () => (
        <form onSubmit={clickSubmit}>

            <div className="form-group">
                <label className="text-muted">Trairing Title</label>
                <input list='type' onChange={handleChange('train_title')} value={train_title} type="text" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('train_description')} value={train_description} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Startdate</label>
                <input onChange={handleChange('train_startdate')} value={train_startdate} type="date" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Enddate</label>
                <input onChange={handleChange('train_enddate')} value={train_enddate} type="date" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Duration days</label>
                <input onChange={handleChange('train_durationdays')} value={train_durationdays} type="number" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Duration hours</label>
                <input onChange={handleChange('train_durationshours')} value={train_durationshours} type="number" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Training Price</label>
                <input onChange={handleChange('train_price')} value={train_price} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Modality</label>
                <textarea onChange={handleChange('train_modality')} value={train_modality} type="textarea" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Formlink</label>
                <input onChange={handleChange('train_formlink')} value={train_formlink} type="link" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Train Type</label>
                <input onChange={handleChange('train_type')} value={train_type} type="text" className="form-control" required />
            </div>

            <div className="col input-group mb-2">
            <label style={{ padding: '10px' }} className="text-muted">Program id</label>
                <select onChange={handleChange('programid')} value={programid} type='text' className="form-control">
                <option>Select one</option>
                    {getName?.map((item) => (
                        <option value={item.programid}>{item.program_name}</option>
                    ))}
                </select>
            </div>
            {/* <div className="form-group">
                <label className="text-muted">??????????</label>
                <select onChange={handleChange('method')} value={method} type="text" className="form-control" required >
                    <option>???????? ????????????????</option>
                    <option value='number'>?????? ????????????</option>
                    <option value='link'>????????</option>
                    <option value='email'>??????????</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">?????? ????????????</label>
                <select onChange={handleChange('type')} value={type} type="textarea" className="form-control" required>
                    <option>???????? ????????????????</option>
                    <option value='number'>?????? ????????????</option>
                    <option value='facebook'>?????? ??????</option>
                    <option value='instagram'>??????????????????</option>
                    <option value='whatsapp'>???????? ????</option>
                    <option value='tiktok'>?????? ??????</option>
                    <option value='telegram'>?????? ????????</option>
                    <option value='snapchat'>???????? ??????</option>
                    <option value='email'>??????????</option>
                    
                </select>
            </div>

           

            <div className="form-group">
                <label className="text-muted">?????????? ???? ????????????</label>
                <input onChange={handleChange('value')} value={value} type="text" className="form-control" required/>
            </div> */}


            <div>
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
                    {/* {isAuth() ? null : <Redirect to='/' />} */}
                    {/* {JSON.stringify({nameArabic,nameEnglish,logoPath})} */}
                    <h1 className="p-5 text-center">Add Training</h1>
                    {/* {pic ? pictureBorder() : null} */}
                    {newTrainingsForm()}
                </div></div>
        </Layout>
    );
}

export default AddTraining;