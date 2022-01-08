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

const UpdateSuccess = (params) => {

    const storyid = params.match.params.storyid
    const [story_description, setStory_description] = useState()
    const [story_title, setStory_title] = useState()
    const [communityid, setCommunity] = useState()
    const [buttonText, setButtonText] = useState('Update')
    const [story_team, setStory_team] = useState()
    const [getName, setName] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    //bring now data of category
    useEffect(() => {
        axios.get(`${url}/admin/successstories/update/${storyid}/${userid}`)
            .then(res => {
                console.log(res.data)
                setStory_description(res.data.successstory.story_description)
                setStory_title(res.data.successstory.story_title)
                setStory_team(res.data.successstory.story_team)
                setCommunity(res.data.successstory.communityid)
                setError('')
                if (res.status == 200) {
                    setLoading(false)
                    getUserInfo()
                }
            })
            .catch(error => {
                setLoading(false)
                setError('Somthing went wrong')
                setStory_description({})
                setStory_title({})
                setStory_team({})
                setCommunity({})
            })
    }, [])



    const getAddresses = async () => {
        return await axios.get(`${url}/admin/community/${userid}`);
    }
    const getUserInfo = async () => {


        try {
            const responses = await Promise.all([getAddresses()]);
            let newState = responses[0].data.community; // map your state here
            let comm = newState.map((e) => e)
            setName(comm); // and then update the state
        } catch (error) {
            console.error(error.message);
            setName()
        }
    }

    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});

    // const onUpload = e => {
    //     setFile(e.target.files[0]);
    //     setFilename(e.target.files[0].name)
    // }

    // const onSubmitFile = async e => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     try {
    //         const res = await axios.post(`${url}/admin/categories/upload/${userid}`,
    //         formData,
    //         {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });

    //         const {fileName, filePath} = res.data;

    //         setUploadedFile({ fileName, filePath});
    //         setLogoPath(filePath);
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
            url: `${url}/admin/successstories/update/${storyid}/${userid}`,
            data: {
                communityid,
                story_description,
                story_title,
                story_team,
            }
        })
            .then(response => {
                setButtonText('Updated')
                toast.success(response.data.message);
            })
            .catch(error => {
                setButtonText('Update')
                toast.error(error.response.data.error);
            })
    };


    // const pictureBorder = () => (
    //     <div className='mb-5'>
    //         <img src={`${url}/${logoPath}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
    //     </div>
    // )

    const newSuccessForm = () => (

        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input onChange={(event) => { setStory_description(event.target.value) }} value={story_description} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={(event) => { setStory_title(event.target.value) }} value={story_title} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Team</label>
                <input onChange={(event) => { setStory_team(event.target.value) }} value={story_team} type="text" className="form-control" required />
            </div>
            {/* <div className="form-group">
                <label className="text-muted">Community id</label>
                <input onChange={(event) => { setStory_team(event.target.value) }} value={communityid} type="text" className="form-control" required />
            </div> */}

            <div className="col input-group mb-2">
            <label style={{ padding: '10px' }} className="text-muted">Community id</label>

                <select onChange={(event) => {
                    setCommunity(event.target.value)
                }} value={communityid} type='text' className="form-control">
                    <option>Select one</option>

                    {getName?.map((item) => (
                        <option value={item.communityid}>{item.com_name}</option>
                    ))}
                </select>
            </div>

            {/* <div className='input-group mb-3'>
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
                    {isAuth() ? null : <Redirect to='/' />}
                    {/* {JSON.stringify({nameArabic,nameEnglish,logoPath})} */}
                    <h1 className="p-5 text-center">Update Success story</h1>
                    {error ? error : null}
                    {/* {loading ? loadingSpinner():pictureBorder()} */}
                    {loading ? loadingSpinner() : newSuccessForm()}
                </div></div>
        </Layout>
    );
}

export default UpdateSuccess;