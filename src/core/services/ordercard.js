import React from 'react';
import {Link} from 'react-router-dom'

const OrderCard = ({orders}) => {

    function formatedDate(x){
        const birthday = new Date(x)
        const day = birthday.getDate();
        const mon = birthday.getMonth()+1;
        const year = birthday.getFullYear();
        return (`${day}/${mon}/${year}`);
    }

    function formatedTime(x){
        const birthday = new Date(x).toLocaleTimeString('en-IQ')
        return birthday
    }


    return(             
        <li className='list-group-item'>
            <Link 
            style={{textDecoration: 'none', color: 'black'}}
            to={{
                pathname: `orders/${orders.orderid}`
            }}>
            <div className='row text-center'>
                <div className='col'><p>{orders.orderid}</p></div>
                <div className='col'><p>{formatedDate(orders.createDate)}</p></div>
                <div className='col'><p>{formatedTime(orders.createDate)}</p></div>
                <div className='col'><p>{orders.orderstatus}</p></div>
                <div className='col'><p>{orders.notes}</p></div>
                <div className='col'><Link to={{
                    pathname: `orders/suppliers/${orders.orderid}`
                }}
                className='btn btn-warning'
                >Supplier</Link></div>
            </div>
            </Link>
        </li>        
    )
}

export default OrderCard