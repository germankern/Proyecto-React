import React from 'react'
import './cartWidget.css'
import { CartContext } from '../context/CartContext'
import { useContext } from 'react'

const CartWidget = () => {
  const { countItemsInCart } = useContext(CartContext)
  
  return (  
          <div className='cont-img-carrito'>
              <span 
                className={countItemsInCart() === 0 ? 'remove-span' : 'span'}>
                  {countItemsInCart()}
                <img 
                    className='img-carrito' 
                    src='/assets/carrito.png' 
                    alt='carrito de comrpas'> 
                </img>
              </span>
          </div>
  )
}

export default CartWidget