import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuth, signout} from '../auth/helpers';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import {NavDropdown} from 'react-bootstrap'
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare, FaSnapchatSquare } from 'react-icons/fa';

const Layout = ({children,match,history}) =>{

    const isActive = path =>{
        if(match.path === path){
            return{color: '#fff', fontSize: '1.2rem'};
        }else{
            return{color: '#f2f2f2'};
        }
    };

    const nav = ()=>(
        <DirectionProvider direction={DIRECTIONS.RTL}>
        <ul className="nav nav-tabs navbar navbar-expand-lg" style={{backgroundColor: '#562e48', color: '#ffffff'}}>
            <div className='container d-flex flex-column flex-md-row justify-content-between'>
            <li className="nav-item">
                <Link to="/" className=" nav-link" style={isActive('/')}>
                    <img height='40px' src={window.location.origin + '/kwaysi.png'} alt='kwaysi'></img>
                </Link>
            </li>


            <li className="nav-item">
                
                <Link to='/brands' className='nav-link font-weight-bold' style={isActive('/brands')}>
                    البراندات
                </Link>
            
            </li>

           {!isAuth() && (
               <Fragment>
                    <li className="nav-item">
                <Link to="/signin" className=" nav-link font-weight-bold" style={isActive('/signin')}>
                    تسجيل الدخول
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/signup" className=" nav-link font-weight-bold" style={isActive('/signup')}>
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
            <li className="nav-item">
                
                    <Link to='/admin/orders' className='nav-link' style={isActive('/admin/orders')}>
                        Orders
                    </Link>
                
            </li>
            )}

             {/* to go to products admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item">
                
                        {/* <Link to='/admin/products' className='nav-link' style={isActive('/admin/products')}>
                            Products
                        </Link> */}
                        <NavDropdown title="Products" id="basic-nav-dropdown" >
                            <NavDropdown.Item href="/admin/products">Products</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/admin/addproduct">Add Product</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/admin/addstyle">Add Style</NavDropdown.Item>
                        </NavDropdown>
                
            </li>
            )}


             {/* to go to brands admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item">
                
                    {/* <Link to='/admin/brands' className='nav-link' style={isActive('/admin/brands')}>
                        Brands
                    </Link> */}

                    <NavDropdown title="Brands" id="basic-nav-dropdown" >
                            <NavDropdown.Item href="/admin/brands">Brands</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/admin/addbrand">Add Brand</NavDropdown.Item>
                        </NavDropdown>
                
            </li>
            )}


            {/* to go to categories admin page */}
            {isAuth() && isAuth().role ===1 && (
            <li className="nav-item">
                
                    {/* <Link to='/admin/categories' className='nav-link' style={isActive('/admin/categories')}>
                        Categories
                    </Link> */}
                    <NavDropdown title="Categories" id="basic-nav-dropdown" >
                            <NavDropdown.Item href="/admin/categories">Categories</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/admin/addcategory">Add Category</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/admin/addsubcategory">Add Sub-Category</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/admin/addclasscategory">Add Class-Category</NavDropdown.Item>
                        </NavDropdown>
                
            </li>
            )}


             {/* to go to stores admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item">
                
                    {/* <Link to='/admin/stores' className='nav-link' style={isActive('/admin/stores')}>
                        Stores
                    </Link> */}
                    <NavDropdown title="Stores" id="basic-nav-dropdown" >
                        <NavDropdown.Item href="/admin/stores">Stores</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/admin/addstore">Add Store</NavDropdown.Item>
                    </NavDropdown>
                
            </li>
            )}

             {/* to go to cities admin page */}
             {isAuth() && isAuth().role ===1 && (
            <li className="nav-item" >
                
                    {/* <Link to='/admin/cities' className='nav-link' style={isActive('/admin/cities')}>
                        Cities
                    </Link> */}
                    <NavDropdown title="Cities" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/admin/cities">Cities</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/admin/addcity">Add City</NavDropdown.Item>
                    </NavDropdown>
                
            </li>
            )}

            {/* to go to addcarousel admin page */}
            {isAuth() && isAuth().role ===1 && (
            <li className="nav-item">
                
                    {/* <Link to='/admin/addcarousel' className='nav-link' style={isActive('/admin/addcarousel')}>
                        Add Carousel
                    </Link> */}
                    <NavDropdown title="Carousel" id="basic-nav-dropdown" >
                        <NavDropdown.Item href="/admin/carousels">Carousels</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/admin/addcarousel">Add Carousel</NavDropdown.Item>
                    </NavDropdown>
                
            </li>
            )}


               {/* to show the bag on nav for user*/}
               {isAuth() && isAuth().role ===0 && (
            <li className="nav-item">
                
                    <Link to='/bag' className='nav-link' style={isActive('/bag')}>
                        الحقيبة
                        {localStorage.getItem('bag') ? <sup className='badge' style={{backgroundColor: '#fc2779'}} >
                            <small className='' style={{fontSize: 'small'}}>{JSON.parse(localStorage.getItem('bag')).length}</small>
                        </sup> : null}
                    </Link>
                
            </li>
            )}

                {/* to show the username on nav and go to private non-admin page */}
                {isAuth() && isAuth().role ===0 && (
            <li className="nav-item">
                
                    <Link to='/private' className='nav-link' style={isActive('/private')}>
                        {`أهلا، ${isAuth().username}`}
                    </Link>
                
            </li>
            )}

           {/* signout nav if noth authenticated */}
           {isAuth() && (
            <li className="nav-item">
                <span className='nav-link'
                    style={{cursor:'pointer', color:'#ff9009'}}
                 onClick={()=>{
                    signout(() => {
                        history.push('/')
                    })
                }}
                >
                    تسجيل الخروج
                </span>
            </li>
           )}

           
           </div>
        </ul>
        </DirectionProvider>
    );

    const Footer = ()=>(
        <footer className='py-5 ' style={{backgroundColor: '#562e48', color: '#ffffff', width: '100%'}}>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md'>
                        <img height='60px' src={window.location.origin + '/kwaysi.png'} alt='logo'></img>
                        <br></br>
                        <div className='m-3'>
                            <Link to='https://www.facebook.com/kwaysistore/' ><FaFacebookSquare  style={{fontSize: '1.8rem', color: 'white'}} /> </Link>
                            <Link to='https://www.instagram.com/kwaysistore/' ><FaInstagramSquare  style={{fontSize: '1.8rem', color: 'white'}} /> </Link>
                            <Link to='https://www.youtube.com/channel/UCHDDkqwMnd4uc-8NSWN1MzA' ><FaYoutubeSquare  style={{fontSize: '1.8rem', color: 'white'}} /> </Link>
                            <Link to='#' ><FaSnapchatSquare style={{fontSize: '1.8rem', color: 'white'}} /> </Link>
                        </div>
                    </div>
                    <div className='col-6 col-md'>
                       <h4>التواصل</h4>
                       <p className='mt-3'>+964 750 330 5680</p>
                       <p>info@kwaysi.com</p>
                    </div>
                    <div className='col-6 col-md'>
                        <h4>العنوان</h4>
                        <p className='mt-3'>الموصل</p>
                        <p>41001</p>
                        <p>نينوى</p>
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
            {nav()}
            <div className='container-fluid'>
                <div className='row' style={{backgroundColor: '#FDFDFB'}}>
                    {children}
                </div>
            </div>
            {Footer()}
        </Fragment>
    );
};

export default withRouter(Layout);