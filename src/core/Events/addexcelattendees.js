import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import XLSX from 'xlsx';
import { set } from 'date-fns';
import { toast } from 'react-toastify';

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function numcoma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatedDate(x){
    const birthday = new Date(x)
    const day = birthday.getDate();
    const mon = birthday.getMonth()+1;
    const year = birthday.getFullYear();
    return (`${day}/${mon}/${year}`);
}

const AddExcelAttendees = (params) => {

    const eventid = params.match.params.eventid
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [Array, setArray] = useState({})
    const [state, setState] = useState('')
    const [data, setData] = useState();


    // useEffect(()=>{
    //     axios.get(`${url}/admin/beautycenters/one/${centerid}/${userid}`)
    //     .then(res => {
    //         console.log(res.data)
    //         setBeautycenters(res.data.beautycenters)
    //         setBccontacts(res.data.bccontacts)
    //         setBcservices(res.data.bcservices)
    //         setBcstaff(res.data.bcstaff)
    //         setError('')
    //         if(res.status ===200){
    //             setLoading(false)
    //         }
            
    //     })
    //     .catch(error => {
    //         setLoading(false)
    //         setBeautycenters({})
    //         setBccontacts({})
    //         setBcservices({})
    //         setBcstaff({})
    //         setError('Somthing went wrong')
    //     })
    // }, [])


    const SendArray= (e) =>{
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${url}/admin/events/addarrayattendee/${eventid}/${userid}`,
            data: data
        }).then(res=>{
            toast.success(res.data.message);
        }).catch(error => {
            toast.error(error.res.data.error)
        })
    }



    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "json" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                console.log(json);
                setData(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }


    const addExcelform =()=>(
        <div>
             
               



                <form >
                    <div className='mb-3'>
                    <label className='form-label' htmlFor="upload">Upload File</label>
                    <input 
                        className='form-control'
                        type="file"
                        itemID='upload'
                        
                        id="upload"
                        onChange={readUploadFile}
                    /></div>
                </form>

                <div className='col'>
                <button className='btn btn-block btn-success' onClick={(event)=>{SendArray(event)}}>Confirm and save the data</button>
                    {/* <Link
                        className='btn btn-block btn-dark'
                        to={{
                            pathname: `students/${trainingid}`
                        }} > Add Student
                    </Link> */}
                    {/* <input onClick={readUploadFile} type='file' className='btn btn-block btn-success'>Add Student xlsx</input> */}
                </div>
                <hr className='m-3'></hr>

                <table className="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && (data.map((item) => (
                            <tr>
                                <th scope="row">{item?.__rowNum__}</th>
                                <td>{item.com_name}</td>
                                <td>{item.com_email_1}</td>
                                <td>{item.com_gender}</td>
                            </tr>
                        )))}

                    </tbody>
                </table>

      
    
        </div>
    )
   

   

   


    

   


  

    return (
        <Layout>
            <div className='container-fluid'>
            {isAuth() ? null : <Redirect to='/'/>} 
            <h1 className='text-center m-lg-5'>Add Student Excel Sheet</h1>
            {error ? error : null}
            {addExcelform()}
            <hr className='mt-5'></hr>
            </div>
        </Layout>
    );
}

export default AddExcelAttendees;