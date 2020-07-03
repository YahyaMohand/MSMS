import React, {useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import {SketchPicker} from 'react-color';
// import ImageUploader from 'react-images-upload';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'


const url = 'https://www.kwaysidata.com'

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function AddStyle() {
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [products, setProducts] = useState({})
    const [pic,setPic]=useState(false)

    useEffect(()=>{
        axios.get(`${url}/admin/styles/create/${userid}`)
        .then(res => {
            
            setProducts(res.data.products)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setProducts({})
            setError('Somthing went wrong')
        })
    }, [])


    const [values, setValues] = useState({
        productid: "",
        name: "",
        color:'',
        cost:0,
        margin: 0,
        price: null,
        discountMargin:null,
        discount: 0,
        discountPrice:null,
        images: "",
        quantity:0,
        size:"",
        buttonText:"Submit"
    });
    //price calculation status
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [discountPrice, setDiscountPrice] = useState()
    const [images, setImages ] = useState()
  
    
    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
        console.log(file)
    }

    const onSubmitFile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const res = await axios.post(`${url}/admin/products/upload/${userid}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            


            const {fileName, filePath} = res.data;
            
            setUploadedFile({ fileName, filePath});
            setImages(filePath);
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

    const {productid,
    name,
    cost,
    margin,
    color,
    // price,
    discountMargin,
    // discount,
    // discountPrice,
    // imagePath,
    quantity,
    size,
    buttonText} = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/styles/create/${userid}`,
            data: {productid,
                name,
                cost,
                color,
                margin,
                price,
                discountMargin,
                discount,
                discountPrice,
                images,
                quantity,
                size,
                buttonText}
        })
        .then(response =>{
            // console.log("Product Added to database successfully", response);
            setValues({...values, buttonText: 'Submitted Add Style'});
            toast.success(response.data.massage);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${images}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const newAddStyleForm = () => (
        <form onSubmit={clickSubmit}>
            
                <div className='form-group'>   
                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Product</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={handleChange('productid')} value={productid} type="text" className="form-control" placeholder='Brands' required>
                            <option value='0'>Select Product</option>
                            {products.map(({productid, name})=><option value={productid}>{name}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div className='border-bottom border-maroon m-0'></div>
                </div>
                <div className='form-group'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Style (color) Name</span>
                        </div>
                        <input onChange={handleChange('name')} value={name} type="text" className="form-control" required /> 
                    </div>

                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>Color Hex code</span>
                            </div>
                            <input onChange={handleChange('color')} value={color} type="text" placeholder='#ffffff' className="form-control" required /> 
                        </div>
                        <div className='col'>
                            <input className="form-control" style={{backgroundColor: color}} disabled/>
                        </div>
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Quantity</span>
                        </div>
                        <input onChange={handleChange('quantity')} value={quantity} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Size</span>
                        </div>
                        <input onChange={handleChange('size')} value={size} type="text" className="form-control" required /> 
                    </div>
                </div>
                <label>Product Price - IQD</label>
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Cost</span>
                        </div>
                        <input onChange={handleChange('cost')} value={cost} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Margin</span>
                        </div>
                        <input onChange={handleChange('margin')} 
                        onKeyUpCapture={()=>setPrice(parseInt(cost/(1-margin)))}
                        value={margin} type="number" step='0.01' className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Price</span>
                        </div>
                        <input 
                        onChange={handleChange('price')}
                        value={price} type="number"  
                        className="form-control" disabled /> 
                    </div>
                </div>
                <label>Price Discount - IQD</label>
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Margin</span>
                            {/* <span className='input-group-text'>IQD</span> */}
                        </div>
                        <input 
                        onChange={handleChange('discountMargin')} 
                        onKeyUpCapture={()=>{if(discountMargin==0){setDiscountPrice(parseInt(price));}else{
                            setDiscountPrice(parseInt(Number((price-cost)/(margin/discountMargin))+Number(cost)));
                        }}}
                        onMouseLeave={()=>{setDiscount((Number(price)-Number(discountPrice))/Number(price));}}
                        
                        value={discountMargin} type="number" step='0.01' className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend '>
                            <span className='input-group-text badge-secondary'>Discount</span>
                        </div>
                        <input 
                        onChange={handleChange('discount')} 
                        
                        value={discount} type="number" className="form-control" disabled /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Price</span>
                        </div>
                        <input onChange={handleChange('discountPrice')} value={discountPrice} type="number" className="form-control" disabled /> 
                    </div>
                </div>
                
                
                <div className='input-group mb-3'>
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
                    <div class="input-group-append">
                        <button class="btn btn-outline-info" htmlFor='fileupload' onClick={onSubmitFile}>Upload</button>
                    </div>
                </div>
                


                <div>
                    <button className="btn btn-primary mb-5">
                        {buttonText}
                    </button>
                </div>
            </form>
    );


    return(
        <Layout>
            <div className='container'>
            <div className="col-d-6">
            <ToastContainer />
                {isAuth() ? null : <Redirect to='/'/>} 
                {/* {JSON.stringify({name,bio,city,street,x_cord,y_cord})} */}
                {JSON.stringify({productid,
                name,
                cost,
                color,
                margin,
                price,
                discountMargin,
                discount,
                discountPrice,
                images,
                quantity,
                size
                })}
                <h1 className="p-5 text-center">Add Style</h1>
                {pic ? pictureBorder():null}
                {error ? error : null}
                {loading ? 'Loading':newAddStyleForm()}
                
            </div></div>
        </Layout>
    );
    
    
}

export default AddStyle;