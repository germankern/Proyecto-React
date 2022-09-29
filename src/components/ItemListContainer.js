import React from 'react'
import './itemListContainer.css'

const ItemListContainer = ({greeting}) => {
  return (
    <div className='marca'>
      Somos {greeting}
    </div>
  )
}

export default ItemListContainer