import { CardText } from "react-bootstrap/Card"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const addItem = (item, next) => {
    let bag = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('bag')){
            bag = JSON.parse(localStorage.getItem('bag'))
        }
        if(localStorage.getItem('bag')){
            let inbag = bag.find(({styleid})=>styleid === item.styleid)
            if(inbag){
            }else{
                bag.push({
                    ...item,
                    count: 1
                })
            }
        }else{
            bag.push({
                ...item,
                count: 1
            })
        }

        localStorage.setItem('bag', JSON.stringify(bag))
        next();
    }
}

export const getBag = () => {
    if(typeof window !== "undefined"){
        if(localStorage.getItem("bag")){
            return JSON.parse(localStorage.getItem("bag"));
        }
    }
    return[];
}


export const updateItem = (styleid, count) => {
    let bag = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('bag')){
            bag = JSON.parse(localStorage.getItem('bag'))
        }

        bag.map((style,i)=>{if(style.styleid === styleid){
            bag[i].count = count
        }})

        localStorage.setItem('bag', JSON.stringify(bag))
    }
}


export const removeItem = (styleid) => {
    let bag = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('bag')){
            bag = JSON.parse(localStorage.getItem('bag'))
        }

        bag.map((style,i)=>{if(style.styleid === styleid){
            bag.splice(bag[i],1)
        }})

        localStorage.setItem('bag', JSON.stringify(bag))
    }
    return bag
}
