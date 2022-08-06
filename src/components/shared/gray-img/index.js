import React  from 'react';
import './styles.css';

const GrayImg = (props)=>{
    return(
        <img alt ="" className={props.gray? "gray-img": "color-img"}src={props.img_url}></img>
    )
}
export default GrayImg;