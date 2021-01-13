import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout';
import {isAuth} from '../../auth/helpers';
import {Redirect, Link} from 'react-router-dom';
import StyleCard from '../dashboard/stylescard'
import {ToastContainer, toast} from 'react-toastify';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

const ProductStyles = (params) => {

    const productid = params.match.params.productid

    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [styles, setProducts] = useState({})
    const [groups,setgroups]=useState({})
    const [groupbutton,setgroupbutton]=useState('Add to Group')
    const [selectedgroupid,setselectedgroupid]=useState()
    const [listedgroups, setlistedgroups]=useState()

    useEffect(()=>{
        axios.get(`${url}/admin/productstyles/${productid}/${userid}`)
        .then(res => {
            setProducts(res.data.styles)
            setgroups(res.data.groups)
            setlistedgroups(res.data.listedgroups)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setProducts({})
            setgroups({})
            setlistedgroups({})
            setError('Somthing went wrong')
        })
    }, [])

    const submitgroup = event =>{
        event.preventDefault()
        setgroupbutton('Adding')
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/groups/addproduct/${userid}`,
            data: {
               selectedgroupid,
               productid
                }
        })
        .then(response =>{
            // console.log("Product Added to database successfully", response);
            setgroupbutton('Add to Group')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            toast.error(error.response.data.error);
            setgroupbutton('Add to Group')
        })
    }

    const groupsform =() =>(
        <div>
            <form onSubmit={submitgroup}>
                <div className='form-group mt-4 mb-2'>
                    <div className="col input-group mb-3">
                        <div className='input-group-prepend'>
                            <span className='input-group-text btn-danger'>Groups List</span>
                        </div>
                        
                            <select onChange={(event)=>{setselectedgroupid(event.target.value)}} value={selectedgroupid} type="text" className="form-control" placeholder='groups' required>
                            <option value="0">Select Group</option>
                            {groups.map(({groupid, nameEnglish})=><option value={groupid}>{nameEnglish}</option>)}
                            </select>
                            <button className="btn btn-outline-success" type="submit">{groupbutton}</button>
                      
                    </div>
                </div>
            </form>
            <hr></hr>
        </div>
    )

    const Listgroupcards = ({listedgroups}) => {

        return(
        <div>
            <h3 className=' btn pl-3 pr-3 btn-dark mr-3'>{listedgroups.nameEnglish}</h3>
        </div>
        )
        
    }

    const listofgroups = ()=>(
        <div>
            <div className='row'>
            {listedgroups.map((listedgroups, i)=>(<Listgroupcards key={i} listedgroups={listedgroups}/>))}
        </div>
        <hr></hr>
        </div>
    )
    const productEditDelete = () =>(
        <div>
            <div className='row'>
                       <Link to={{
                           pathname: `/admin/products/update/${productid}`
                       }} className='col btn btn-outline-success m-1'>
                        Edit Product
                        </Link>
                        <Link to={{
                            pathname: `/admin/products/delete/${productid}`
                        }} className='col btn btn-outline-secondary m-1'>
                            Del. Product
                        </Link>
                    </div>
                    <div className='row mt-3'>
                    <Link to={{
                            pathname: `/admin/products/addstyle/${productid}`
                        }} className='col btn btn-warning p-3 m-1'>
                            Add Style
                        </Link>
                    </div>
                    
        </div>
    )
    const newProductsForm = () => (
        <div className='m-2 container-fluid mx-auto'>
            <div className='row'>
                {styles.map((styles, i)=>(<StyleCard key={i} styles={styles}/>))}
            </div>
        </div>
    )


    return (
        <Layout>
            <div className='container-fluid'>
            <div className="">
            {isAuth() ? null : <Redirect to='/'/>} 
            {/* {JSON.stringify({selectedgroupid,productid})} */}
            {error ? error : null}
            {loading ? null:groupsform()}
            {loading ? null: listofgroups()}
            {loading ? null:productEditDelete()}
            {loading ? loadingSpinner():newProductsForm()}
            {/* {JSON.stringify({products})} */}
            </div></div>
        </Layout>
    );
}

export default ProductStyles;

