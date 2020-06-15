import React, { Fragment, useEffect, useState} from 'react';
import Layout from './core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import CarouselBar from './components/carousel'
import loadingSpinner from './components/loadingspinner'
import ProductCards from './components/productcards'
import BrandCard from './components/brandcards'
// import SidbarCard from './components/sidebarcard'
// import Sidebar from "react-sidebar";
// import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

const url = 'http://localhost:8000'

const App = ()=>{

  const [loading, setLoading]=useState(true)
  const [error, setError]=useState('')
  const [carousels, setCarousels]=useState({})
  const [products, setProducts]=useState({})
  const [brands, setBrands]=useState({})
  const [categories, setCategories]=useState({})


  useEffect(()=>{
    axios.get(`${url}`)
    .then(res => {
      
        setCarousels(res.data.carousels)
        setProducts(res.data.products)
        setBrands(res.data.brands)
        setCategories(res.data.categories)
        setError('')
        setTimeout(setLoading(false)) 
    })   
    .catch(error => {
        setLoading(false)
        setCarousels({})
        setProducts({})
        setBrands({})
        setCategories({})
        setError('Somthing went wrong')
    })
  }, [])

  const SidbarCard = ({categories}) => (
   
    <li className='nav-item list-group-item'>
        <a className='nav-link active text-center mt-2' style={{color: '#000000', fontSize: 'large', fontWeight: 'bolder'}} href={`/categories/${categories.categoryid}`}>{categories.nameArabic}</a>
    </li>
  );
  // console.log(carousels)
  const Slidder = () => (
    <div className='mb-3'>
      <Carousel autoPlay={true} interval={3000} showArrows={false} showThumbs={false} showStatus={false} showIndicators={true} infiniteLoop={true}>
          {carousels.map((carousels, i)=>(<CarouselBar key={i} carousels={carousels}/>))}
      </Carousel>
    </div>
  )

  const Products = ()=> (
    <div>
      <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
      <h3 className='text-center'>المنتجات</h3>
      <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr>
      <div  className='container-fluid'>
        <div className='row'>
          {products.map((products,i)=>(<ProductCards key={i} products={products}/>))}
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
      <div  className='container-fluid'>
        <div className='row'>
          <a href='#' className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'>عرض الكل</a>
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
    </div>
  )

  const Brands = ()=> (
    <div>
            <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
      <h3 className='text-center'>البراندات</h3>
      <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr>
      <div className='container-fluid'>
        <div className='row'>
          {brands.map((brands,i)=>(<BrandCard key={i} brands={brands}/>))}
        </div>
        
      </div>
      <hr className='ml-4 mr-4 mt-3 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr>
      <div  className='container-fluid'>
        <div className='row'>
          <a href='#' className='btn btn-primary btn-block text-center ml-5 mr-5 mt-2 mb-1'>عرض الكل</a>
        </div>
      </div>
      <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
    </div>
  )

  const SidbarNav = ()=> (
      
      <nav className='col-md-2 d-none d-md-block sidebar' style={{backgroundColor: '#F3F3F3'}}>
        
        <div className='sidebar-sticky ' >
        <h4 className='text-center mt-3' > الأصناف الرئيسية</h4>
        <hr></hr>
          <ul className='nav list-group flex-column'>
            {categories.map((categories,i)=>(<SidbarCard key={i} categories={categories}/>))}
          </ul>
        </div>
      </nav>

  )

  return (
    <Layout>
          {error ? error : null}
          {loading ? loadingSpinner():SidbarNav()}
          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 p-0'>
            {loading ? loadingSpinner():Slidder()}
            {loading ? loadingSpinner():Products()}
            {loading ? loadingSpinner():Brands()}
          </main>

    </Layout>
  )
}

export default App;
