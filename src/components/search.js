// import React, { Fragment, useEffect, useState} from 'react';
// import {useParams} from 'react-router-dom'
// import Layout from '../core/layout';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import axios from 'axios';
// import loadingSpinner from '../components/loadingspinner'
// import ProductCards from '../components/productcards'
// // import SidbarCard from '../components/sidebarcard'
// // import Sidebar from "react-sidebar";
// import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';


// const url = process.env.REACT_APP_NODE



// const SearchPage = ()=>{

//     let { query } = useParams();
//     console.log(query)
//     // let query = params.match.params.query
//     // console.log('categoryid',categoryid)
//   const [loading, setLoading]=useState(true)
//   const [error, setError]=useState('')
//   const [products, setProducts]=useState({})
//   const [searchresult,setSearchresult]=useState(true)



//   useEffect(()=>{
    
//     axios.get(`${url}/search/${query}`)
//     .then(res => {
//         // console.log(res.data)
//         setProducts(res.data.products)
//         if(res.data.products==null || res.data.products == []){
//             setSearchresult(false)
//         }
//         setError('')
//         setTimeout(setLoading(false))
//     })   
//     .catch(error => {
//         setLoading(false)
//         setProducts({})
//         setError('Somthing went wrong')
//     })
//   }, [])

  

//   const Noresult =()=>(
//       <div>
//           <h1>
//               لاتوجد نتائج لعملية البحث هذه
//           </h1>
//       </div>
//   )


//   const Products = ()=> (
//     <div>
//       {/* <hr className='ml-4 mr-4 mt-0 mb-0 p-0' style={{border: '1px solid #ececec'}}></hr> */}
//       {/* <h3 className='text-center'>المنتجات</h3> */}
//       {/* <hr className='ml-4 mr-4 mt-0 mb-4 p-0' style={{border: '1px solid #ececec'}}></hr> */}
//       <div  className='container-fluid'>
//         <div className='row d-flex'>
//           {products.map((products,i)=>(<ProductCards key={i} products={products}/>))}
//         </div>
//       </div>
//       <hr className='ml-4 mr-4 mt-1 mb-5 p-0' style={{border: '1px solid #dedede'}}></hr>
//     </div>
//   )




//   return (
//     <Layout>
//           {error ? error : null}
//           <div className='container-fluid'>
//           {loading ? loadingSpinner():Products()}
//           {searchresult ? null:Noresult()}
//           </div>

//     </Layout>
//   )
// }

// export default SearchPage;
