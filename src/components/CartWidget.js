import React from 'react'
import Carrito from '../assets/carrito.png'
import './cartWidget.css'

const CartWidget = () => {
  return (  
          <div className='cont-img-carrito'>   
              <img className='img-carrito' src={Carrito}></img>
          </div>
  )
}

export default CartWidget