import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../layout';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { isAuth } from '../../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const AddRecommandation = () => {

    const [values, setValues] = useState({
        recom_title: "",
        recom_letter: "",
        recom_date: "",
        recom_madeby: "",
        communityid: "",
        buttonText: "Submit"
    });
    const [getName, setName]  = useState()


    const getAddresses = async () => {
        return await axios.get(`${url}/admin/community/${userid}`);
    }
    useEffect(()=> {
        const getUserInfo = async () => {
            try {
        const responses = await Promise.all([getAddresses()]);
        let comm = responses[0].data.community;
        let Community = comm.map((e) => e)
        setName(Community)
        console.log(Community)
        } catch (error) {
            console.error(error.message);
        }}
        getUserInfo()

    },[])

    const {
        recom_title,
        recom_letter,
        recom_date,
        recom_madeby,
        communityid,
        buttonText
    } = values

    const handleChange = (link) => (event) => {
        setValues({ ...values, [link]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, buttonText: 'submitting' })
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/recommendations/create/${userid}`,
            data: {
                recom_title,
                recom_letter,
                recom_date,
                recom_madeby,
                communityid
            }
        })
            .then(response => {
                // console.log("Carousel Added to database successfully", response);
                setValues({
                    ...values,
                    recom_title: "",
                    recom_letter: "",
                    recom_date: "",
                    recom_madeby: "",
                    communityid: "",
                    buttonText: 'Submitted'
                });
                toast.success(response.data.message);
            })
            .catch(error => {
                // console.log('Operation ERROR', error.response.data)
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
                console.log(error)
            })
    };


    // const pictureBorder = () => (
    //     <div className='mb-5'>
    //         <img src={`${url}/${image}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
    //     </div>
    // )

    const newRecommandationForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={handleChange('recom_title')} value={recom_title} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Letter</label>
                <input onChange={handleChange('recom_letter')} value={recom_letter} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Date</label>
                <input onChange={handleChange('recom_date')} value={recom_date} type="date" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Made by</label>
                <input onChange={handleChange('recom_madeby')} value={recom_madeby} type="text" className="form-control" required />
            </div>

            <div className="col input-group mb-2">
            <label style={{ padding: '10px' }} className="text-muted">Community id</label>
                <select onChange={handleChange('communityid')} value={communityid} type='text' className="form-control">
                <option>Select one</option>
                    {getName?.map((item) => (
                        <option value={item.communityid}>{item.com_name}</option>
                    ))}
                </select>
            </div>


            {/* <div className="form-group">
                <label className="text-muted">Notes to help mobile app understand</label>
                <select onChange={handleChange('notes')} value={notes}  type="text" className="form-control"  required>
                    <option>selecte item ...</option>
                    <option>group</option>
                    <option>product</option>
                    <option>category</option>
                    <option>subcategory</option>
                    <option>classcategory</option>
                    <option>brand</option>
                </select>
            </div> */}

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
            <div className='container'>
                <div className="col-d-6">
                    {/* <ToastContainer /> */}
                    {isAuth() ? null : <Redirect to='/' />}
                    {/* {JSON.stringify({link,image,notes,nameArabic,nameEnglish,active,info,itemid})} */}
                    <h1 className="p-5 text-center">Add Recommendations</h1>
                    {/* {pic ? pictureBorder():null} */}
                    {newRecommandationForm()}
                </div></div>
        </Layout>
    );
}

export default AddRecommandation;