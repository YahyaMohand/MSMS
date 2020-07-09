import React, {useState, useEffect } from 'react';
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


const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function UpdateProduct(params) {
    const productid = params.match.params.productid
    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [brands, setBrands] = useState({})
    const [categories, setCategories] = useState({})
    const [subcategories, setSubcategories] = useState({})
    const [classcategories, setClasscategories] = useState({})
    const [store, setStore] = useState({})
    const [cities, setCities] = useState({})

    //update group
    const [brandid, setBrandid]=useState()
    const [cityid, setCityid]=useState()
    const [categoryid, setCategoryid]=useState()
    const [subcateid, setSubcateid]=useState()
    const [classcateid, setClasscateid]=useState()
    const [storeid, setStoreid]=useState()
    const [name, setName]=useState()
    const [description, setDescription]=useState()
    const [useMethod, setUseMethod]=useState()
    const [cost, setCost]=useState()
    const [margin, setMargin]=useState()
    const [discountMargin,setDiscountMargin]=useState()
    const [buttonText, setButtonText]=useState('Update')
    // const [imagePath, setImagePath]=useState()
    const [isInStock, setIsInStok]=useState()
    const [isNew, setIsNew]=useState()
    const [isVip, setIsVip]=useState()
    const [model, setModel]=useState()
    const [serialnumber, setSerialnumber]=useState()
    const [productionDate, setProductiondate]=useState()
    const [expiryDate, setExpiryDate]=useState()

    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [discountPrice, setDiscountPrice] = useState()
    const [imagePath, setImagePath ] = useState()
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
            // setLoading(false)
        })   
        .catch(error => {
            // setLoading(false)
            setBrands({})
            setCategories({})
            setSubcategories({})
            setClasscategories({})
            setStore({})
            setCities({})
            setError('Somthing went wrong')
        })

        axios.get(`${url}/admin/products/${productid}/${userid}`)
        .then(res => {
            // console.log('first effect store data',res.data.product)
            setBrandid(res.data.product.brandid)
            setCityid(res.data.product.cityid)
            setCategoryid(res.data.product.categoryid)
            setSubcateid(res.data.product.subcateid)
            setClasscateid(res.data.product.classcateid)
            setStoreid(res.data.product.storeid)
            setDescription(res.data.product.description)
            setUseMethod(res.data.product.useMethod)
            setImagePath(res.data.product.imagePath)
            setIsInStok(res.data.product.isInStock)
            setIsNew(res.data.product.isNew)
            setIsVip(res.data.product.isVip)
            setModel(res.data.product.model)
            setSerialnumber(res.data.product.serialnumber)
            setProductiondate(res.data.product.productionDate)
            setExpiryDate(res.data.product.expiryDate)
            setName(res.data.product.name)
            setCost(res.data.product.cost)
            setMargin(res.data.product.margin)
            setPrice(res.data.product.price)
            setDiscountMargin(res.data.product.discountMargin)
            setDiscount(res.data.product.discount)
            setDiscountPrice(res.data.product.discountPrice)
            setTimeout(()=>{setLoading(false)})
            setError('')
        })   
        .catch(error => {
            // setLoading(false)
            setBrandid()
            setCityid()
            setCategoryid()
            setSubcateid()
            setClasscateid()
            setStoreid()
            setDescription()
            setUseMethod()
            setImagePath()
            setIsInStok()
            setIsNew()
            setIsVip()
            setModel()
            setSerialnumber()
            setProductiondate()
            setExpiryDate()
            setName()
            setCost()
            setMargin()
            setPrice()
            setDiscountMargin()
            setDiscount()
            setDiscountPrice()
            setError('Somthing went wrong')
            // setLoading(false)
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
        setButtonText('Updating')
        axios({
            method: 'PUT',
            // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
            url: `${url}/admin/products/update/${productid}/${userid}`,
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
                }
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
            <img src={`${url}/${imagePath}`} alt="category pic" style={{height:"200px"}} className="img-thumbnail mx-auto d-block"></img>
        </div>
    )

    const calculateMargins =()=>{
        
        setMargin(
            (1-(cost/price)).toFixed(2)
        )
        if(parseInt(discountPrice)==parseInt(price)){
            setDiscountMargin(0)
            setDiscount(0)
        }else{
            setDiscountMargin(
                (1-(cost/discountPrice)).toFixed(2)
            )
            setDiscount(
                ((price-discountPrice)/price).toFixed(2)
            )
        }
    }

    const newAddProductForm = () => (
        <form onSubmit={clickSubmit}>
            
                <div className='form-group'>   
                    <div className='row'>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Brand</span>
                            </div>
                            {/* <label className="text-muted">Brand</label> */}
                            <select onChange={(event)=>{setBrandid(event.target.value)}} value={brandid} type="text" className="form-control" placeholder='Brands' required>
                            <option>Select one</option>
                            {brands.map(({brandid, nameEnglish})=><option value={brandid}>{nameEnglish}</option>)}
                            </select>
                        </div>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Category</span>
                            </div>
                            <select onChange={(event)=>{setCategoryid(event.target.value)}} value={categoryid} type="text" className="form-control" required>
                            <option>Select one</option>
                            {categories.map(({categoryid, nameArabic})=><option value={categoryid}>{nameArabic+` ${categoryid}`}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                    <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Sub-Category</span>
                            </div>
                            <select onChange={(event)=>{setSubcateid(event.target.value)}} value={subcateid} type="text" className="form-control" required>
                            <option>Select one</option>
                            {subcategories.map(({subcateid, nameArabic})=><option value={subcateid}>{nameArabic+` ${categoryid}`}</option>)}
                            </select>
                        </div>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Class-Category</span>
                            </div>
                            <select onChange={(event)=>{setClasscateid(event.target.value)}} value={classcateid} type="text" className="form-control" required>
                            <option>Select one</option>
                            {classcategories.map(({classcateid, nameArabic})=><option value={classcateid}>{nameArabic+` ${categoryid}`}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                    <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>Store</span>
                            </div>
                            <select onChange={(event)=>{setStoreid(event.target.value)}} value={storeid} type="text" className="form-control" required>
                            <option >Select one</option>
                            {store.map(({storeid, nameArabic})=><option value={storeid}>{nameArabic}</option>)}
                            </select>
                        </div>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-dark'>City</span>
                            </div>
                            <select onChange={(event)=>{setCityid(event.target.value)}} value={cityid} type="text" className="form-control" required>
                            <option>Select one</option>
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
                        <input onChange={(event)=>{setName(event.target.value)}} value={name} type="text" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Model</span>
                        </div>
                        <input onChange={(event)=>{setModel(event.target.value)}} value={model} type="text" className="form-control" required /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Serial Number</span>
                        </div>
                        <input onChange={(event)=>{setSerialnumber(event.target.value)}} value={serialnumber} type="text" className="form-control" required /> 
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
                        // onKeyUpCapture={()=>setPrice(parseInt(cost/(1-margin)))}
                        value={margin} type="number" step='0.01' className="form-control" disabled /> 
                    </div>
                    <div className='col input-group mb-5'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text badge-secondary'>Price</span>
                        </div>
                        <input 
                        onChange={(event)=>{setPrice(event.target.value)}}
                        value={price} type="number"  
                        className="form-control" required /> 
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
                        // onKeyUpCapture={()=>{if(discountMargin==0){setDiscountPrice(parseInt(price));}else{
                            // setDiscountPrice(parseInt(Number((price-cost)/(margin/discountMargin))+Number(cost)));
                        // }}}
                        // onMouseLeave={()=>{setDiscount((Number(price)-Number(discountPrice))/Number(price));}}
                        
                        value={discountMargin} type="number" className="form-control" disabled /> 
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
                        <input onChange={(event)=>{setDiscountPrice(event.target.value)}} 
                        value={discountPrice} type="number" className="form-control" required /> 
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
                            <input onChange={(event)=>{setProductiondate(event.target.value)}} value={productionDate} type="date" className="form-control" required />
                            
                        </div>
                        <div className='col input-group mb-5'>
                            <div className='input-group-prepend'>
                                <span className='input-group-text badge-danger'>Expiry Date</span>
                            </div>
                            <input onChange={(event)=>{setExpiryDate(event.target.value)}} value={expiryDate} type="date" className="form-control" required />
                            
                        </div>
                </div>


                <div className='form-row'>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>Is in stock?</span>
                        </div>
                        <input 
                        onChange={(event)=>{setIsInStok(event.target.value)}} 
                        value={isInStock}
                         type="number" min='0' max='1' className="form-control"  name='isInStock' />
                    </div>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Is New?</span>
                        </div>
                        <input onChange={(event)=>{setIsNew(event.target.value)}} value={isNew} type="number" min='0' max='1' className="form-control" required />
                    </div>
                    <div className='col input-group mb-5 border rounded p-0 ml-2 mr-2'>
                    <div className='input-group-prepend'>
                            <span className='input-group-text'>Is VIP?</span>
                        </div>
                        <input onChange={(event)=>{setIsVip(event.target.value)}} value={isVip} type="number" min='0' max='1' className="form-control" required />
                    </div>

                </div>



                <div className='form-group'>
                    <label>Description</label>
                    <textarea onChange={(event)=>{setDescription(event.target.value)}} value={description} type="text" className="form-control" required /> 
                </div>
                <div className='form-group'>
                    <lable>Using Method</lable>
                    <textarea onChange={(event)=>{setUseMethod(event.target.value)}} value={useMethod} type="text" className="form-control" required /> 
                </div>
               
                
                <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>Select Square Image</span>
                    </div>
                    <div className='custom-file'>
                        <input 
                        onChange={onUpload} 
                        // value={filename} 
                        type="file" className="custom-file-input" name='file'  id='fileupload'  />
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
                <h1 className="p-5 text-center">Update Product</h1>
                {pictureBorder()}
                {error ? error : null}
                {loading ? loadingSpinner():newAddProductForm()}
                
            </div></div>
        </Layout>
    );
    
    
}

export default UpdateProduct;