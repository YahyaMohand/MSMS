import React, {useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Spinner } from 'react-bootstrap';
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

const OUpdateBeautycenter = (params) => {

    const centerid = params.match.params.centerid
    const [nameArabic, setNameArabic] =useState()
    const [nameEnglish, setNameEnglish] = useState()
    const [buttonText, setButtonText] = useState('Update')
    const [description,setDescription]=useState()
    // const [ouserid,setOuserid]=useState()
    const [city, setCity]=useState()
    const [province,setProvince]=useState()
    const [address,setaddress]=useState()
    const [cimage,setcimage]=useState()
    const [worktime, setWorktime]=useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    //bring now data of category
    useEffect(()=>{
        axios.get(`${url}/beautycenters/updateid/${centerid}/${userid}`)
        .then(res => {
            setNameArabic(res.data.beautycenters.nameArabic)
            setNameEnglish(res.data.beautycenters.nameEnglish)
            setaddress(res.data.beautycenters.address)
            setcimage(res.data.beautycenters.cimage)
            setCity(res.data.beautycenters.city)
            setProvince(res.data.beautycenters.province)
            setDescription(res.data.beautycenters.description)
            setWorktime(res.data.beautycenters.worktime)
            // setOuserid(res.data.beautycenters.userid)
            setError('')
            if(res.status==200){
                setLoading(false)
              }
        })   
        .catch(error => {
            setLoading(false)
            setNameArabic({})
            setNameEnglish({})
            setaddress({})
            setcimage({})
            setCity({})
            setProvince({})
            setDescription({})
            setWorktime({})
            // setOuserid({})
            setError('Somthing went wrong')
        })
    }, [])




    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [filesize, setFilesize]=useState()
    const [uploadedFile, setUploadedFile] = useState({});

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
        setFilesize(e.target.files[0].size)
    }

    const onSubmitFile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        if(filesize < 265000){
        try {
            const res = await axios.post(`${url}/beautycenters/upload/${userid}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            setcimage(filePath);
            toast.success('Image uploaded to the server')
        } catch(err){
            if(err.response.status === 500){
                toast.error('There is a problem with the server');
            }else{
                toast.error(err.response.data.massage);
            }
        }
        }else{
            toast.error('?????? ???????????? ???????? ???? 250 ????????????????');
        }
    }


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
            url: `${url}/beautycenters/update/${centerid}/${userid}`,
            data: {nameArabic, nameEnglish,cimage,address,city,province,description,worktime}
        })
        .then(response =>{
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
            setButtonText('Update')
            toast.error(error.response.data.error);
        })
    };


    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${cimage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newCategoryForm = () => (

        <form onSubmit={clickSubmit}>
           
            <div className="form-group">
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

            {/* <div className="form-group">
                <label className="text-muted">?????? ???????? ???????????????? ?????????????? (?????? ???????????? ???????? ??????????)</label>
                <input onChange={(event)=>{setOuserid(event.target.value)}} value={ouserid} type="text" className="form-control" />
            </div> */}

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
                    <span className='input-group-text'>???????? ???????????? ???????? ?????????? ??????????????</span>
                </div>
                <div className='custom-file'>
                    <input 
                    onChange={onUpload} 
                    // value={filename} 
                    type="file" className="custom-file-input" name='file' accept='image/*'  id='fileupload' />
                    <label className='custom-file-label'>{filename}</label>
                </div>
                <div class="input-group-append">
                    <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>?????? ????????????</button>
                </div>
            </div>

            <div>
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
                {isAuth() && isAuth().bcowner == 1 ? null : <Redirect to='/'/>} 
                {/* {JSON.stringify({nameArabic,nameEnglish,logoPath})} */}
                <h1 className="p-5 text-center">?????????? ?????????????? ???????? ??????????????</h1>
                {error ? error : null}
                {loading ? loadingSpinner():pictureBorder()}
                {loading ? loadingSpinner():newCategoryForm()}
            </div></div>
        </Layout>
    );
}

export default OUpdateBeautycenter;