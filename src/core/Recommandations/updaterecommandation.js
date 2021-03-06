import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../layout';
// import { Spinner} from 'react-bootstrap';
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

const UpdateRecommadation = (params) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const recommendationid = params.match.params.recommendationid
    const [recom_title, setRecom_title] = useState()
    const [recom_letter, setRecom_letter] = useState()
    const [recom_date, setRecom_date] = useState()
    const [recom_madeby, setRecom_madeby] = useState()
    const [communityid, setCommunityid] = useState()
    const [buttonText, setButtonText] = useState('Update')
    const [getName, setName] = useState()

    useEffect(() => {
        axios.get(`${url}/admin/recommendations/update/${recommendationid}/${userid}`)
            .then(res => {
                console.log(res.data)
                setRecom_title(res.data.recommendation.recom_title)
                setRecom_letter(res.data.recommendation.recom_letter)
                setRecom_date(res.data.recommendation.recom_date)
                setRecom_madeby(res.data.recommendation.recom_madeby)
                setCommunityid(res.data.recommendation.communityid)
                setError('')
                if (res.status == 200) {
                    setLoading(false)
                    getUserInfo()
                }
            })
            .catch(error => {
                setLoading(false)
                setRecom_title({})
                setRecom_letter({})
                setRecom_date({})
                setRecom_madeby({})
                setCommunityid({})
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


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/recommendations/update/${recommendationid}/${userid}`,
            data: {
                recom_title,
                recom_letter,
                recom_date,
                recom_madeby
            }
        })
            .then(response => {
                // console.log("Carousel Added to database successfully", response);
                setButtonText('Update')
                setRecom_title('')
                setRecom_letter('')
                setRecom_date('')
                setRecom_madeby('')
                setCommunityid('')
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


    const newRecommendationForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={(event) => { setRecom_title(event.target.value) }} value={recom_title} type="text" className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Letter</label>
                <input onChange={(event) => { setRecom_letter(event.target.value) }} value={recom_letter} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Date</label>
                <input onChange={(event) => { setRecom_date(event.target.value) }} value={recom_date} type="date" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Made by</label>
                <input onChange={(event) => { setRecom_madeby(event.target.value) }} value={recom_madeby} type="text" className="form-control" required />
            </div>

            <div className="col input-group mb-2">
            <label style={{ padding: '10px' }} className="text-muted">Community id</label>
                <select onChange={(event) => {
                    console.log(event.target.value)
                    setCommunityid(event.target.value)
                }} value={communityid} type='text' className="form-control">
                    <option>Select one</option>

                    {getName?.map((item) => (
                        <option value={item.communityid}>{item.com_name}</option>
                    ))}
                </select>
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


    return (
        <Layout>
            <div className='container-fluid'>
                <div className="">
                    {/* <ToastContainer /> */}
                    {isAuth() ? null : <Redirect to='/' />}
                    {/* {JSON.stringify({link,notes,image,itemid,nameArabic,nameEnglish,info,active})} */}
                    <h1 className="p-5 text-center">Update Recommendation</h1>
                    {error ? error : null}
                    {/* {loading ? loadingSpinner():pictureBorder()} */}
                    {loading ? loadingSpinner() : newRecommendationForm()}
                </div></div>
        </Layout>
    );
}

export default UpdateRecommadation;