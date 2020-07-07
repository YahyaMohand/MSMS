import { CardText } from "react-bootstrap/Card"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {isAuth} from '../auth/helpers';
import axios from 'axios';
import cookie from 'js-cookie'



const url = process.env.REACT_APP_NODE

const userid = isAuth() ? JSON.parse(localStorage.getItem('user')).userid : 'notlogedin'
const token = cookie.get('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 


export const addItem = (item, next) => {
    
    // let bag = []
    // if(typeof window !== 'undefined'){
    //     if(localStorage.getItem('bag')){
    //         bag = JSON.parse(localStorage.getItem('bag'))
    //     }
    //     if(localStorage.getItem('bag')){
    //         let inbag = bag.find(({styleid})=>styleid === item.styleid)
    //         if(inbag){
    //         }else{
    //             bag.push({
    //                 ...item,
    //                 count: 1
    //             })
    //         }
    //     }else{
    //         bag.push({
    //             ...item,
    //             count: 1
    //         })
    //     }

    //     localStorage.setItem('bag', JSON.stringify(bag))
    //     next();
    // }

    //db bag
    axios({
        method: 'POST',
        // url: `${process.env.REACT_APP_ADMIN}/categories/create`,
        url: `${url}/bag/additem/${userid}`,
        data: { styleid:item.styleid, 
            productid:item.productid, 
            userid:userid,
            count:1
        }
    }).then(response =>{
        // console.log("Categories Added to database successfully", response);
        toast.success(response.data.message);
    })
    .catch(error => {
        // console.log('Operation ERROR', error.response.data)
        toast.error(error.response.data.error);
    })
    next()
}

// export const getBag = () => {

    // if(typeof window !== "undefined"){
    //     if(localStorage.getItem("bag")){
    //         return JSON.parse(localStorage.getItem("bag"));
    //     }
    // }
    // return[];
    // axios.get(`${url}/bag/${userid}`)
    // .then(res=>{
    //     console.log('bag inside'+res.data.bag)
    //     return  bag = res.data.bag;
        
    // }).catch(err=>{
    //     return err
    // })
    // console.log('bag is '+bag);
    // return bag;
// }


export const updateItem = (styleid, count) => {
    // let bag = []
    // if(typeof window !== 'undefined'){
    //     if(localStorage.getItem('bag')){
    //         bag = JSON.parse(localStorage.getItem('bag'))
    //     }

    //     bag.map((style,i)=>{if(style.styleid === styleid){
    //         bag[i].count = count
    //     }})

    //     localStorage.setItem('bag', JSON.stringify(bag))
    // }
    axios({
        url: `${url}/bag/update/${styleid}/${userid}`,
        method: 'PATCH',
        data:{count:count}
    })
}


export const removeItem = (styleid) => {
    // let bag = []
    // if(typeof window !== 'undefined'){
    //     if(localStorage.getItem('bag')){
    //         bag = JSON.parse(localStorage.getItem('bag'))
    //     }

    //     bag.map((style,i)=>{if(style.styleid === styleid){
    //         bag.splice(bag[i],1)
    //     }})

    //     localStorage.setItem('bag', JSON.stringify(bag))
    // }
    // return bag
    axios.delete(`${url}/bag/removeoneitem/${styleid}/${userid}`)
    // .then(res=>{
    //     console.log(res.data.message)
    // }).catch(err=>{
    //     console.log(err)
    // })
}
