import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import CityCard from './addcommunity'
import axios from 'axios'
import {isAuth} from '../../auth/helpers';
import {Redirect,Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import {FaUserEdit} from 'react-icons/fa';

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
// console.log(userid)
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Community = () => {

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [community, setCommunity] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/community/${userid}`)
        .then(res => {
            console.log(res.data)
            setCommunity(res.data.community)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setCommunity({})
            setError('Somthing went wrong')
        })
    }, [])


    const CommunityCard = ({community}) => {

        function formatedDate(x){
            const birthday = new Date(x)
            const day = birthday.getDate();
            const mon = birthday.getMonth()+1;
            const year = birthday.getFullYear();
            return (`${day}/${mon}/${year}`);
        }
    
        function formatedTime(x){
            const birthday = new Date(x).toLocaleTimeString('en-IQ')
            return birthday
        }
    
    
        return(             
            <li className='list-group-item table  table-striped' style={{borderRadius:'25px'}}>
                <Link 
                style={{textDecoration: 'none', color: 'black'}}
                to={{
                    pathname: `community/${community.communityid}`
                }}>
                <div className='row text-center'>
                    <div className='col'><div className='row'>
                        <img src={community.com_picture} height='24px' width='24px' style={{borderRadius:'50%'}} className='m-0 ml-2 mr-2'></img>
                    {/* <div className='col'><p className='m-0'>{community.communityid}</p></div> */}
                    <p className='m-0 ml-1'>{community.com_name}</p></div></div>
                    <div className='col'><p className='m-0'>{community.com_email_1}</p></div>
                    <div className='col'><p className='m-0'>{community.com_phone_number_1}</p></div>
                    <div className='col'><p className='m-0'>{formatedDate(community.com_birthday)}</p></div>
                    <div className='col'><p className='m-0'>{community.com_degree}</p></div>
                    {/* <div className='col'><p className='m-0'>{community.com_degree}</p></div> */}
                    {/* <div className='col'><p className='m-0'>{community.com_specilization}</p></div> */}
                    {/* <div className='col'><p className='m-0'>{community.com_university}</p></div> */}
                    <div className='col'><p className='m-0'>{community.com_currentcity}</p></div>
                    <div className='col'><p className='m-0'>{community.com_gender}</p></div>
                    <div className='mr-2'>
                    <Link to={{
                        pathname: `community/update/${community.communityid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit  color='red' size='1.5em'/></Link>
                    
                    </div>
                    {/* <div className='col'><p className='m-0'>{community.com_position}</p></div> */}
                    {/* <div className='col'><p className='m-0'>{community.com_orgnization}</p></div> */}
                    {/* <div className='col'><p className='m-0'>{community.com_sector}</p></div> */}
                    {/* <div className='col'><Link to={{
                        pathname: `orders/suppliers/${orders.orderid}`
                    }}
                    className='btn btn-warning'
                    >Supplier</Link></div> */}
                </div>
                </Link>
            </li>        
        )
    }


    const newCommunityForm = () => (
        <div className='mt-3'>
        <ul className='list-group'>
            <li className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px'}} >
                <div className='row text-center font-weight-bold'>
                    {/* <div className='col'><p className='m-0'>pic</p></div> */}
                    <div className='col'><p className='m-0'>Name</p></div>
                    <div className='col'><p className='m-0'>Email</p></div>
                    <div className='col'><p className='m-0'>Phone No.</p></div>
                    <div className='col'><p className='m-0'>Birthday</p></div>
                    <div className='col'><p className='m-0'>Degree</p></div>
                    {/* <div className='col'><p className='m-0'>Specilization</p></div> */}
                    {/* <div className='col'><p className='m-0'>University</p></div> */}
                    <div className='col'><p className='m-0'>Address</p></div>
                    <div className='col'><p className='m-0'>Gender</p></div>
                   
                    {/* <div className='col'><p className='m-0'>Orgnization</p></div> */}
                    {/* <div className='col'><p className='m-0'>Sector</p></div> */}
                    {/* <div className='col'><p className='m-0'>University</p></div> */}
                </div>
            </li>
            <hr></hr>
            {community.map((community, i)=>(<CommunityCard key={i} community={community}/>))}
        </ul>
        </div>
    )
    const printrecipt = ()=>{
        window.print()
    }
    const communityNav = ()=>(
        <div  className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Community</h3>
                </div>
            <div className='col'>
            <Link 
                className='btn btn-block btn-dark'
                to={{
                    pathname: `community/add`
                }}>Add Recored</Link>
                
                </div>
                <div className='col'>
                    <button className='btn btn-block btn-success' onClick={()=>printrecipt()}>Add Using xlsx</button>
                </div>

                
            </div>

        </div>
    )

    return (
        <Layout>
            <div className='container-fluid'>
            
            {loading ? null:communityNav()}
            {isAuth() ? null : <Redirect to='/'/>}
            {error ? error : null}
            {loading ? loadingSpinner():newCommunityForm()}
            {/* <h1>Community page</h1> */}
</div>
        </Layout>
    );
}

export default Community;