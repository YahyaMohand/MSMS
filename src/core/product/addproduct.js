import React, {useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../layout';
import ImageUploader from 'react-images-upload';
import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function AddProduct() {
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [brands, setBrands] = useState({})
    const [categories, setCategories] = useState({})
    const [subcategories, setSubcategories] = useState({})
    const [classcategories, setClasscategories] = useState({})
    const [store, setStore] = useState({})
    const [cities, setCities] = useState({})
    const [pic,setPic]=useState(false)

    useEffect(()=>{
        axios.get(`${url}/admin/products/create/${userid}`)
        .then(res => {
            
            setBrands(res.data.brands)
            setCategories(res.data.categories)
            setSubcategories(res.data.subcategories)
            setClasscategories(res.data.classcategories)
            setStore(res.data.store)
            setCities(res.data.cities)
            setError('')
            setLoading(false)
        })   
        .catch(error => {
            setLoading(false)
            setBrands({})
            setCategories({})
            setSubcategories({})
            setClasscategories({})
            setStore({})
            setCities({})
            setError('Somthing went wrong')
        })
    }, [])


    const [values, setValues] = useState({
        brandid: "",
        cityid: "",
        categoryid:"",
        storeid: "",
        subcateid: "",
        classcateid:"",
        name: "",
        description: "",
        cost:0,
        margin: 0,
        price: 0,
        discountMargin:0,
        discount: 0,
        discountPrice:0,
        imagePath: "",
        isInStock: 0,
        isNew:0,
        isVip: 0,
        model: "",
        useMethod:"",
        serialnumber:"",
        expiryDate:"",
        productionDate:"",
        buttonText:"Submit"
    });
    //price calculation status
    const [margin, setMargin] = useState(0)
    const [discountMargin, setdiscountMargin] = useState(0)
    const [discount, setDiscount] = useState()
    const [imagePath, setImagePath ] = useState()
    
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
            setImagePath(filePath);
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

    const {brandid,
    cityid,
    categoryid,
    storeid,
    subcateid,
    classcateid,
    name,
    description,
    cost,
    // margin,
    price,
    // discountMargin,
    // discount,
    discountPrice,
    // imagePath,
    isInStock,
    isNew,
    isVip,
    model,
    useMethod,
    serialnumber,
    productionDate,
    expiryDate,
    buttonText} = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${url}/admin/products/create/${userid}`,
            data: {brandid,
                cityid,
                categoryid,
                storeid,
                subcateid,
                classcateid,
                name,
                description,
                cost,
                margin,
                price,
                discountMargin,
                discount,
                discountPrice,
                imagePath,
                isInStock,
                isNew,
                isVip,
                model,
                useMethod,
                serialnumber,
                productionDate,
                expiryDate,
                buttonText}
        })
        .then(response =>{
            // console.log("Product Added to database successfully", response);
            setValues({...values, buttonText: 'Submitted Add Style'});
            toast.success(response.data.message);
        })
        .catch(error => {
            // console.log('Operation ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error);
        })
    };

    const pictureBorder = () => (
        <div className='mb-5'>
            <img src={`${url}/${imagePath}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )
    
    const calculateMargins =()=>{
        
        setMargin(
            (1-(cost/price)).toFixed(2)
        )
        if(parseInt(discountPrice)==parseInt(price)){
            setdiscountMargin(
                (1-(cost/discountPrice)).toFixed(2)
            )
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
    // function numcoma(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    const newAddProductForm = () => (
        <form onSubmit={clickSubmit}>
            
                <div className='form-group'>   
                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Brand</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={handleChange('brandid')} value={brandid} type="text" className="form-control" placeholder='Brands' required>
                            <option value="0">Select one</option>
                            {brands.map(({brandid, nameEnglish})=><option value={brandid}>{nameEnglish}</option>)}
                            </select>
                        </div>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Category</span>
                            </div>
                            <select onChange={handleChange('categoryid')} value={categoryid} type="text" className="form-control" required>
                            <option value="0">Select one</option>
                            {categories.map(({categoryid, nameArabic})=><option value={categoryid}>{`${nameArabic}`}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                    <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Sub-Category</span>
                            </div>
                            <select onChange={handleChange('subcateid')} value={subcateid} type="text" className="form-control"  required>
                            <option value="0">Select one</option>
                            {subcategories.filter(el=>el.categoryid==categoryid).map(({subcateid, nameArabic})=><option value={subcateid}>{`${nameArabic}`}</option>)}
                            </select>
                        </div>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Class-Category</span>
                            </div>
                            <select onChange={handleChange('classcateid')} value={classcateid} type="text" className="form-control" required>
                            <option value="0">Select one</option>
                            {classcategories.filter(el=>el.subcateid==subcateid).map(({classcateid, nameArabic,})=><option value={classcateid}>{`${nameArabic}`}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                    <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Store</span>
                            </div>
                            <select onChange={handleChange('storeid')} value={storeid} type="text" className="form-control" required>
                            <option value="0">Select one</option>
                            {store.map(({storeid, nameArabic})=><option value={storeid}>{nameArabic}</option>)}
                            </select>
                        </div>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>City</span>
                            </div>
                            <select onChange={handleChange('cityid')} value={cityid} type="text" className="form-control" required>
                            <option value="0">Select one</option>
                            {cities.map(({cityid, nameArabic})=><option value={cityid}>{nameArabic}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='border-bottom border-maroon m-0'></div>
                </div>
                <div className='form-group'>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Name</span>
                        </div>
                        <input onChange={handleChange('name')} value={name} type="text" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Model</span>
                        </div>
                        <input onChange={handleChange('model')} value={model} type="text" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Serial Number</span>
                        </div>
                        <input onChange={handleChange('serialnumber')} value={serialnumber} type="text" className="form-control" /> 
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
                        <input 
                        onChange={handleChange('margin')} 
                        // onKeyUpCapture={()=>setPrice(parseInt(cost/(1-margin)))}
                        value={margin} type="number" step='0.01' className="form-control" disabled /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Price</span>
                        </div>
                        <input 
                        onChange={handleChange('price')}
                        value={price} type="number"  
                        className="form-control" /> 
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
                        // onKeyUpCapture={()=>{if(discountMargin==0){setDiscountPrice(parseInt(price));}else{
                        //     setDiscountPrice(parseInt(Number((price-cost)/(margin/discountMargin))+Number(cost)));
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
                        <input 
                        onChange={handleChange('discountPrice')} value={discountPrice} type="number" className="form-control" required /> 
                    </div>
                </div>
                <div className='row text-center mb-5'>
                    <button type='button' onClick={()=>calculateMargins()} className='btn btn-outline-danger btn-block'>claculate margins</button>
                </div>
                <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-success'>Production date</span>
                            </div>
                            <input onChange={handleChange('productionDate')} value={productionDate} type="date" className="form-control"  />
                            
                        </div>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-danger'>Expiry Date</span>
                            </div>
                            <input onChange={handleChange('expiryDate')} value={expiryDate} type="date" className="form-control"  />
                            
                        </div>
                </div>


                <div className='form-row'>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>Is in stock?</span>
                        </div>
                        <input 
                        onChange={handleChange('isInStock')} 
                        value={isInStock}
                         type="number" min='0' max='1' className="form-control"  name='isInStock' />
                    </div>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Is New?</span>
                        </div>
                        <input onChange={handleChange('isNew')} value={isNew} type="number" min='0' max='1' className="form-control" required />
                    </div>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>Is VIP?</span>
                        </div>
                        <input onChange={handleChange('isVip')} value={isVip} type="number" min='0' max='1' className="form-control" required />
                    </div>

                </div>



                <div className='form-group'>
                    <label>Description</label>
                    <textarea onChange={handleChange('description')} value={description} type="text" className="form-control" required /> 
                </div>
                <div className='form-group'>
                    <lable>Using Method</lable>
                    <textarea onChange={handleChange('useMethod')} value={useMethod} type="text" className="form-control" required /> 
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
                {/* {JSON.stringify({brandid,
                cityid,
                categoryid,
                storeid,
                subcateid,
                classcateid,
                name,
                description,
                cost,
                margin,
                price,
                discountMargin,
                discount,
                discountPrice,
                imagePath,
                isInStock,
                isNew,
                isVip,
                model,
                useMethod,
                expiryDate,
                productionDate,
                serialnumber
                })} */}
                <h1 className="p-5 text-center">Add Product</h1>
                {pic ? pictureBorder():null}
                {error ? error : null}
                {loading ? 'Loading':newAddProductForm()}
                
            </div></div>
        </Layout>
    );
    
    
}

export default AddProduct;