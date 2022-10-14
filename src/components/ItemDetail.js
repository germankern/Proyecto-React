import React from 'react'
import ItemCount from './ItemCount'
import './itemDetail.css'

const ItemDetail = ({item}) => {
  return (
    <div className='container-detail'>
        <img src={item.img} alt="" />
        <div className='container-description'>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <h4>${item.price}</h4>
            <ItemCount stock={12} initial={1}/>
        </div>
    </div>
  )
}

export default ItemDetail