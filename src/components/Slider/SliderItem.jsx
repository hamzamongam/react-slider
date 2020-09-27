import React from 'react';

const SliderItem = ({image,title}) => {
    return ( 
        <div style={{backgroundImage:`url(${image})`}} className="slider-item" >
              <div className="slider-content">
    <h3>{title}</h3>
              </div>
        </div>
     );
}
 
export default SliderItem;