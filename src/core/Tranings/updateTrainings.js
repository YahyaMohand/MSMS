import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../layout';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { isAuth } from '../../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const UpdateTrainings = (params) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [getName, setName] = useState()
    const trainingid = params.match.params.trainingid
    const [train_title, setTrain_title] = useState()
    const [train_description, setTrain_description] = useState()
    const [train_startdate, setTrain_startdate] = useState()
    const [train_enddate, setTrain_enddate] = useState()
    const [train_durationdays, setTrain_durationdays] = useState()
    const [train_durationshours, setTrain_durationshours] = useState()
    const [train_price, setTrain_price] = useState()
    const [train_modality, setTrain_modality] = useState()
    const [train_formlink, setTrain_formlink] = useState()
    const [train_type, setTrain_type] = useState()
    const [programid, setProgramid] = useState()

    const [buttonText, setButtonText] = useState('Update')

    //bring now data of category
    useEffect(() => {
        axios.get(`${url}/admin/trainings/update/${trainingid}/${userid}`)
            .then(res => {
                console.log(res.data)
                setTrain_title(res.data.training.train_title)
                setTrain_description(res.data.training.train_description)
                setTrain_startdate(res.data.training.train_startdate)
                setTrain_enddate(res.data.training.train_enddate)
                setTrain_durationdays(res.data.training.train_durationdays)
                setTrain_durationshours(res.data.training.train_durationshours)
                setTrain_price(res.data.training.train_price)
                setTrain_modality(res.data.training.train_modality)
                setTrain_formlink(res.data.training.train_formlink)
                setTrain_type(res.data.training.train_type)
                setProgramid(res.data.training.programid)
                setError('')
                if (res.status == 200) {
                    setLoading(false)
                    getUserInfo()
                }
            })
            .catch(error => {
                setLoading(false)
                setTrain_title({})
                setTrain_description({})
                setTrain_startdate({})
                setTrain_enddate({})
                setTrain_durationdays({})
                setTrain_durationshours({})
                setTrain_price({})
                setTrain_modality({})
                setTrain_formlink({})
                setTrain_type({})
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
    //         const res = await axios.post(`${url}/admin/beautycenters/upload/${userid}`,
    //         formData,
    //         {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });

    //         const {fileName, filePath} = res.data;

    //         setUploadedFile({ fileName, filePath});
    //         setcimage(filePath);
    //         toast.success('Image uploaded to the server')
    //     } catch(err){
    //         if(err.response.status === 500){
    //             toast.error('There is a problem with the server');
    //         }else{
    //             toast.error(err.response.data.massage);
    //         }
    //     }
    // }


    // const {nameArabic, nameEnglish, buttonText} = values

    // const handleChange = (nameArabic) => (event) => {
    //     setValues({...values, [nameArabic]: event.target.value});
    // }

    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/trainings/update/${trainingid}/${userid}`,
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
                train_type
            }
        })
            .then(response => {
                setButtonText('Update')
                setTrain_title('')
                setTrain_description('')
                setTrain_startdate('')
                setTrain_enddate('')
                setTrain_durationdays('')
                setTrain_durationshours('')
                setTrain_price('')
                setTrain_modality('')
                setTrain_formlink('')
                setTrain_type('')
                setProgramid('')
                toast.success(response.data.message);
            })
            .catch(error => {
                setButtonText('Update')
                toast.error(error.response.data.error);
            })
    };


    const getAddresses = async () => {
        return await axios.get(`${url}/admin/programs/${userid}`);
    }
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


    // const pictureBorder = () => (
    //     <div className='mb-5'>
    //         <img src={`${url}/${cimage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
    //     </div>
    // )

    const newTrainingForm = () => (

        <form onSubmit={clickSubmit}>
            <ToastContainer position='bottom-right' />
            <div className="form-group">
                <label className="text-muted">Trairing Title</label>
                <input onChange={(event) => { setTrain_title(event.target.value) }} value={train_title} type="text" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={(event) => { setTrain_description(event.target.value) }} value={train_description} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Startdate</label>
                <input onChange={(event) => { setTrain_startdate(event.target.value) }} value={train_startdate} type="date" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Enddate</label>
                <input onChange={(event) => { setTrain_enddate(event.target.value) }} value={train_enddate} type="date" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Duration days</label>
                <input onChange={(event) => { setTrain_durationdays(event.target.value) }} value={train_durationdays} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Duration hours</label>
                <input onChange={(event) => { setTrain_durationshours(event.target.value) }} value={train_durationshours} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Training Price</label>
                <input onChange={(event) => { setTrain_price(event.target.value) }} value={train_price} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Modality</label>
                <textarea onChange={(event) => { setTrain_modality(event.target.value) }} value={train_modality} type="textarea" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Formlink</label>
                <input onChange={(event) => { setTrain_formlink(event.target.value) }} value={train_formlink} type="link" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Train Type</label>
                <input onChange={(event) => { setTrain_type(event.target.value) }} value={train_type} type="text" className="form-control" required />
            </div>

            <div className="col input-group mb-2">
            <label style={{ padding: '10px' }} className="text-muted">Program id</label>
                <select onChange={(event) => {
                    console.log(event.target.value)
                    setProgramid(event.target.value)
                }} value={programid} type='text' className="form-control">
                    <option>Select one</option>
                    {getName?.map((item) => (
                        <option value={item.programid}>{item.program_name}</option>
                    ))}
                </select>
            </div>


            {/* <div className="form-group">
                <label className="text-muted">?????????? ??????????????</label>
                <input onChange={(event)=>{setNameArabic(event.target.value)}} value={nameArabic} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">?????????? ????????????????????</label>
                <input onChange={(event)=>{setNameEnglish(event.target.value)}} value={nameEnglish} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">???????? ???? ????????????</label>
                <input onChange={(event)=>{setDescription(event.target.value)}} value={description} type="textarea" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">?????????? ??????????</label>
                <input onChange={(event)=>{setWorktime(event.target.value)}} value={worktime} type="textarea" className="form-control" required/>
            </div>


            <div className="form-group">
                <label className="text-muted">?????? ???????? ???????????????? ?????????????? (?????? ???????????? ???????? ??????????)</label>
                <input onChange={(event)=>{setOuserid(event.target.value)}} value={ouserid} type="text" className="form-control" />
            </div>

            <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>????????????????</span>
                            </div>
                            
                            <select onChange={(event)=>{setProvince(event.target.value)}} value={province} type="text" className="form-control" placeholder='provinces' required>
                            <option>???????? ????????????????</option>
                            <option value='Baghdad'>??????????</option>
                            <option value='Nineveh'>??????????</option>
                            <option value='Basra'>????????????</option>
                            <option value='Babil'>????????</option>
                            <option value='Erbil'>??????????</option>
                            <option value='Sulaymaniyah'>????????????????????</option>
                            <option value='Al Anbar'>??????????????</option>
                            <option value='Dhi Qar'>???? ??????</option>
                            <option value='Diyala'>??????????</option>
                            <option value='Kirkuk'>??????????</option>
                            <option value='Saladin'>???????? ??????????</option>
                            <option value='Najaf'>??????????</option>
                            <option value='Karbala'>????????????</option>
                            <option value='Wasit'>????????</option>
                            <option value='Al Qadisiyyah'>????????????????</option>
                            <option value='Duhok'>????????</option>
                            <option value='Maysan'>??????????</option>
                            <option value='Muthanna'>????????????</option>
                            </select>
                        </div>

            <div className="form-group">
                <label className="text-muted">?????? ??????????????</label>
                <input onChange={(event)=>{setCity(event.target.value)}} value={city} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">??????????????</label>
                <input onChange={(event)=>{setaddress(event.target.value)}} value={address} type="text" className="form-control" required/>
            </div>
            <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>Select Square Image</span>
                </div>
                <div className='custom-file'>
                    <input 
                    onChange={onUpload} 
                    // value={filename} 
                    type="file" className="custom-file-input" name='file'  id='fileupload' />
                    <label className='custom-file-label'>{filename}</label>
                </div>
                <div class="input-group-append">
                    <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
                </div>
            </div>*/}

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
                    {isAuth() ? null : <Redirect to='/' />}
                    {/* {JSON.stringify({nameArabic,nameEnglish,logoPath})} */}
                    <h1 className="p-5 text-center">Update Training</h1>
                    {error ? error : null}
                    {/* {loading ? loadingSpinner():pictureBorder()} */}
                    {loading ? loadingSpinner() : newTrainingForm()}
                </div></div>
        </Layout>
    );
}

export default UpdateTrainings;