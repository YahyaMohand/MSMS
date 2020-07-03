import React, {useState, useEffect } from 'react';
import { Redirect} from 'react-router-dom';
import Layout from '../layout';
// import {SketchPicker} from 'react-color';
// import ImageUploader from 'react-images-upload';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../../components/loadingspinner'


const url = 'https://www.kwaysidata.com'

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function UpdateStyle(params) {

    const styleid = params.match.params.styleid
    const [productid, setProductid]=useState()
    const [name, setName] = useState()
    const [color,setColor] = useState()
    const [cost, setCost] = useState()
    const [margin, setMargin] = useState()
    const [discountMargin,setDiscountMargin]= useState()
    const [quantity, setQuantiy] = useState()
    const [size, setSize] = useState()
    const [buttonText, setButtonText] = useState('Update')

    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [discountPrice, setDiscountPrice] = useState()
    const [images, setImages ] = useState()
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [products, setProducts] = useState({})


    useEffect(()=>{
        axios.get(`${url}/admin/styles/create/${userid}`)
        .then(res => {
            setProducts(res.data.products)
            setError('')
            // setLoading(false)
        })   
        .catch(error => {
            // setLoading(false)
            setProducts({})
            setError('Somthing went wrong')
        })

       
        axios.get(`${url}/admin/styles/${styleid}/${userid}`)
        .then(res => {
            console.log('first effect store data',res.data.style)
            setProductid(res.data.style.productid)
            setColor(res.data.style.color)
            setName(res.data.style.name)
            setCost(res.data.style.cost)
            setMargin(res.data.style.margin)
            setPrice(res.data.style.price)
            setDiscountMargin(res.data.style.discountMargin)
            setDiscount(res.data.style.discount)
            setDiscountPrice(res.data.style.discountPrice)
            setQuantiy(res.data.style.quantity)
            setSize(res.data.style.size)
            setImages(res.data.style.images)
            setTimeout(()=>{setLoading(false)})
            setError('')
        })   
        .catch(error => {
            // setLoading(false)
            setProductid({})
            setColor({})
            setName({})
            setCost({})
            setMargin({})
            setPrice({})
            setDiscountMargin()
            setDiscount()
            setDiscountPrice()
            setQuantiy()
            setSize()
            setImages()
            setError('Somthing went wrong')
            setLoading(false)
        })

    }, [])


    
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
        } catch(err){
            if(err.response.status === 500){
                toast.error('There is a problem with the server');
            }else{
                toast.error(err.response.data.massage);
            }
        }
    }


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updasting')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `http://${url}/admin/styles/update/${styleid}/${userid}`,
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
            setButtonText('Updated')
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setButtonText('Update')
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
                            <select onChange={(event)=>{setProductid(event.target.value)}} value={productid} type="text" className="form-control" placeholder='Brands' required>
                            <option>Select Product</option>
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
                        <input onChange={(event)=>{setName(event.target.value)}} value={name} type="text" className="form-control" required /> 
                    </div>

                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text'>Color Hex code</span>
                            </div>
                            <input onChange={(event)=>{setColor(event.target.value)}} value={color} type="text" placeholder='#ffffff' className="form-control" required /> 
                        </div>
                        <div className='col'>
                            <input className="form-control" style={{backgroundColor: color}} disabled/>
                        </div>
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Quantity</span>
                        </div>
                        <input onChange={(event)=>{setQuantiy(event.target.value)}} value={quantity} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Size</span>
                        </div>
                        <input onChange={(event)=>{setSize(event.target.value)}} value={size} type="text" className="form-control" required /> 
                    </div>
                </div>
                <label>Product Price - IQD</label>
                <div className='form-row'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Cost</span>
                        </div>
                        <input onChange={(event)=>{setCost(event.target.value)}} value={cost} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Margin</span>
                        </div>
                        <input onChange={(event)=>{setMargin(event.target.value)}} 
                        onKeyUpCapture={()=>setPrice(parseInt(cost/(1-margin)))}
                        value={margin} type="number" step='0.01' className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Price</span>
                        </div>
                        <input 
                        onChange={(event)=>{setPrice(event.target.value)}}
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
                        onChange={(event)=>{setDiscountMargin(event.target.value)}} 
                        onKeyUpCapture={()=>{if(discountMargin==0){setDiscountPrice(parseInt(price));}else{
                            setDiscountPrice(parseInt(Number((price-cost)/(margin/discountMargin))+Number(cost)));
                        }}}
                        onMouseLeave={()=>{setDiscount((Number(price)-Number(discountPrice))/Number(price));}}
                        
                        value={discountMargin} type="number" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend '>
                            <span className='input-group-text badge-secondary'>Discount</span>
                        </div>
                        <input 
                        onChange={(event)=>{setDiscount(event.target.value)}} 
                        
                        value={discount} type="number" className="form-control" disabled /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Price</span>
                        </div>
                        <input onChange={(event)=>{setDiscountPrice(event.target.value)}} value={discountPrice} type="number" className="form-control" disabled /> 
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
                        type="file" className="custom-file-input" name='file'  id='fileupload' />
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
                <h1 className="p-5 text-center">Update Style</h1>
                {pictureBorder()}
                {error ? error : null}
                {loading ? loadingSpinner():newAddStyleForm()}
                
            </div>
        </Layout>
    );
    
    
}

export default UpdateStyle;