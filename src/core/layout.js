import React, {Fragment, useState} from 'react';
import {Link, withRouter,Route, Redirect} from 'react-router-dom';
import {isAuth, signout} from '../auth/helpers';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import {NavDropdown} from 'react-bootstrap'
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare, FaSnapchatSquare, FaUserCircle,FaShoppingBag,FaProductHunt,FaBold } from 'react-icons/fa';
import {FiLogIn, FiLogOut} from 'react-icons/fi';
import {BsFillPersonPlusFill} from 'react-icons/bs';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import {AiFillTags, AiFillHome,AiOutlineBulb,AiTwotoneBug} from 'react-icons/ai';
import ProductCards from '../components/productcards'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import DashboardCard from './dashboard/dashboardcard'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import '../App.css'
import {BrowserView,MobileView,isBrowser,isMobile,isAndroid,isIOS} from "react-device-detect";
import ReactPixel from 'react-facebook-pixel';


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
            return{color: '#ffee00', fontSize: '1.4rem',};
        }else{
            return{color: '#ffffff'};
        }
    };

    const SearchProducts = ()=> {
       
        return(
        <div>
          {/* <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr> */}
          {/* <h3 className='text-center'>المنتجات</h3> */}
          {/* <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr> */}
          <div  className='container-fluid'>
          {isAuth() && (isAuth().role ===4 ||isAuth().role ===5 || isAuth().role===7)? 
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
            ReactPixel.fbq('track', 'Search');
            if(res.data.products[0]==null || res.data.products == {}){
                setSearchresult(false)
                toast.warning("لاتوجد نتائج لعملية البحث هذه");
            }else{
                setSearchresult(true)
            }
            setError('')
            setTimeout(setLoading(false))
            // console.log(products)
            // console.log(query)
        })   
        .catch(error => {
            setLoading(false)
            setProducts({})
            setError('Somthing went wrong')
        })
    };
  
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

            <li className="nav-item text-center">
                
                <Link to='/beautycenters' onClick={()=>setSearchresult(false)} className='nav-link font-weight-bold' style={isActive('/beautycenters')}>
                    مراكز التجميل
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
             {isAuth() && (isAuth().role ===5 || isAuth().role===7) && (
            <li className="nav-item text-center">

                    
                    <Link onClick={()=>setSearchresult(false)} to='/admin/orders' className='nav-link' style={isActive('/admin/orders')}>
                        Orders
                    </Link>
                
            </li>
            )}

            {/* to go to suppliers admin page */}
            {isAuth() && (isAuth().role ===5 || isAuth().role===7) && (
            <li className="nav-item text-center">

                    <Link onClick={()=>setSearchresult(false)} to='/admin/suppliers' className='nav-link' style={isActive('/admin/suppliers')}>
                        suppliers
                    </Link>
                
            </li>
            )}


             {/* to go to suppliers admin page */}
             {isAuth() && (isAuth().role ===2 || isAuth().role===7) && (
            <li className="nav-item text-center">

                    <Link onClick={()=>setSearchresult(false)} to='/admin/booth' className='nav-link' style={isActive('/admin/booth')}>
                        Booth
                    </Link>
                
            </li>
            )}



             {/* to go to suppliers admin page */}
             {isAuth() && (isAuth().role ===3 || isAuth().role===5 || isAuth().role===7) && (
            <li className="nav-item text-center">

                    <Link onClick={()=>setSearchresult(false)} to='/admin/bussinesdashboard' className='nav-link' style={isActive('/admin/bussinesdashboard')}>
                        Business Dashboard
                    </Link>
                
            </li>
            )}

            {/* financ dashboard */}
                {/* management tools  */}
             {isAuth() && (isAuth().role ===8 || isAuth().role===7) && (
            <li className="nav-item text-center">    
                <Link onClick={()=>setSearchresult(false)} to='/admin/financedashboard' className='nav-link' style={isActive('/admin/financedashboard')}>
                Finance Dashboard
                </Link>   
            </li>
            )}

             {/* to go to beauty centers admin page */}
             {isAuth() && (isAuth().role ===4 ||isAuth().role ===5||isAuth().role ===7) && (
            <li className="nav-item text-center">
                
                    {/* <Link to='/admin/stores' className='nav-link' style={isActive('/admin/stores')}>
                        Stores
                    </Link> */}
                    <NavDropdown title="Beauty Centers" id="basic-nav-dropdown" >
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/beautycenters">beauty centers</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addbeautycenter">Add beauty center</NavDropdown.Item>
                    </NavDropdown>
                
            </li>
            )}

             {/* management tools  */}
             {isAuth() && (isAuth().role ===6 || isAuth().role===7) && (
            <li className="nav-item text-center">
                
                        {/* <Link to='/admin/products' className='nav-link' style={isActive('/admin/products')}>
                            Products
                        </Link> */}
                        <NavDropdown title="Management" id="basic-nav-dropdown" >
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/employees">Employees</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/hr/add">Add Employee</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/contracts">Contract</NavDropdown.Item>
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/contracts/add">Add Contract</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/transactions">Transactions</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/transactions/add">Add Transaction</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/logistics">Logistic items</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/logistics/add">Add Logistics</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/financedashboard">Finance Dashboard</NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                            {/* <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/updateusd">Update USD</NavDropdown.Item> */}
                        </NavDropdown>
                
            </li>
            )}

             {/* to go to products admin page */}
             {isAuth() && (isAuth().role ===4 ||isAuth().role ===5||isAuth().role ===7) && (
            <li className="nav-item text-center">
                
                        {/* <Link to='/admin/products' className='nav-link' style={isActive('/admin/products')}>
                            Products
                        </Link> */}
                        <NavDropdown title="Products" id="basic-nav-dropdown" >
                        <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/dashboard/1">All Products</NavDropdown.Item>
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


             {/* to go to products tools admin page */}
             {isAuth() && (isAuth().role ===4 ||isAuth().role ===5||isAuth().role ===7) && (
            <li className="nav-item text-center">
                
                    {/* <Link to='/admin/brands' className='nav-link' style={isActive('/admin/brands')}>
                        Brands
                    </Link> */}

                    <NavDropdown title="Tools" id="basic-nav-dropdown" >
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/brands">Brands</NavDropdown.Item>
                            
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addbrand">Add Brand</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/categories">Categories</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addcategory">Add Category</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addsubcategory">Add Sub-Category</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addclasscategory">Add Class-Category</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/stores">Stores</NavDropdown.Item>
                        
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addstore">Add Store</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/cities">Cities</NavDropdown.Item>
                        
                            <NavDropdown.Item onClick={()=>setSearchresult(false)} href="/admin/addcity">Add City</NavDropdown.Item>
                        </NavDropdown>
                
            </li>
            )}


         
            


            

            

            {/* to go to addcarousel admin page */}
            {isAuth() && (isAuth().role ===3 || isAuth().role ===4 ||isAuth().role ===5||isAuth().role ===7) && (
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
            {isAuth() && isAuth().role ===0 && isAuth().bcowner ===0 &&(
            // <li className="nav-item  text-center">
                
                    <Link onClick={()=>setSearchresult(false)} to='/private' className='nav-link font-weight-bold' style={isActive('/private')}>
                        {` ${isAuth().username}    `}
                        
                        <FaUserCircle  style={{color: '#ffffff',fontSize:'20'}} />
                    </Link>
                
            // </li>
            )}

            {/* to show the username on nav and go to private non-admin page */}
            {isAuth() && isAuth().role ===0 && isAuth().bcowner ===1 &&(
            // <li className="nav-item  text-center">
                
                    <Link onClick={()=>setSearchresult(false)} to='/bcowner' className='nav-link font-weight-bold' style={isActive('/bcowner')}>
                        {` ${isAuth().username}    `}
                        
                        <FaUserCircle  style={{color: '#ffffff',fontSize:'20'}} />
                    </Link>
                
            // </li>
            )}

        </nav>
        </DirectionProvider>
    );

    const newside = ()=>(
        <div>
            <div className="container-fluid bg-primary col-12">
            <div className="row">
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 className="page-header">Dashboard</h1>
            

            </div>
            </div>
            </div>
        </div>
    )

    const sidebar = ()=>(
        <div>
            {/* <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width: '280px', height: '100vh'}}> */}
                <div>
                    <div style={{height:'100vh'}}>
                        <h4 className='p-3'>Mosul Space</h4>
                        <hr></hr>
                        <ul className="list-group p-3" style={{width:'15vw'}}>
                            <li className=" bg-dark" style={{listStyleType:'none'}} >
                                <Link  to='/' className='nav-link list-group-item bg-dark' style={isActive('/')}>
                                    Dashboard
                                </Link>
                            </li>

                            <li className=" bg-dark" style={{listStyleType:'none'}} >
                                <Link  to='/admin/community' className='nav-link list-group-item bg-dark' style={isActive('/admin/community')}>
                                    Community
                                </Link>
                            </li>
                            <li className=" bg-dark" style={{listStyleType:'none'}}>
                                    <Link  to='/admin/programs' className='nav-link list-group-item bg-dark' style={isActive('/admin/programs')}>
                                        Programs
                                    </Link>
                            
                            
                                </li>
                            
                                <li className=" bg-dark" style={{listStyleType:'none'}}>
                                    <Link  to='/admin/events' className='nav-link list-group-item bg-dark' style={isActive('/admin/events')}>
                                        Activities
                                    </Link>
                            
                            
                                </li>
                                <li className=" bg-dark" style={{listStyleType:'none'}}>
                                    <Link  to='/admin/trainings' className='nav-link list-group-item bg-dark' style={isActive('/admin/trainings')}>
                                        Trainings
                                    </Link>
                            
                            
                                </li>
                                <li className=" bg-dark" style={{listStyleType:'none'}}>
                                    <Link  to='/admin/interns' className='nav-link list-group-item bg-dark' style={isActive('/admin/interns')}>
                                        Interns
                                    </Link>
                            
                            
                                </li>
                                <li className=" bg-dark" style={{listStyleType:'none'}}>
                                    <Link  to='/admin/startups' className='nav-link list-group-item bg-dark' style={isActive('/admin/startups')}>
                                        Startups
                                    </Link>
                            
                            
                                </li>
                                <li className=" bg-dark" style={{listStyleType:'none'}}>
                                    <Link  to='/admin/successstories' className='nav-link list-group-item bg-dark' style={isActive('/admin/successstories')}>
                                        Success Stories
                                    </Link>
                            
                            
                                </li>
                                <li className=" bg-dark" style={{listStyleType:'none'}}>
                                    <Link  to='/admin/recommendations' className='nav-link list-group-item bg-dark' style={isActive('/admin/recommandations')}>
                                        Recommandations
                                    </Link>
                            
                            
                                </li>
                                <li className=" bg-dark" style={{listStyleType:'none'}}>
                                    <Link  to='/admin/products' className='nav-link list-group-item bg-dark' style={isActive('/admin/products')}>
                                        Products
                                    </Link>
                            
                            
                                </li>
                                <li className=" bg-dark" style={{listStyleType:'none'}}>
                                    <Link  to='/admin/services' className='nav-link list-group-item bg-dark' style={isActive('/admin/services')}>
                                        Services
                                    </Link>
                            
                            
                                </li>
                                <li className=" bg-dark" style={{listStyleType:'none'}}>
                                    <Link  to='/admin/articles' className='nav-link list-group-item bg-dark' style={isActive('/admin/articles')}>
                                        Articles
                                    </Link>
                            
                            
                                </li>
                                <li className=" bg-dark" style={{listStyleType:'none', color:'#ffffff'}}>
                                    <Link   onClick={()=>signout()} className='nav-link list-group-item bg-dark' style={{color:'#ffffff'}}>
                                        Sign out
                                    </Link>
                            
                            
                                </li>
                           
                           
                        </ul>
                    {/* </div> */}
                </div>
        </div>
    </div>
    )

    return(
        <Fragment>
                <div>
                    {isAuth() ? null:<Redirect to='/signin'/>}
                    {isAuth() ? (<div  style={{display:'table', width:'100%', height:'100vh'}}>
                        <div className=" text-white bg-dark" style={{width: '15%', display:'table-cell', verticalAlign:'top'}}>
                        {sidebar()}
                    </div>
                    
                    <div className="bg-light" style={{width:'85%',display:'table-cell',verticalAlign:'top'}} >
                        {children}
                    </div>
                    </div>):(children)}
                </div>
            
            
        </Fragment>
    );
};

export default withRouter(Layout);