import React from 'react'
import Carrito from '../assets/carrito.png'
import './cartWidget.css'

const CartWidget = () => {
  return (  
          <div className='cont-img-carrito'>   
              <span className='span'>0
                <img className='img-carrito' src={Carrito}></img>
              </span>
          </div>
  )
}

export default CartWidget