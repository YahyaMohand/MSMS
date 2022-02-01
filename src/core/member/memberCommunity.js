import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Layout from '../layout';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { isAuth } from '../../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie';

const url = process.env.REACT_APP_NODE


const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


const AddMemberCommunity = (params) => {
    const membershipsrentid = params.match.params.membershipsrentid
    const [values, setValues] = useState({
        communityid: "",
        buttonText: "Submit"
    });

    const {
        communityid,
        buttonText
    } = values

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [getNameCom, setNameCom] = useState()
    const [getNameStart, setNameStart] = useState()

    const handleChange = (val) => (event) => {
        setValues({ ...values, [val]: event.target.value });
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, buttonText: 'Submitting' })
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/membershipsrent/membershipsrentcommunity/${membershipsrentid}/${userid}`,
            data: {
                communityid,
                buttonText
            }
        })
            .then(response => {
                // console.log("STORE Added to database successfully", response);
                setValues({
                    ...values,
                    communityid: "",
                });
                toast.success(response.data.message);
            })
            .catch(error => {
                // console.log('Operation ERROR', error.response.data)
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            })
    };

    const getCommunity = async () => {
        return await axios.get(`${url}/admin/community/${userid}`);
    }
    const getMember = async () => {
        return await axios.get(`${url}/admin/membershipsrent/${userid}`)
    }

    useEffect(()=>{
        const getUserInfo = async () => {

            try {
                const responses = await Promise.all([getCommunity(), getMember()]);
                let comm = responses[0].data.community;
                let member = responses[1].data.membershipsrents;
                let Community = comm.map((e) => e)
                let Member = member.map((e) => e)
                setNameCom(Community)
                setNameStart(Member)
            } catch (error) {
                console.error(error.message);
            }
        }
    
        getUserInfo()
    },[])



    const newSuCForm = () => (
        <form onSubmit={clickSubmit}>


            <div className="col input-group mb-2">
                <label style={{ padding: '10px' }} className="text-muted">Membership id</label>
                <select onChange={handleChange('membershipsrentid')} value={membershipsrentid} type='text' className="form-control">
                <option>Select one</option>
                    {getNameStart?.map((item) => (
                        <option value={item.membershipsrentid}>{item.mem_teamname}</option>
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


    return (
        <Layout>
            <div className='container'>
                <div className="col-d-6">
                    {/* <ToastContainer /> */}
                    {isAuth() ? null : <Redirect to='/' />}
                    {/* {JSON.stringify({nameArabic,nameEnglish,bio,logo})} */}
                    <h1 className="p-5 text-center">Add Membership Team</h1>
                    {/* {pic ? pictureBorder():null} */}
                    {newSuCForm()}
                </div></div>
        </Layout>
    );
}

export default AddMemberCommunity;