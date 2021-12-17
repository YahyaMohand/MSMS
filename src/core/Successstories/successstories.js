import React, { useEffect, useState } from 'react';
import Layout from '../layout';
import axios from 'axios';
import MainCategoriesCard from './maincategoriescard';
import SubCategoriesCard from './subcategoriescard';
import ClassCategoriesCard from './classcategoriescard'
import {isAuth} from '../../auth/helpers';
import {Redirect,Link} from 'react-router-dom';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import { FaUserEdit } from 'react-icons/fa';


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


const Successstories = () => {

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [successstories, setSuccessStories] = useState({})



    useEffect(()=>{
        axios.get(`${url}/admin/successstories/${userid}`)
        .then(res => {
            console.log(res.data)
            setSuccessStories(res.data.successstories)
            setError('')
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            setSuccessStories({})
            setError('Somthing went wrong')
        })
    }, [])

    const SuccessstoriesCard = ({successstories}) => {

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
                    pathname: `successstories/${successstories.storyid}`
                }}>
                <div className='row text-center'>
                    <div className='col'><p className='m-0'>{successstories.story_title}</p></div>
                    <div className='col'><p className='m-0'>{successstories.story_team}</p></div>
                  
                    <div className='col'><p className='m-0'>{successstories.communityid}</p></div>
                    <Link to={{
                        pathname: `successstories/update/${successstories.storyid}`
                    }}
                    // className='btn btn-warning'
                    ><FaUserEdit color='red' size='1.5em'/></Link>
                </div>
                </Link>
            </li>        
        )
    }


    const newSuccessStoriesForm = () => (
        <div className='mt-3'>
        <ul className='list-group'>
            <li className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px'}} >
                <div className='row text-center font-weight-bold'>
                    <div className='col'><p className='m-0'>Name</p></div>
                    <div className='col'><p className='m-0'>Team</p></div>
                    <div className='col'><p className='m-0'>CommunityId</p></div>
                  
                </div>
            </li>
            <hr></hr>
            {successstories.map((successstories, i)=>(<SuccessstoriesCard key={i} successstories={successstories}/>))}
        </ul>
        </div>
    )
    const printrecipt = ()=>{
        window.print()
    }
    const SuccessStoriesNav = ()=>(
        <div  className='mt-5 mb-5 ml-3 mr-3'>
            <div className='row'>
                <div className='col'>
                    <h3>Success Story</h3>
                </div>
            <div className='col'>
                    {/* <button className='btn btn-block btn-dark' onClick={()=>printrecipt()}>Add Success Stories</button> */}
                    <Link
                className='btn btn-block btn-dark'
                    to={{
                    pathname: `successstories/add`
                }}> Add Succes stories
                </Link>
                </div>
                {/* <div className='col'>
                    <button className='btn btn-block btn-success' onClick={()=>printrecipt()}>Add Using xlsx</button>
                </div> */}

                
            </div>

        </div>
    )


    return (
        <Layout>
            <div className='container-fluid'>
                {loading ? null:SuccessStoriesNav()}
                {isAuth() ? null : <Redirect to='/'/>}
                {error ? error : null}
                {loading ? loadingSpinner():newSuccessStoriesForm()}
            </div>
            

        </Layout>
    );
}
export default Successstories;