import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { isAuth } from '../../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const AddSuccessStory = () => {

    const [values, setValues] = useState({
        story_description: "",
        story_title: "",
        story_team: "",
        communityid: "",
        buttonText: "Submit"
    });

    const [pic, setPic] = useState(false)
    const [logoPath, setLogoPath] = useState()
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
            const res = await axios.post(`${url}/admin/categories/upload/${userid}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });



            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });
            setLogoPath(filePath);
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
        story_description,
        story_title,
        story_team,
        communityid,
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
            url: `${url}/admin/successstories/create/${userid}`,
            data: {
                story_description,
                story_title,
                story_team,
                communityid,
                buttonText
            }
        })
            .then(response => {
                // console.log("Categories Added to database successfully", response);
                setValues({
                    ...values,
                    story_description: "",
                    story_title: "",
                    story_team: "",
                    communityid: "",
                    buttonText: 'Submitted'
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
        return await axios.get(`${url}/admin/community/${userid}`);
    }

    useEffect(()=>{
        const getUserInfo = async () => {

            try {
                const responses = await Promise.all([getAddresses()]);
                let newState = responses[0].data.community; // map your state here
                let comm = newState.map((e) => e)
                setName(comm); // and then update the state
                console.log(comm)
            } catch (error) {
                console.error(error.message);
            }
        }
        getUserInfo()
    },[])





    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${logoPath}`} alt="category pic" style={{ height: "200px" }} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )



    const newSuccessStoriesForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={handleChange('story_title')} value={story_title} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <input onChange={handleChange('story_description')} value={story_description} type="text" className="form-control" required />
            </div>

            <div className="form-group">
                <label className="text-muted">Team</label>
                <input onChange={handleChange('story_team')} value={story_team} type="text" className="form-control" required />
            </div>

            {/* <div className="form-group">
                <label className="text-muted">Community id</label>
                <input onChange={handleChange('communityid')} value={communityid} type="text" className="form-control" required/>
            </div> */}

            {/* <div className='col input-group mb-5'>
            <div className='input-group-prepend'>
                <span className='input-group-text badge-dark'>Community id</span></div>
            <select onChange={handleChange('communityid')} value={communityid} type="text" className="form-control">
                <option value="">Select one</option>
                <option value="1"></option>
                <option value="2">MOSUL SPACE</option>
            </select>
        </div> */}

            {/* {
         getName?.map((item) => (
        // <li key={item.communityid}>{item.communityid}
        // {item.com_name}
        // </li>
        <select type="text" className="form-control">
         <option value={item.com_name}>{item.com_name}</option>         
    </select>
      ))} */}

            <div className="col input-group mb-2">
                <label style={{ padding: '10px' }} className="text-muted">Community id</label>

                <select onChange={handleChange('communityid')} type='text' className="form-control">
                    <option>Select one</option>
                    {getName?.map((item) => (
                        <option value={item.communityid}>{item.com_name}</option>
                    ))}
                </select>
            </div>





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
                    <h1 className="p-5 text-center">Add Success stories</h1>
                    {/* {pic ? pictureBorder(): null} */}
                    {newSuccessStoriesForm()}
                </div></div>
        </Layout>
    );
}

export default AddSuccessStory;