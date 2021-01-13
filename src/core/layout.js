import React, {Fragment, useState} from 'react';
import {Link, withRouter,Route} from 'react-router-dom';
import {isAuth, signout} from '../auth/helpers';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import {NavDropdown} from 'react-bootstrap'
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare, FaSnapchatSquare, FaUserCircle,FaShoppingBag,FaProductHunt } from 'react-icons/fa';
import {FiLogIn, FiLogOut} from 'react-icons/fi';
import {BsFillPersonPlusFill} from 'react-icons/bs';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import {AiFillTags, AiFillHome,AiOutlineBulb,AiTwotoneBug} from 'react-icons/ai';
import ProductCards from '../components/productcards'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import DashboardCard from './dashboard/dashboardcard'
import '../App.css'
import {BrowserView,MobileView,isBrowser,isMobile,isAndroid,isIOS} from "react-device-detect";

const Layout = ({children,match,history}) =>{


    const mobilebanner = ()=>(
        
            <MobileView>
                <div className="alert alert-info d-block fixed-bottom m-0 pt-0 pb-0 pl-0 pr-2 text-right" style={{height:55,opacity:'0.9', position:"fixed", bottom:'0px',backgroundColor:'#fc2779'}}>
                    <div className='row p-0 m-0'>
                        
                        <div className='col-5 p-0 m-0 d-flex center'>
                            <div className='btn '>
                            <a href='https://kwaysi.page.link/qrcode' className='btn btn-light'>
                           <p className='m-0 p-0 font-weight-bold' style={{fontSize:'13px'}}>الى التطبيق</p>
                            </a>
                            </div>
                        </div>
                        <div className='col-7 p-0 m-0'>
                            <p className='p-0 m-0 font-smaller white font-weight-bold' style={{color:'#ffffff', fontSize:'16px'}}>تسوق عبر التطبيق</p>
                            <p className='p-0 m-0 font-smaller white' style={{color:'#ffffff', fontSize:'13px'}}>متوفر الان على متجر التطبيقات</p>
                        </div>
                    </div>
                </div>
            </MobileView>
        
    )

    const url = process.env.REACT_APP_NODE

    const [query,setQuery]=useState()
    const [loading, setLoading]=useState(true)
    const [error, setError]=useState('')
    const [products, setProducts]=useState({})
    const [searchresult,setSearchresult]=useState(false)

    const isActive = path =>{
        if(match.path === path){
            return{color: '#fff', fontSize: '1.2rem'};
        }else{
            return{color: '#f2f2f2'};
        }
    };

    const SearchProducts = ()=> {
       
        return(
        <div>
          {/* <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr> */}
          {/* <h3 className='text-center'>المنتجات</h3> */}
          {/* <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr> */}
          <div  className='container-fluid'>
          {isAuth() && isAuth().role ===1? 
            <div className='row mx-auto d-flex'>
                {products.map((products,i)=>(<DashboardCard key={i} products={products}/>))}
            </div>
            :
            <div className='row mx-auto d-flex'>
                {products.map((products,i)=>(<ProductCards key={i} products={products}/>))}
            </div>
            }
            {/* <div className='row d-flex'>
              {products.map((products,i)=>(<ProductCards key={i} products={products}/>))}
            </div> */}
          </div>
          <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
        </div>
      )}

      const clickSubmit = event => {
        event.preventDefault()
        axios.get(`${url}/search/${encodeURI(query)}`)
        .then(res => {
            // console.log(res.data)
            setProducts(res.data.products)
            if(res.data.products[0]==null || res.data.products == {}){
                setSearchresult(false)
                toast.warning("لاتوجد نتائج لعملية البحث هذه");
            }else{
                setSearchresult(true)
            }
            setError('')
            setTimeout(setLoading(false))
            console.log(products)
            console.log(query)
        })   
        .catch(error => {
            setLoading(false)
            setProducts({})
            setError('Somthing went wrong')
        })
    };


    //mobil nav
  
    const mobilnav = ()=>(
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <nav className=" navbar navbar-expand" style={{backgroundColor: '#562e48', color: '#ffffff'}}>
       
            
            {/* <div className='collapse navbar-collapse' id="navbarSupportedContent"> */}
            <ul className="container d-flex justify-content-between navbar-nav mx-auto">

            <li className='nav-item'>
                <Tooltip  placement="bottom"  overlay={<span>الرئيسية</span>}>
                <Link to="/" onClick={()=>setSearchresult(false)} className="nav-link font-weight-bold right-align" style={isActive('/')} >
                {/* <img className='m-0 p-0' height='30px' width='80px' src={window.location.origin + '/kwaysi.png'} alt='kwaysi'></img> */}
                <AiFillHome style={{color: '#ffffff',fontSize:'24'}}/>
                </Link>
                </Tooltip>
            </li>

            <li className="nav-item text-center">
            <Tooltip  placement="bottom"  overlay={<span>البراندات</span>}>
                <Link to='/brands' onClick={()=>setSearchresult(false)} className='nav-link font-weight-bold' style={isActive('/brands')}>
                   <AiFillTags style={{color: '#ffffff',fontSize:'24'}}/>
                </Link>
            </Tooltip>
            </li>

           {!isAuth() && (
               <Fragment>
                    <li className="nav-item text-center">
                    <Tooltip  placement="bottom"  overlay={<span>تسجيل الدخول</span>}>
                <Link onClick={()=>setSearchresult(false)} to="/signin" className=" nav-link font-weight-bold" style={isActive('/signin')}>
                     <FiLogIn style={{color: '#ffffff',fontSize:'24'}}/>
                </Link>
                </Tooltip>
            </li>

            <li className="nav-item text-center">
            <Tooltip  placement="bottom"  overlay={<span>تسجيل حساب</span>}>
                <Link onClick={()=>setSearchresult(false)} to="/signup" className=" nav-link font-weight-bold" style={isActive('/signup')}>
                    <BsFillPersonPlusFill style={{color: '#ffffff',fontSize:'24'}}/>
                </Link>
                </Tooltip>
            </li>
               </Fragment>
           )}

             {/* to show the username on nav and go to admin page */}
             {/* {isAuth() && isAuth().role ===1 && (
            <li className="nav-item">
                
                    <Link to='/admin' className='nav-link font-weight-bold' style={isActive('/admin')}>
                        {`${isAuth().username} اهلا،`}
                    </Link>
                
            </li>
            )} */}

             {/* to go to orders admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">

                    
                    <Link onClick={()=>setSearchresult(false)} to='/admin/orders' className='nav-link' style={isActive('/admin/orders')}>
                        <AiOutlineBulb style={{color: '#ffffff',fontSize:'24'}}/>
                    </Link>
                
            </li>
            )}

            {/* to go to suppliers admin page */}
            {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">

                    <Link onClick={()=>setSearchresult(false)} to='/admin/suppliers' className='nav-link' style={isActive('/admin/suppliers')}>
                        <AiTwotoneBug style={{color: '#ffffff',fontSize:'24'}}/>
                    </Link>
                
            </li>
            )}

             {/* to go to products admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">
                
                        {/* <Link to='/admin/products' className='nav-link' style={isActive('/admin/products')}>
                            Products
                        </Link> */}
                        <NavDropdown title="P" id="basic-nav-dropdown" >
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard">All Products</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard/new">New Products</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard/sales">Sales Products</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard/vip">Vip Products</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard/outofstock">Out of Stack</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/products">All Styles</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addproduct">Add Product</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addstyle">Add Style</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/updateusd">Update USD</NavDropdown.Item>
                        </NavDropdown>
                
            </li>
            )}


             {/* to go to brands admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">
                
                    {/* <Link to='/admin/brands' className='nav-link' style={isActive('/admin/brands')}>
                        Brands
                    </Link> */}

                    <NavDropdown title="B" id="basic-nav-dropdown" >
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/brands">Brands</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addbrand">Add Brand</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/stores">Stores</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addstore">Add Store</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/cities">Cities</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addcity">Add City</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/carousels">Carousels</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addcarousel">Add Carousel</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/categories">Categories</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addcategory">Add Category</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addsubcategory">Add Sub-Category</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addclasscategory">Add Class-Category</NavDropdown.Item>
                        </NavDropdown>
                
            </li>
            )}


           

            

           


               {/* to show the bag on nav for user*/}
               {isAuth() && isAuth().role ===0 && (
            <li className="nav-item  text-center">
                <Tooltip  placement="bottom"  overlay={<span>حقيبة التسوق</span>}>
                    <Link onClick={()=>setSearchresult(false)} to='/bag' className='nav-link' style={isActive('/bag')}>
                        <FaShoppingBag  style={{color: '#ffffff',fontSize:'24'}}/>
                        {localStorage.getItem('bag') ? <sup className='badge' style={{backgroundColor: '#fc2779'}} >
                            {/* <small className='' style={{fontSize: 'small'}}>{JSON.parse(localStorage.getItem('bag')).length}</small> */}
                        </sup> : null}
                    </Link>
                </Tooltip>
            </li>
            )}

                          {/* </div> */}
            {/* to show the username on nav and go to private non-admin page */}
            {isAuth() && isAuth().role ===0 && (
            <li className="nav-item  text-center">
                <Tooltip  placement="bottom"  overlay={<span>الحساب</span>}>
                    <Link onClick={()=>setSearchresult(false)} to='/private' className='nav-link font-weight-bold' style={isActive('/private')}>
                        {/* {` ${isAuth().username}    `} */}
                        
                        <FaUserCircle  style={{color: '#ffffff',fontSize:'24'}} />
                    </Link>
                </Tooltip>
            </li>
            )}

            {/* signout nav if noth authenticated */}
           {isAuth() && (
            <li className="nav-item  text-center">
                <Tooltip  placement="bottom"  overlay={<span>تسجيل الخروج</span>}>
                <span className='nav-link'
                    style={{cursor:'pointer', color:'#ff9009'}}
                 onClick={()=>{
                    signout(() => {
                        history.push('/')
                        setSearchresult(false)
                    })
                }}
                >
                    <FiLogOut  style={{color: '#5DFDCB',fontSize:'24'}}/>
                </span>
                </Tooltip>
            </li>
           )}

           

            

           </ul>


        </nav>
        </DirectionProvider>
    )
    const nav = ()=>(
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <nav className=" navbar navbar-expand-lg" style={{backgroundColor: '#562e48', color: '#ffffff'}}>
           
                <form className='text-center form-inline my-2 my-lg-0' 
                    onSubmit={clickSubmit}
                >
                    {/* {submitsearch()} */}
                    <button className='text-center btn my-2 my-sm-0 font-weight-bolder' type='submit' 
                        style={{backgroundColor:'#fc2779',color:'#ffffff'}} >ابحث</button>
                    
                    <input type='search' onChange={(event)=>{setQuery(event.target.value)}} value={query} className='form-control mr-sm-2' placeholder="ابحث عن المنتجات" />
                </form>
   
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            {/* <span className="navbar-toggler-icon" style={{backgroundColor: '#ffffff',color:"#ffffff"}}></span> */}
            <svg style={{color:'#ffffff'}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-grid-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
            </svg>
        </button>
            <div className='collapse navbar-collapse' id="navbarSupportedContent">
            <ul className="container d-flex justify-content-between navbar-nav mx-auto my-auto">

            <li>
                <Link to="/" onClick={()=>setSearchresult(false)} className="mr-5 nav-link" style={isActive('/')}>
                    <img height='40px' src={window.location.origin + '/kwaysi.png'} alt='kwaysi'></img>
                </Link>
            </li>

            <li className="nav-item text-center">
                
                <Link to='/brands' onClick={()=>setSearchresult(false)} className='nav-link font-weight-bold' style={isActive('/brands')}>
                    البراندات
                </Link>
            
            </li>

           {!isAuth() && (
               <Fragment>
                    <li className="nav-item text-center">
                <Link onClick={()=>setSearchresult(false)} to="/signin" className=" nav-link font-weight-bold" style={isActive('/signin')}>
                    تسجيل الدخول
                </Link>
            </li>

            <li className="nav-item text-center">
                <Link onClick={()=>setSearchresult(false)} to="/signup" className=" nav-link font-weight-bold" style={isActive('/signup')}>
                    انشاء حساب
                </Link>
            </li>
               </Fragment>
           )}

             {/* to show the username on nav and go to admin page */}
             {/* {isAuth() && isAuth().role ===1 && (
            <li className="nav-item">
                
                    <Link to='/admin' className='nav-link font-weight-bold' style={isActive('/admin')}>
                        {`${isAuth().username} اهلا،`}
                    </Link>
                
            </li>
            )} */}

             {/* to go to orders admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">

                    
                    <Link onClick={()=>setSearchresult(false)} to='/admin/orders' className='nav-link' style={isActive('/admin/orders')}>
                        Orders
                    </Link>
                
            </li>
            )}

            {/* to go to suppliers admin page */}
            {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">

                    <Link onClick={()=>setSearchresult(false)} to='/admin/suppliers' className='nav-link' style={isActive('/admin/suppliers')}>
                        suppliers
                    </Link>
                
            </li>
            )}
             {/* to go to suppliers admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">

                    <Link onClick={()=>setSearchresult(false)} to='/admin/bussinesdashboard' className='nav-link' style={isActive('/admin/suppliers')}>
                        Business Dashboard
                    </Link>
                
            </li>
            )}

             {/* to go to products admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">
                
                        {/* <Link to='/admin/products' className='nav-link' style={isActive('/admin/products')}>
                            Products
                        </Link> */}
                        <NavDropdown title="Products" id="basic-nav-dropdown" >
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard">All Products</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard/new">New Products</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard/sales">Sales Products</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard/vip">Vip Products</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard/outofstock">Out of Stack</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/products">All Styles</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addproduct">Add Product</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addstyle">Add Style</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/updateusd">Update USD</NavDropdown.Item>
                        </NavDropdown>
                
            </li>
            )}


             {/* to go to brands admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">
                
                    {/* <Link to='/admin/brands' className='nav-link' style={isActive('/admin/brands')}>
                        Brands
                    </Link> */}

                    <NavDropdown title="Brands" id="basic-nav-dropdown" >
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/brands">Brands</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addbrand">Add Brand</NavDropdown.Item>
                        </NavDropdown>
                
            </li>
            )}


            {/* to go to categories admin page */}
            {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">
                
                    {/* <Link to='/admin/categories' className='nav-link' style={isActive('/admin/categories')}>
                        Categories
                    </Link> */}
                    <NavDropdown title="Categories" id="basic-nav-dropdown" >
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/categories">Categories</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addcategory">Add Category</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addsubcategory">Add Sub-Category</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addclasscategory">Add Class-Category</NavDropdown.Item>
                        </NavDropdown>
                
            </li>
            )}


             {/* to go to stores admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item text-center">
                
                    {/* <Link to='/admin/stores' className='nav-link' style={isActive('/admin/stores')}>
                        Stores
                    </Link> */}
                    <NavDropdown title="Stores" id="basic-nav-dropdown" >
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/stores">Stores</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addstore">Add Store</NavDropdown.Item>
                    </NavDropdown>
                
            </li>
            )}

             {/* to go to cities admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item  text-center" >
                
                    {/* <Link to='/admin/cities' className='nav-link' style={isActive('/admin/cities')}>
                        Cities
                    </Link> */}
                    <NavDropdown title="Cities" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/cities">Cities</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addcity">Add City</NavDropdown.Item>
                    </NavDropdown>
                
            </li>
            )}

            {/* to go to addcarousel admin page */}
            {isAuth() && isAuth().role ===1 && (
            <li className="nav-item  text-center">
                
                    {/* <Link to='/admin/addcarousel' className='nav-link' style={isActive('/admin/addcarousel')}>
                        Add Carousel
                    </Link> */}
                    <NavDropdown title="Carousel" id="basic-nav-dropdown" >
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/carousels">Carousels</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addcarousel">Add Carousel</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/groups">Groups</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addgroup">Add Group</NavDropdown.Item>
                    </NavDropdown>
                
            </li>
            )}


               {/* to show the bag on nav for user*/}
               {isAuth() && isAuth().role ===0 && (
            <li className="nav-item  text-center">
                
                    <Link onClick={()=>setSearchresult(false)} to='/bag' className='nav-link' style={isActive('/bag')}>
                        الحقيبة
                        {localStorage.getItem('bag') ? <sup className='badge' style={{backgroundColor: '#fc2779'}} >
                            {/* <small className='' style={{fontSize: 'small'}}>{JSON.parse(localStorage.getItem('bag')).length}</small> */}
                        </sup> : null}
                    </Link>
                
            </li>
            )}

               

           {/* signout nav if noth authenticated */}
           {isAuth() && (
            <li className="nav-item  text-center">
                <span className='nav-link'
                    style={{cursor:'pointer', color:'#ff9009'}}
                 onClick={()=>{
                    signout(() => {
                        history.push('/')
                        setSearchresult(false)
                    })
                }}
                >
                    تسجيل الخروج
                </span>
            </li>
           )}

            

           </ul>
           </div>
            {/* to show the username on nav and go to private non-admin page */}
            {isAuth() && isAuth().role ===0 && (
            // <li className="nav-item  text-center">
                
                    <Link onClick={()=>setSearchresult(false)} to='/private' className='nav-link font-weight-bold' style={isActive('/private')}>
                        {` ${isAuth().username}    `}
                        
                        <FaUserCircle  style={{color: '#ffffff',fontSize:'20'}} />
                    </Link>
                
            // </li>
            )}

        </nav>
        </DirectionProvider>
    );

    const mobilFooter = ()=>(
        <footer  style={{backgroundColor: '#fc2779', color: '#ffffff', width: '100%', height:'55px'}}>
            <div>

            </div>
        </footer>
    )

    const Footer = ()=>(
        <footer className='py-5 ' style={{backgroundColor: '#562e48', color: '#ffffff', width: '100%'}}>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md'>
                        <img height='60px' src={window.location.origin + '/kwaysi.png'} alt='logo'></img>
                        <br></br>
                        <div className='m-3'>
                            <a href='https://www.facebook.com/kwaysistore/' ><FaFacebookSquare  style={{fontSize: '1.8rem', color: 'white'}} /> </a>
                            <a href='https://www.instagram.com/kwaysistore/' ><FaInstagramSquare  style={{fontSize: '1.8rem', color: 'white'}} /> </a>
                            <a href='https://www.youtube.com/channel/UCHDDkqwMnd4uc-8NSWN1MzA' ><FaYoutubeSquare  style={{fontSize: '1.8rem', color: 'white'}} /> </a>
                            <a href='https://www.snapchat.com/add/kwaysistore' ><FaSnapchatSquare style={{fontSize: '1.8rem', color: 'white'}} /> </a>
                        </div>
                        <br></br>
                        
                        <a href="https://play.google.com/store/apps/details?id=com.kwaysi.com">
                            <img height='60px' className='mb-5' src={window.location.origin + '/googleplay.png'} alt='google play' />
                        </a>
                        <br/>
                        <a href="https://apps.apple.com/iq/app/%D9%85%D8%AA%D8%AC%D8%B1-%D9%83%D9%88%D9%8A%D8%B3%D9%8A-kwaysi-store/id1527991952">
                            <img height='70px' className='mb-5' src={window.location.origin + '/appstore.png'} alt='app store' />
                        </a>
                       
                    </div>
                    <div className='col-6 col-md'>
                       <h4>التواصل</h4>
                       <p className='mt-3'>+964 750 330 5680</p>
                       <p>info@kwaysi.com</p>
                    </div>
                    <div className='col-6 col-md'>
                        <h4>العنوان</h4>
                        {/* <p className='mt-3'>الموصل</p> */}
                        {/* <p>41001</p> */}
                        {/* <p>نينوى</p> */}
                        <p>العراق</p>
                    </div>
                    <div className='col-6 col-md'>
                        <h4>الاصناف الرئيسية</h4>
                        <p className='mt-3'><a href='/categories/1' style={{textDecoration: 'none', color: '#ffffff'}}>المكياج</a></p>
                        <p><a href='/categories/2' style={{textDecoration: 'none', color: '#ffffff'}}>العناية بالبشرة</a></p>
                        <p><a href='/categories/3' style={{textDecoration: 'none', color: '#ffffff'}}>الشعر</a></p>
                        <p><a href='/categories/4' style={{textDecoration: 'none', color: '#ffffff'}}>العطور</a></p>
                        <p><a href='/categories/5' style={{textDecoration: 'none', color: '#ffffff'}}>الرجال</a></p>
                        <p><a href='/categories/6' style={{textDecoration: 'none', color: '#ffffff'}}>الهدايا</a></p>
                    </div>

                    {/* <div className='col-6 col-md'></div> */}
                </div>
            </div>

        </footer>
    )

    return(
        <Fragment>
            {isMobile? mobilnav(): nav()}
            {mobilebanner()}
            <div className='container-fluid widthclass' 
            // style={{width:'80%'}}
            >
                <span>
        {isAndroid ? <Route exact path="/qrcode" render={() => (window.location.href = "https://play.google.com/store/apps/details?id=com.kwaysi.com")} /> :isIOS ? <Route exact path="/qrcode" render={() => (window.location.href = "https://apps.apple.com/iq/app/%D9%85%D8%AA%D8%AC%D8%B1-%D9%83%D9%88%D9%8A%D8%B3%D9%8A-kwaysi-store/id1527991952")} />:<Route exact path="/qrcode" render={() => (window.location.href = "https://www.kwaysi.com")} />}
      </span>
                <div className='row' style={{backgroundColor: '#FDFDFB'}}>
                    <ToastContainer 
                    position='bottom-right'
                    />
                    
                    {searchresult ? SearchProducts():children}
                    {/* {children} */}
                </div>
            </div>
            {isMobile ? mobilFooter(): Footer()}
        </Fragment>
    );
};

export default withRouter(Layout);