import React, {useState, useEffect } from 'react';
import {Link, Redirect,useHistory} from 'react-router-dom';
import Layout from '../layout';
import {SketchPicker} from 'react-color';
// import ImageUploader from 'react-images-upload';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function AddStyleByProduct(params) {
    const productid = params.match.params.productid
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [product, setProduct] = useState({})
    const [pic,setPic]=useState(false)
    const [cost,setCost]=useState(0)
    const [discountPrice,setDiscountPrice]=useState(0)
    const [price,setPrice]=useState(0)

    useEffect(()=>{
        axios.get(`${url}/admin/products/${productid}/${userid}`)
        .then(res => {
            
            setProduct(res.data.product)
            setCost(res.data.product.cost)
            setDiscountPrice(res.data.product.discountPrice)
            setPrice(res.data.product.price)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setProduct({})
            setError('Somthing went wrong')
        })
    }, [])


    const [values, setValues] = useState({
        // productid: "",
        name: "",
        color:'',
        // cost:0,
        margin: 0,
        // price: 0,
        discountMargin:0,
        discount: 0,
        priceType: 0,
        // discountPrice:0,
        images: "",
        quantity:0,
        size:"",
        ssnumber:0,
        buttonText:"Submit"
    });
    //price calculation status
    
    const [margin, setMargin] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [discountMargin, setdiscountMargin] = useState()
    const [images, setImages ] = useState()
    // const [priceType, setpriceType]=useState(0)
  
    
    //file upload 
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose Image')
    const [uploadedFile, setUploadedFile] = useState({});

    const onUpload = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
        // console.log(file)
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

    const {
    // productid,
    name,
    // cost,
    // margin,
    color,
    // price,
    // discountMargin,
    // discount,
    // discountPrice,
    // imagePath,
    priceType,
    quantity,
    size,
    ssnumber,
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
                priceType,
                discountMargin,
                discount,
                discountPrice,
                images,
                quantity,
                size,
                ssnumber,
                }
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


    const calculateMargins =()=>{
        
        setMargin(
            (1-(cost/price)).toFixed(2)
        )
        if((discountPrice)==(price)){
            setdiscountMargin(0)
            setDiscount(0)
        }else{
            setdiscountMargin(
                (1-(cost/discountPrice)).toFixed(2)
            )
            setDiscount(
                ((price-discountPrice)/price).toFixed(2)
            )
        }
    }

    const goBack =()=>(
        <div>
           <Link to={{
                        pathname: `/admin/productstyles/${productid}`
                        }} className='col-3 btn btn-danger m-1'>
                        Back
            </Link>
        </div>
    )
    const newAddStyleForm = () => (
        <form onSubmit={clickSubmit}>
            
                <div className='form-group'>   
                    <div className='row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Product ID</span>
                        </div>
                        <input  value={productid} type="text" className="form-control" disabled /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Product Name</span>
                        </div>
                        <input value={product.name} type="text" className="form-control" disabled /> 
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
                            <span className='input-group-text'>Serial Number</span>
                        </div>
                        <input onChange={handleChange('ssnumber')} value={ssnumber} type="text" className="form-control" required /> 
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
                <lable>Price in USD 0   /    in IQD 1</lable>
                <div className='form-row'>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>Price Type</span>
                        </div>
                        <input 
                        onChange={handleChange('priceType')} 
                        value={priceType}
                         type="number" min='0' max='1' className="form-control"  name='priceType' />
                    </div></div>
                <label>Product Price - $</label>
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Cost</span>
                        </div>
                        <input onChange={(event)=>{setCost(event.target.value)}} value={cost} type="number" step='0.01' className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Margin</span>
                        </div>
                        <input onChange={handleChange('margin')} 
                        // onKeyUpCapture={()=>setPrice(parseInt(cost/(1-margin)))}
                        value={margin} type="number" step='0.01' className="form-control" disabled /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Price</span>
                        </div>
                        <input 
                        onChange={(event)=>{setPrice(event.target.value)}}
                        value={price} type="number"  step='0.01'
                        className="form-control" required /> 
                    </div>
                </div>
                <label>Price Discount - $</label>
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Margin</span>
                            {/* <span className='input-group-text'>IQD</span> */}
                        </div>
                        <input 
                        onChange={handleChange('discountMargin')} 
                        // onKeyUpCapture={()=>{if(discountMargin==0){setDiscountPrice(parseInt(price));}else{
                            // setDiscountPrice(parseInt(Number((price-cost)/(margin/discountMargin))+Number(cost)));
                        // }}}
                        // onMouseLeave={()=>{setDiscount((Number(price)-Number(discountPrice))/Number(price));}}
                        
                        value={discountMargin} type="number" step='0.01' className="form-control" disabled /> 
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
                        <input onChange={(event)=>{setDiscountPrice(event.target.value)}} value={discountPrice} type="number" step='0.01' className="form-control" required /> 
                    </div>
                </div>
                <div className='row text-center mb-5'>
                    <button type='button' onClick={()=>calculateMargins()} className='btn btn-outline-danger btn-block'>claculate margins</button>
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
            {/* <ToastContainer /> */}
                {isAuth() ? null : <Redirect to='/'/>} 
                {/* {JSON.stringify({name,bio,city,street,x_cord,y_cord})} */}
                {/* {JSON.stringify({productid,
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
                })} */}
                {loading ? null : goBack()}
                <h1 className="p-5 text-center">Add Style</h1>
                {pic ? pictureBorder():null}
                {error ? error : null}
                {loading ? loadingSpinner():newAddStyleForm()}
                
            </div>
            </div>
        </Layout>
    );
    
    
}

export default AddStyleByProduct;