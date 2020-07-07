import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const url = process.env.REACT_APP_NODE

const CarouselBar = ({carousels}) => (
    
        <div>
            <a href={carousels.link}>
                <img src={`${url}/${carousels.image}`} className='d-block w-100' alt={carousels.notes}/>
            </a>
        </div>
);

export default CarouselBar