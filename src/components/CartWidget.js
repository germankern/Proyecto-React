import React from 'react'
import './cartWidget.css'

const CartWidget = () => {
  return (  
          <div className='cont-img-carrito'>   
              <span className='span'>0
                <img className='img-carrito' src='/assets/carrito.png'></img>
              </span>
          </div>
  )
}

export default CartWidget