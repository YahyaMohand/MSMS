import React, {useState, useEffect } from 'react';
import { Redirect} from 'react-router-dom';
import Layout from '../core/layout';
// import {SketchPicker} from 'react-color';
// import ImageUploader from 'react-images-upload';
// import { Button, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import {isAuth} from '../auth/helpers';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'js-cookie'
import loadingSpinner from '../components/loadingspinner'
import { format } from 'date-fns';

const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 

function numcoma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getCurrentDate = (separator='-')=>{

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

const getOldDate = (separator='-')=>{

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year-2}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

function BussinesDashboard() {

    //static parameters
    const [startDate, setstartDate]=useState(getOldDate)
    const [endDate, setendDate]=useState(getCurrentDate)
    const [submittedorders, setsubmittedorders]=useState()
    const [ondeliverydorders, setondeliverydorders]=useState()
    const [recivedorders, setrecivedorders]=useState()
    const [cancelledorders,setcancelledorders]=useState()
    const [products, setproducts]=useState()
    const [styles,setstyles]=useState()
    const [users, setusers]=useState()
    const [soldproducts, setsoldproducts]=useState()
    const [productsdiscount,setproductsdiscount]=useState()
    const [productsprice, setproductsprice]=useState()
    // const [productscost, setproductscost]=useState()
    // const [avgorderprice, setavgorderprice]=useState()
    // const [avgordercount, setavgordercount]=useState()
    //dynamic parameters
    //cities,classcategories,brands,subcategories,maincategories,topproducts,suppliers
    const [cities, setcities]=useState()
    const [classcategories, setclasscategories]=useState()
    const [brands, setbrands]=useState()
    const [subcategories,setsubcategories]=useState()
    const [maincategories,setmaincategories]=useState()
    const [suppliers,setsuppliers]=useState()
    const [topproducts,settopproducts]=useState()
    const [loading2, setloading2]=useState(true)


    //get method functions
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [buttonText, setButtonText] = useState('Update')


    useEffect(()=>{
        axios.get(`${url}/admin/staticdashboard/${startDate}/${endDate}/${userid}`)
        .then(res => {
            setsubmittedorders(res.data.submittedorders)
            setondeliverydorders(res.data.ondeliverydorders)
            setrecivedorders(res.data.recivedorders)
            setcancelledorders(res.data.cancelledorders)
            setproducts(res.data.products)
            setstyles(res.data.styles)
            setusers(res.data.users)
            setsoldproducts(res.data.soldproducts)
            setproductsdiscount(res.data.productsdiscount)
            setproductsprice(res.data.productsprice)
            // setproductscost(res.data.productscost)
            // console.log(productscost)
            if(res.status==200){
                setLoading(false)
              }
            setError('')
            // console.log(res)
        })   
        .catch(error => {
            // console.log(error)
            // setLoading(false)
            setcancelledorders()
            setsubmittedorders()
            setondeliverydorders()
            setsubmittedorders()
            setproducts()
            setstyles()
            setusers()
            setsoldproducts()
            setproductsdiscount()
            setproductsprice()
            // setproductscost()
            setError('Somthing went wrong')
            setLoading(false)
        })


        //dynamic parameters
          //cities,classcategories,brands,subcategories,maincategories,topproducts,suppliers
        axios.get(`${url}/admin/dynamicparameters/${userid}`)
        .then(res => {
            // console.log(res.status)
            setcities(res.data.cities)
            setclasscategories(res.data.classcategories)
            setbrands(res.data.brands)
            setsubcategories(res.data.subcategories)
            setmaincategories(res.data.maincategories)
            settopproducts(res.data.topproducts)
            setsuppliers(res.data.suppliers)
            if(res.status == 200){
               
                setloading2(false)
            }
            setError('')
            // console.log(res)
        })   
        .catch(error => {
            setcities()
            setclasscategories()
            setbrands()
            setsubcategories()
            setmaincategories()
            settopproducts()
            setsuppliers()
            setError('Somthing went wrong')
            setloading2(false)
        })
    }, [])


    //dynamic parameters card
    const Dyprarmeterscards = ({parameters})=>(
        
        <li className='list-group-item'>
            <div className='row text-center'>
                <div className='col'><p>{parameters.nameEnglish}</p></div>
                <div className='col'><p className='display-4'>{parameters.count}</p></div>
            </div>
        </li>   
    )

    //top products list
    const Top50productslist = ({topproducts})=>(
        
        <li className='list-group-item'>
            <div className='row text-center'>
                <div className='col'><img src={`${url}/${topproducts.imagePath}`} alt='prodpic' height='150px'></img></div>
                <div className='col'><p>{topproducts.name}</p></div>
                <div className='col'><p>{topproducts.model}</p></div>
                <div className='col'><p>{topproducts.cost}</p></div>
                <div className='col'><p>{topproducts.price}</p></div>
                <div className='col'><p>{topproducts.discountMargin}</p></div>
                <div className='col'><p className='display-3'>{topproducts.count}</p></div>
            </div>
        </li>    
    )
    


    const clickSubmit = event => {
        event.preventDefault()
        setButtonText('Updating')
        axios.get(`${url}/admin/staticdashboard/${startDate}/${endDate}/${userid}`)
        .then(res => {
            setsubmittedorders(res.data.submittedorders)
            setondeliverydorders(res.data.ondeliverydorders)
            setrecivedorders(res.data.recivedorders)
            setcancelledorders(res.data.cancelledorders)
            setproducts(res.data.products)
            setstyles(res.data.styles)
            setusers(res.data.users)
            setsoldproducts(res.data.soldproducts)
            setproductsdiscount(res.data.productsdiscount)
            setproductsprice(res.data.productsprice)
            if(res.status==200){
                setLoading(false)
              }
            setError('')
            // console.log(res)
        })   
        .catch(error => {
            // console.log(error)
            // setLoading(false)
            setcancelledorders()
            setsubmittedorders()
            setondeliverydorders()
            setsubmittedorders()
            setproducts()
            setstyles()
            setusers()
            setsoldproducts()
            setproductsdiscount()
            setproductsprice()
            setError('Somthing went wrong')
            setLoading(false)
        })
    };

  
    const Dashboardclip = () => (
        <form onSubmit={clickSubmit}>
            
                
                <div className='form-group mt-2'>
                    <div className='col input-group mb-3'>
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>Start Date</span>
                        </div>
                        <input onChange={(event)=>{setstartDate(event.target.value)}} value={startDate} type="date" className="form-control" required /> 
                        <div className='input-group-prepend'>
                            <span className='input-group-text'>End Date</span>
                        </div>
                        <input onChange={(event)=>{setendDate(event.target.value)}} value={endDate} type="date" className="form-control" required /> 

                        <button className="btn btn-outline-secondary">
                        {buttonText}
                        </button>
                    </div>
                </div>
                
                <div className='row'>
                    <div className="card text-white bg-info mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'15rem'}}>
                        <div className="card-header text-center">Submitted Orders</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">الطلبات المرسلة الى كويسي</h5>
                            <p className='card-text text-center display-1'>{submittedorders}</p>
                        </div>
                    </div>  

                    <div className="card text-white bg-warning mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'15rem'}}>
                        <div className="card-header text-center">On Delivery Orders</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">الطلبات في التوصيل</h5>
                            <p className='card-text text-center display-1'>{ondeliverydorders}</p>
                        </div>
                    </div> 

                    <div className="card text-white bg-success mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'15rem'}}>
                        <div className="card-header text-center">Closed Orders</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">الطلبات المستلمة من قبل الزبون</h5>
                            <p className='card-text text-center display-1'>{recivedorders}</p>
                        </div>
                    </div>

                    <div className="card text-white bg-danger mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'15rem'}}>
                        <div className="card-header text-center">Cancelled Orders</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">الطلبات الملغاة</h5>
                            <p className='card-text text-center display-1'>{cancelledorders}</p>
                        </div>
                    </div> 

                    <div className="card text-dark bg-light mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'15rem'}}>
                        <div className="card-header text-center">Number of Products</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">عدد المنتجات</h5>
                            <p className='card-text text-center display-1'>{products}</p>
                        </div>
                    </div>  

                    <div className="card text-dark bg-light mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'15rem'}}>
                        <div className="card-header text-center">Number of Styles</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">عدد الستايلات</h5>
                            <p className='card-text text-center display-1'>{styles}</p>
                        </div>
                    </div> 

                    <div className="card text-dark bg-light mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'15rem'}}>
                        <div className="card-header text-center">Registered Users</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">عدد المستخدمين المسجلين</h5>
                            <p className='card-text text-center display-1'>{users}</p>
                        </div>
                    </div> 

                    <div className="card text-light bg-primary  mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'15rem'}}>
                        <div className="card-header text-center">All Sold Products</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">عدد المنتجات الكلي التي تم بيعها</h5>
                            <p className='card-text text-center display-1'>{soldproducts}</p>
                        </div>
                    </div>

                    <div className="card text-light bg-primary mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'15rem'}}>
                        <div className="card-header text-center">Sold Products with Discount</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">عدد المنتجات المخفضة الكلي التي تم بيعها</h5>
                            <p className='card-text text-center display-1'>{productsdiscount}</p>
                        </div>
                    </div>

                    <div className="card text-light bg-dark mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'25rem'}}>
                        <div className="card-header text-center">Sold Products Value IQD</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center"> IQD قيمة المنتجات المبيوعة</h5>
                            <p className='card-text text-center display-3'>{numcoma(productsprice)}</p>
                        </div>
                    </div>

                    <div className="card text-light bg-dark mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'25rem'}}>
                        <div className="card-header text-center">Avg product price per Order IQD</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">معدل قيمة الطلبات IQD</h5>
                            <p className='card-text text-center display-3'>{numcoma(Math.floor((productsprice)/(submittedorders+ondeliverydorders+recivedorders)))}</p>
                        </div>
                    </div>

                    <div className="card text-light bg-dark mb-3 mr-3 ml-3 mx-auto shadow text-center" style={{width:'25rem'}}>
                        <div className="card-header text-center">Avg product number per Orders</div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center">معدل عدد المنتجات لكل طلبية</h5>
                            <p className='card-text text-center display-3'>{numcoma(((soldproducts)/(submittedorders+ondeliverydorders+recivedorders)).toPrecision(3))}</p>
                        </div>
                    </div>

                    
                </div>
            </form>
    );

    const dynamicparammeters = ()=>(
        <div>
            <h1 className='text-center card text-white bg-success p-3'>Orders in Different Representation</h1>
            <div className='row'>
            
                <div className='col-sm'>
                    <h2 className='text-center card text-dark bg-warning p-3'>Brands</h2>
                <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>Name</p></div>
                        <div className='col'><p>Count</p></div>
                    </div>
                </li>  
                {brands.map((brands,i)=>(<Dyprarmeterscards key={i} parameters={brands} />))}  
                </ul>
                </div>
                <div className='col-sm'>
                <h2 className='text-center card text-dark bg-warning p-3'>Cities</h2>
                <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>Name</p></div>
                        <div className='col'><p>Count</p></div>
                    </div>
                </li>  
                {cities.map((cities,i)=>(<Dyprarmeterscards key={i} parameters={cities} />))}  
                </ul>
                </div>
                <div className='col-sm'>
                <h2 className='text-center card text-dark bg-warning p-3'>Suppliers</h2>
                <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>Name</p></div>
                        <div className='col'><p>Count</p></div>
                    </div>
                </li>  
                {suppliers.map((suppliers,i)=>(<Dyprarmeterscards key={i} parameters={suppliers} />))}  
                </ul>
                </div>
            </div>

            <hr></hr>
            <div className='row'>
                <div className='col-sm'>
                <h2 className='text-center card text-dark bg-warning p-3'>Main Categories</h2>
                <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>Name</p></div>
                        <div className='col'><p>Count</p></div>
                    </div>
                </li>  
                {maincategories.map((maincategories,i)=>(<Dyprarmeterscards key={i} parameters={maincategories} />))}  
                </ul>
                </div>
                <div className='col-sm'>
                <h2 className='text-center card text-dark bg-warning p-3'>Sub Categories</h2>
                <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>Name</p></div>
                        <div className='col'><p>Count</p></div>
                    </div>
                </li>  
                {subcategories.map((subcategories,i)=>(<Dyprarmeterscards key={i} parameters={subcategories} />))}  
                </ul>
                </div>
                <div className='col-sm'>
                <h2 className='text-center card text-dark bg-warning p-3'>Class Categories</h2>
                <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>Name</p></div>
                        <div className='col'><p>Count</p></div>
                    </div>
                </li>  
                {classcategories.map((classcategories,i)=>(<Dyprarmeterscards key={i} parameters={classcategories} />))}  
                </ul>
                </div>
            </div>
        </div>
    );

    const topproductslist = ()=>(
        <div>
            <h1 className='text-center card text-white bg-success p-3'>Top 50 orderd products</h1>
            <div>
            <ul className='list-group'>
                <li className='list-group-item active'>
                    <div className='row text-center font-weight-bold'>
                        <div className='col'><p>Pic</p></div>
                        <div className='col'><p>Name</p></div>
                        <div className='col'><p>Model</p></div>
                        <div className='col'><p>Cost</p></div>
                        <div className='col'><p>Price</p></div>
                        <div className='col'><p>Margin</p></div>
                        <div className='col'><p>Count</p></div>
                    </div>
                </li>  
                {topproducts.map((topproducts,i)=>(<Top50productslist key={i} topproducts={topproducts} />))}  
                </ul>
            </div>
        </div>
    );


    return(
        <Layout>
            <div className='container-fluid'>
            {/* <div className="col-d-6"> */}
            {/* <ToastContainer /> */}
                {isAuth() ? null : <Redirect to='/'/>} 
              
                {/* <h1 className="p-5 text-center">Update USD to IQD</h1> */}
                {error ? error : null}
                {loading ? loadingSpinner():Dashboardclip()}
                <hr></hr>
                {loading2 ? loadingSpinner():dynamicparammeters()}
                <hr></hr>
                {loading2 ? loadingSpinner(): topproductslist()}
                
            {/* </div> */}
            </div>
        </Layout>
    );
    
}

export default BussinesDashboard;