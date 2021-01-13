import React, { Fragment, useEffect, useState} from 'react';
import Layout from './core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import CarouselBar from './components/carousel'
import loadingSpinner from './components/loadingspinner'
import ProductCards from './components/productcards'
import BrandCard from './components/brandcards'
import {Link} from 'react-router-dom'
// import SidbarCard from './components/sidebarcard'
// import Sidebar from "react-sidebar";
// import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';


const url = process.env.REACT_APP_NODE

const App = ()=>{

  const [loading, setLoading]=useState(true)
  const [error, setError]=useState('')
  const [carousels, setCarousels]=useState({})
  const [newproducts, setNewProducts]=useState({})
  const [brands, setBrands]=useState({})
  const [categories, setCategories]=useState({})
  const [salesproducts, setSalesproducts] = useState({})
  const [vipproducts, setVipproducts]=useState({})
  const [groups, setgroups]=useState({})
  const [subcategories,setsubcategories]=useState({})
  // const [makeupproducts, setMakeupproducts] = useState({})
  // const [skincareproducts, setSkincareproducts] = useState({})
  // const [hairproducts, setHairproducts] = useState({})
  // const [fragranceproducts, setFragranceproducts] = useState({})
  // const [menproducts, setMenproducts] = useState({})
  // const [giftproducts, setGiftproducts] = useState({})

  useEffect(()=>{
    axios.get(`${url}`)
    .then(res => {
      
        setCarousels(res.data.carousels)
        setNewProducts(res.data.newproducts)
        setSalesproducts(res.data.salesproducts)
        setVipproducts(res.data.vipproducts)
        setgroups(res.data.groups)
        setsubcategories(res.data.subcategories)
        // setMakeupproducts(res.data.makeupproducts)
        // setSkincareproducts(res.data.skincareproducts)
        // setHairproducts(res.data.hairproducts)
        // setFragranceproducts(res.data.fragranceproducts)
        // setMenproducts(res.data.menproducts)
        // setGiftproducts(res.data.giftproducts)
        setBrands(res.data.brands)
        setCategories(res.data.categories)
        setError('')
        setTimeout(setLoading(false)) 
    })   
    .catch(error => {
        setLoading(false)
        setCarousels({})
        setNewProducts({})
        setSalesproducts({})
        setVipproducts({})
        setgroups({})
        setsubcategories({})
        // setMakeupproducts({})
        // setSkincareproducts({})
        // setHairproducts({})
        // setFragranceproducts({})
        // setMenproducts({})
        // setGiftproducts({})
        setBrands({})
        setCategories({})
        setError('Somthing went wrong')
    })
  }, [])

  const SidbarCard = ({categories}) => (
   
    <div className='card m-1 shadow mx-auto btn btn-outline-warning p-3  mx-auto' style={{width:'12rem'}}>
        <a className=' active text-center mt-2 text-decoration-none' style={{color: '#000000', fontSize: 'large', fontWeight: 'bolder'}} href={`/categories/${categories.categoryid}`}>{categories.nameArabic}</a>
    </div>
  );

  const Subcategorycard = ({subcategories})=>{
    return(
        <div className='card m-3 shadow mx-auto' style={{width:'18rem'}}>
        <a href={`/subcategories/${subcategories.subcateid}`} style={{textDecoration: 'none'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${subcategories.logoPath}`} style={{borderRadius:'50%'}}/>
                <div className='card-body'>
                    <h5 className='card-title text-center'>
                        {`${subcategories.nameArabic}`}
                    </h5>
                </div>
                </a>
            </div>
    )
  }

  const subcategorieslist = ()=>(
    <div  className='container-fluid'>
        <div className='row d-flex'>
          {subcategories.map((subcategories,i)=>(<Subcategorycard key={i} subcategories={subcategories}/>))}
        </div>
      </div>
  )
  // console.log(carousels)
  const Slidder = () => (
    <div className='mb-3'>
      <Carousel autoPlay={true} interval={3000} showArrows={false} showThumbs={false} showStatus={false} showIndicators={true} infiniteLoop={true}>
          {carousels.map((carousels, i)=>(<CarouselBar key={i} carousels={carousels}/>))}
      </Carousel>
    </div>
  )

  const Groupcard = ({groups})=>{
    return(

        <div className='card m-3 shadow mx-auto' style={{width:'45rem'}}>
        <a href={`/groups/${groups.groupid}`} style={{textDecoration: 'none'}}>
                <img className='card-img-top' alt='product img' src={`${url}/${groups.image}`} />
                </a>
        </div>

    )
  }

  const grouplist =()=>(
    <div className='container-fluid'>
      <div className='row d-flex'>
       {groups.map((groups,i)=>(<Groupcard key={i} groups={groups}/>))}
      </div>
    </div>
  )
    
  

  const NewProducts = ()=> (
    <div>

      <div className='mx-auto p-3 text-center' style={{backgroundColor:'#fc2779'}}>
        {/* <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr> */}
        <h3 className='text-center' style={{color:'#ffffff'}}>احدث المنتجات</h3>
        {/* <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr> */}
      </div>
      <div  className='container-fluid'>
        <div className='row d-flex'>
          {newproducts.map((newproducts,i)=>(<ProductCards key={i} products={newproducts}/>))}
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
      <div  className='container-fluid'>
        <div className='row'>
          <Link style={{backgroundColor:'#562e48', color:'#ffffff', border: '#fc2779'}} to={{
            pathname: '/product/new'
          }} className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'><p className='font-weight-bolder my-auto mx-auto'>عرض الكل</p></Link>
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
    </div>
  )

  const SalesProducts = ()=> (
    <div>
      <div className='mx-auto p-3 text-center' style={{backgroundColor:'#fc2779'}}>
        {/* <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr> */}
        <h3 className='text-center' style={{color:'#ffffff'}}>التخفيضات</h3>
        {/* <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr> */}
      </div>
      <div  className='container-fluid'>
        <div className='row d-flex'>
          {salesproducts.map((salesproducts,i)=>(<ProductCards key={i} products={salesproducts}/>))}
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
      <div  className='container-fluid'>
      <div className='row'>
          <Link style={{backgroundColor:'#562e48', color:'#ffffff', border: '#fc2779'}} to={{
            pathname: '/product/sales'
          }} className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'><p className='font-weight-bolder my-auto mx-auto'>عرض الكل</p></Link>
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
    </div>
  )

  const VipProducts = ()=> (
    <div>
      <div className='mx-auto p-3 text-center' style={{backgroundColor:'#fc2779'}}>
        {/* <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr> */}
        <h3 className='text-center' style={{color:'#ffffff'}}>المنتجات المتميزة</h3>
        {/* <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr> */}
      </div>
      <div  className='container-fluid'>
        <div className='row d-flex'>
          {vipproducts.map((salesproducts,i)=>(<ProductCards key={i} products={salesproducts}/>))}
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
      <div  className='container-fluid'>
      <div className='row'>
          <Link style={{backgroundColor:'#562e48', color:'#ffffff', border: '#fc2779'}} to={{
            pathname: '/product/vip'
          }} className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'><p className='font-weight-bolder my-auto mx-auto'>عرض الكل</p></Link>
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
    </div>
  )

  // const MakeupProducts = ()=> (
  //   <div>
  //     <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <h3 className='text-center'>منتجات المكياج</h3>
  //     <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row d-flex'>
  //         {makeupproducts.map((makeupproducts,i)=>(<ProductCards key={i} products={makeupproducts}/>))}
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row'>
  //         <a href='#' className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'>عرض الكل</a>
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
  //   </div>
  // )

  // const SkincareProducts = ()=> (
  //   <div>
  //     <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <h3 className='text-center'>منتجات العناية بالبشرة</h3>
  //     <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row d-flex'>
  //         {skincareproducts.map((skincareproducts,i)=>(<ProductCards key={i} products={skincareproducts}/>))}
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row'>
  //         <a href='#' className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'>عرض الكل</a>
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
  //   </div>
  // )

  // const HairProducts = ()=> (
  //   <div>
  //     <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <h3 className='text-center'>منتجات الشعر</h3>
  //     <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row d-flex'>
  //         {hairproducts.map((hairproducts,i)=>(<ProductCards key={i} products={hairproducts}/>))}
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row'>
  //         <a href='#' className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'>عرض الكل</a>
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
  //   </div>
  // )

  // const FragranceProducts = ()=> (
  //   <div>
  //     <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <h3 className='text-center'>منتجات العطور</h3>
  //     <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row d-flex'>
  //         {fragranceproducts.map((fragranceproducts,i)=>(<ProductCards key={i} products={fragranceproducts}/>))}
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row'>
  //         <a href='#' className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'>عرض الكل</a>
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
  //   </div>
  // )

  // const MenProducts = ()=> (
  //   <div>
  //     <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <h3 className='text-center'>منتجات الرجال</h3>
  //     <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row d-flex'>
  //         {menproducts.map((menproducts,i)=>(<ProductCards key={i} products={menproducts}/>))}
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row'>
  //         <a href='#' className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'>عرض الكل</a>
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
  //   </div>
  // )

  // const GiftProducts = ()=> (
  //   <div>
  //     <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <h3 className='text-center'>الهدايا</h3>
  //     <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row d-flex'>
  //         {giftproducts.map((giftproducts,i)=>(<ProductCards key={i} products={giftproducts}/>))}
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
  //     <div  className='container-fluid'>
  //       <div className='row'>
  //         <a href='#' className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'>عرض الكل</a>
  //       </div>
  //     </div>
  //     <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
  //   </div>
  // )

  const Brands = ()=> (
    <div>
        <div className='mx-auto p-3 text-center' style={{backgroundColor:'#fc2779'}}>
        {/* <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr> */}
        <h3 className='text-center' style={{color:'#ffffff'}}>البراندات والماركات</h3>
        {/* <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr> */}
      </div>
      <div className='container-fluid'>
        <div className='row d-flex'>
          {brands.map((brands,i)=>(<BrandCard key={i} brands={brands}/>))}
        </div>
        
      </div>
      <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
      <div  className='container-fluid'>
      <div className='row'>
          <Link style={{backgroundColor:'#562e48', color:'#ffffff', border: '#fc2779'}} to={{
            pathname: '/brands'
          }} className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'><p className='font-weight-bolder my-auto mx-auto'>عرض الكل</p></Link>
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
    </div>
  )

  const SidbarNav = ()=> (
      
      <div className='mt-3 mb-3' style={{backgroundColor: '#ffffff'}}>
        
        <div className=''>
        {/* <h4 className='text-center mt-3' > الأصناف الرئيسية</h4> */}
        {/* <hr></hr> */}
          <div className='row d-flex'>
            {categories.map((categories,i)=>(<SidbarCard key={i} categories={categories}/>))}
          </div>
        </div>
      </div>

  )

  return (
    <Layout>
          {error ? error : null}
          
          {/* <main role='main' className='col-md-9 ml-sm-auto col-lg-10 p-0'> */}
          <div className='container-fluid'>
            {loading ? loadingSpinner():Slidder()}
            {/* {loading ? loadingSpinner():SidbarNav()} */}
            {loading ? null:subcategorieslist()}
            {loading ? null: grouplist()}
            {/* {loading ? loadingSpinner():VipProducts()} */}
            {loading ? loadingSpinner():NewProducts()}
            {loading ? loadingSpinner():SalesProducts()}
            {loading ? loadingSpinner():Brands()}
            {/* {loading ? loadingSpinner():MakeupProducts()} */}
            {/* {loading ? loadingSpinner():SkincareProducts()} */}
            {/* {loading ? loadingSpinner():HairProducts()} */}
            {/* {loading ? loadingSpinner():FragranceProducts()} */}
            {/* {loading ? loadingSpinner():MenProducts()} */}
            {/* {loading ? loadingSpinner():GiftProducts()} */}
          {/* </main> */}
          </div>
    </Layout>
  )
}

export default App;
