import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import { isAuth } from '../../auth/helpers';
import { Redirect, Link } from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import { FaUserEdit } from 'react-icons/fa';
import Me from '../../components/styleComponent';
import Image from "react-bootstrap/Image"
import "../products/products.css"
import XLSX from 'xlsx';
import { set } from 'date-fns';
import { toast } from 'react-toastify';




const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


const AllTrainings = (params) => {
    const trainingid = params.match.params.trainingid
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [brand, setTrainings] = useState({})
    const [Array, setArray] = useState({})
    const [state, setState] = useState('')
    const [data, setData] = useState();


    useEffect(() => {
        axios.get(`${url}/admin/trainings/${trainingid}/${userid}`)
            .then(res => {
                console.log(res.data)
                setTrainings(res.data.brand)
                setError('')
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setTrainings({})
                setError('Somthing went wrong')
                console.log(error)

            })
    }, [])


    const SendArray= (e) =>{
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${url}/admin/trainings/addarrayattendee/${trainingid}/${userid}`,
            data: data
        }).then(res=>{
            toast.success(res.data.message);
        }).catch(error => {
            toast.error(error.res.data.error)
        })
    }





    const TrainingsCard = () => {

        function formatedDate(x) {
            const birthday = new Date(x)
            const day = birthday.getDate();
            const mon = birthday.getMonth() + 1;
            const year = birthday.getFullYear();
            return (`${day}/${mon}/${year}`);
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

        function formatedTime(x) {
            const birthday = new Date(x).toLocaleTimeString('en-IQ')
            return birthday
        }

        return (
            <div className='mt-2' >
                <ul className='list-group'>
                    <li className='list-group-item' style={{ backgroundColor: '#000000', color: '#ffffff', borderRadius: '25px', padding: "20px" }} >
                        <div className='row text-center font-weight-bold'>
                            <div className='col'>
                                <p style={{ fontSize: "18px" }} className='m-0'>Title</p>
                                <div className='col'><p style={{ color: "red", padding: "15px" }} className='m-0'>{brand.train_title}</p></div>
                            </div>
                            <div className='col'>
                                <p style={{ fontSize: "18px" }} className='m-0'>Train Type</p>
                                <div className='col'><p style={{ color: "red", padding: "15px" }} className='m-0'>{brand.train_type}</p></div>
                            </div>
                            <div className='col'>
                                <p style={{ fontSize: "18px" }} className='m-0'>Program ID</p>
                                <div className='col'><p style={{ color: "red", padding: "15px" }} className='m-0'>{brand.programid}</p></div>
                            </div>

                        </div>
                    </li>
                    <hr></hr>
                </ul>

                <li className='list-group-item table  table-striped' style={{ borderRadius: '25px' }}>
                    {/* <img src={products.product_picture} style={{borderRadius:'50%'}} className='m-0 ml-2 mr-2'></img> */}

                    <Image style={{
                        alignSelf: 'center',
                        width: "50%",
                        marginLeft: "400px",
                        borderWidth: 1,
                        borderRadius: 75
                    }} src="https://www.totalsuccess.co.uk/wp-content/uploads/2018/06/in-ttt.png" fluid />
                    <div className='row text-center'>
                        <hr></hr>
                        <hr></hr>
                        <div className='col'><p style={{ fontSize: "30px", padding: "10px", fontFamily: "Arial Black" }} className='m-0'>{brand.train_description}</p></div>

                    </div>
                </li>

                <Me
                    title="Start date"
                    value={brand.train_startdate}
                />

                <Me
                    title="End date"
                    value={brand.train_enddate}

                />

                <Me
                    title="Duration days"
                    value={brand.train_durationdays}

                />

                <Me
                    title="Duration hours"
                    value={brand.train_durationshours}

                />

                <Me
                    title="Training Price"
                    value={brand.train_price}

                />

                <Me
                    title="Modality"
                    value={brand.train_modality}

                />

                <Me
                    title="Train Type"
                    value={brand.train_type}

                />
                {/* {data && (data.map((item) => (
                    <div>{item.title}</div>
                )))} */}
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && (data.map((item) => (
                            <tr>
                                <th scope="row">{item?.__rowNum__}</th>
                                <td>{item.name}</td>
                            </tr>
                        )))}

                    </tbody>
                </table>
                <div className='col'>
                <button className='btn btn-block btn-dark' onClick={(event)=>{SendArray(event)}}>Add Attendce</button>
                    {/* <Link
                        className='btn btn-block btn-dark'
                        to={{
                            pathname: `students/${trainingid}`
                        }} > Add Student
                    </Link> */}
                    {/* <input onClick={readUploadFile} type='file' className='btn btn-block btn-success'>Add Student xlsx</input> */}
                </div>



                <form >
                    <label htmlFor="upload">Upload File</label>
                    <input
                        type="file"
                        name="upload"
                        id="upload"
                        onChange={readUploadFile}
                    />
                </form>

            </div>
        )
    }

    return (
        <Layout>
            <div className='container-fluid'>
                <div className="col-d-6">

                    {/* {loading ? null:TrainingNav()} */}
                    {isAuth() ? null : <Redirect to='/' />}
                    <h1 className="p-5 text-center">Training</h1>
                    {error ? error : null}
                    {loading ? loadingSpinner() : TrainingsCard()}
                </div>
            </div>
        </Layout>
    );
}

export default AllTrainings;