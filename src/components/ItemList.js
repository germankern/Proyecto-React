import React from 'react'
import Item from './Item';
import './itemList.css'

// Responsabilidad: mapear los productos.

const ItemList = ({items}) => {

  return (
    <div className='main-container-products'>
        {
            items.map((prod) => {
                return <Item prod={prod} key={prod.id}/>
            })
        }
    </div>
  )
}

export default ItemList