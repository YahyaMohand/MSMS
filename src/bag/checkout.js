import React, { Fragment,Redirect, useEffect, useState} from 'react';
import Layout from '../core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import loadingSpinner from '../components/loadingspinner'
import {getBag, updateItem, removeItem} from '../bag/baghelper'
import {isAuth} from '../auth/helpers';
import BagCard from './bagcard'



export const TotalPrice =({products})=>{
    function numcoma(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    const getTotalPrice = () => {
        return products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price;
        },0);
    };


    return (
        <div>
            <h6 className='m-0'>{numcoma(getTotalPrice())}</h6>
        </div>
    )
}

export const TotalDiscountPrice =({products})=>{

    function numcoma(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  const getTotalDiscountPrice = () => {
        return products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.discountPrice;
        },0);
    };
    


    return (
        <div>
            <h6>{numcoma(getTotalDiscountPrice())}</h6>
        </div>
    )
}

export const FinalTotal =({products,cities,cityid})=>{

    function numcoma(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


  const getTotalDiscountPrice = () => {
        let sum = products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.discountPrice
        },0);

        var selectedcity = cities.filter((cost)=>{
            return cost.cityid == cityid
          })
        return sum+selectedcity[0].shippingCost


    };
    


    return (
        <div>
            <h6>{numcoma(getTotalDiscountPrice())}</h6>
        </div>
    )
}

export const Shippingcost = ({cities,cityid})=>{
    function numcoma(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getShippingcost = ()=>{
        var selectedcity = cities.filter((cost)=>{
            return cost.cityid == cityid
          })
        return selectedcity[0].shippingCost
    }
    
    return(
        <div>
            <h6>{numcoma(getShippingcost())}</h6>
        </div>
    )
      
   
}

