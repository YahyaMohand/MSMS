import React, {useState, useEffect, Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import ImageUploader from 'react-images-upload';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'
import Image from 'react-bootstrap/Image'
import "./products.css"
import Me from '../../components/styleComponent';


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function AllProduct(params) {
    const productid = params.match.params.productid
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [products, setProducts] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/products/${productid}/${userid}`)
        .then(res => {
            console.log(res.data)
            setProducts(res.data.products)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            console.log(error)
            setLoading(false)
            setProducts({})
            setError('Somthing went wrong')
        })
    }, [])



    
    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
        // console.log(file)
    }

    // const onSubmitFile = async e => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);
        
    //     try {
    //         const res = await axios.post(`${url}/admin/products/upload/${userid}`,
    //         formData,
    //         {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
            


    //         const {fileName, filePath} = res.data;
            
    //         setUploadedFile({ fileName, filePath});
    //         setImagePath(filePath);
    //         toast.success('Image uploaded to the server')

    //     } catch(err){
    //         if(err.response.status === 500){
    //             toast.error('There is a problem with the server');
    //         }else{
    //             toast.error(err.response.data.massage);
    //         }
    //     }
    // }



    // const pictureBorder = () => (
    //     <div className='mb-5'>
    //         <img src={`${url}/${imagePath}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
    //     </div>
    // )

    // const calculateMargins =()=>{
        
    //     setMargin(
    //         (1-(cost/price)).toFixed(2)
    //     )
    //     if((discountPrice)==(price)){
    //         setDiscountMargin(
    //             (1-(cost/discountPrice)).toFixed(2)
    //         )
    //         setDiscount(0)
    //     }else{
    //         setDiscountMargin(
    //             (1-(cost/discountPrice)).toFixed(2)
    //         )
    //         setDiscount(
    //             ((price-discountPrice)/price).toFixed(2)
    //         )
    //     }
    // }

    const ProductCard = () => {

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
            <div className='mt-2' >
            <ul  className='list-group'>
                <li  className='list-group-item' style={{backgroundColor:'#000000',color:'#ffffff', borderRadius:'25px', padding:"20px"}} >
                    <div className='row text-center font-weight-bold'>
                        <div  className='col'>
                            <p style={{fontSize:"18px"}} className='m-0'>Name</p>
                            <div className='col'><p style={{ color:"red",padding:"15px" }} className='m-0'>{products.product_name}</p></div>
                            </div>
                        <div className='col'>
                            <p style={{fontSize:"18px"}} className='m-0'>Material Used</p>
                            <div className='col'><p style={{ color:"red",padding:"15px" }} className='m-0'>{products.material_used}</p></div>
                            </div>
                        <div className='col'>
                            <p style={{fontSize:"18px"}} className='m-0'>Machine used</p>
                            <div className='col'><p style={{ color:"red",padding:"15px" }} className='m-0'>{products.machine_used}</p></div>
                            </div>
                        <div className='col'>
                            <p style={{fontSize:"18px"}} className='m-0'>Made by</p>
                            <div className='col'><p style={{ color:"red" ,padding:"15px"}} className='m-0'>{products.product_madeby}</p></div>
                            </div>
                      
                      
                    </div>
                </li>
                <hr></hr>
            </ul>

            <li className='list-group-item table  table-striped' style={{borderRadius:'25px'}}>
            {/* <img src={products.product_picture} style={{borderRadius:'50%'}} className='m-0 ml-2 mr-2'></img> */}

                <Image   style={{
                        alignSelf: 'center',
                        width: "60%",
                        marginLeft:"200px",
                        borderWidth: 1,
                        borderRadius: 75
                    }} src={products.product_picture} fluid />
                <div className='row text-center'>
                <div className='col'><p style={{fontSize:"30px",padding:"10px",fontFamily:"bold"}} className='m-0'>{products.product_description}</p></div>
                
                </div>
            </li>   

                  <Me
                      title="Price"
                      value={products.product_price}
                    />

                    <Me 
                      title="Cost"
                      value={products.product_cost}

                    />

                    <Me  
                      title="Work duration"
                      value = {products.product_workduration}

                    />

                    <Me 
                     title="Quantity"
                     value={products.product_quantity}

                    />


            {/* <div className='col'>
                            <p style={{fontSize:"18px"}} className='m-0'>Price</p>
                            <div className='col'><p style={{ color:"red",padding:"15px" }} className='m-0'>{products.product_price}</p></div>

                            </div>

                            <div className='col'>
                            <p style={{fontSize:"18px"}} className='m-0'>Cost</p>
                            <div className='col'><p style={{ color:"red",padding:"15px" }} className='m-0'>{products.product_cost}</p></div>

                            </div>

                            <div className='col'>
                            <p style={{fontSize:"18px"}} className='m-0'>Quantity</p>
                            <div className='col'><p style={{ color:"red",padding:"15px" }} className='m-0'>{products.product_quantity}</p></div>

                            </div>

                            <div className='col'>
                            <p style={{fontSize:"18px"}} className='m-0'>Work duration</p>
                            <div className='col'><p style={{ color:"red",padding:"15px" }} className='m-0'>{products.product_workduration}</p></div>

                            </div> */}

                </div>
            

            
        )
    }



    return(
        <Layout>
            <div className='container'>
            <div className="col-d-6">
            {/* <ToastContainer /> */}
                {isAuth() ? null : <Redirect to='/'/>} 
                <h1 className="p-5 text-center">Product</h1>
                {/* {pictureBorder()} */}
                {error ? error : null}
                {loading ? loadingSpinner():ProductCard()}
                
            </div></div>
        </Layout>
    );
    
    
}

export default AllProduct;