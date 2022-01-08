import React, {useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner';


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const AddAttended = (params) => {
    const [discount, setDiscount] = useState()
    const trainingid = params.match.params.trainingid
    const [values, setValues] = useState({
        communityid:"",
        student_createdby:"",
        student_editedby:"",

        buttonText:"Submit"
    });


    const [getNameCom, setNameCom] = useState()
    const [getNameTrain, setNameTrain] = useState()
    const [pic, setPic]=useState(false)
    const [simage, setSimage ] = useState()
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
            


            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            setSimage(filePath);
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


    const {
        communityid,
        student_createdby,
        student_editedby,
        buttonText} = values

    const handleChange = (sname) => (event) => {
        setValues({...values, [sname]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/trainings/addstudent/${trainingid}/${userid}`,
            data: {
                communityid,
                student_createdby,
                student_editedby,
                buttonText}
        })
        .then(response =>{
            // console.log("Categories Added to database successfully", response);
            setValues({...values,
            communityid:"",
            student_createdby:"",
            student_editedby:"",
            buttonText: 'Submit'});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };


    const getCommunity = async () => {
        return await axios.get(`${url}/admin/community/${userid}`);
    }
    const getTraining = async () => {
        return await axios.get(`${url}/admin/trainings/${userid}`)
    }


        useEffect(()=> {
            const getUserInfo = async () => {
                try {
            const responses = await Promise.all([getCommunity(), getTraining()]);
            let comm = responses[0].data.community;
            let start = responses[1].data.trainings;
            let Community = comm.map((e) => e)
            let Training = start.map((e) => e)
            setNameCom(Community)
            setNameTrain(Training)
            } catch (error) {
                console.error(error.message);
            }}
            getUserInfo()

        },[])
        

    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${simage}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

  

    const newAttForm = () => (
        <form onSubmit={clickSubmit}>

<div className="col input-group mb-2">
                <label style={{ padding: '10px' }} className="text-muted">Training id</label>
                <select onChange={handleChange('trainingid')} value={trainingid} type='text' className="form-control">
                <option>Select one</option>
                    {getNameTrain?.map((item) => (
                        <option value={item.trainingid}>{item.train_title}</option>
                    ))}
                </select>
            </div>

            <div className="col input-group mb-2">
                <label style={{ padding: '10px' }} className="text-muted">Community id</label>
                <select onChange={handleChange('communityid')} value={communityid} type='text' className="form-control">
                <option>Select one</option>
                    {getNameCom?.map((item) => (
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


    return(
        <Layout>
            <div className='container'>
            <div className="col-d-6">
                {/* <ToastContainer /> */}
                {isAuth() ? null : <Redirect to='/'/>} 
                {/* {JSON.stringify({nameArabic,nameEnglish,logoPath})} */}
                <h1 className="p-5 text-center">Add Student</h1>
                {pic ? pictureBorder(): null}
                { newAttForm()}
            </div></div>
        </Layout>
    );
}

export default AddAttended;




