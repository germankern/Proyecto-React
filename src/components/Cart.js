import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import ItemListContainer from './ItemListContainer';
import { Link } from 'react-router-dom';
import './cart.css'


const Cart = () => {
  const { cart, deleteAll, deleteItem, subtotal, totalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return <ItemListContainer to='/' greeting={"ArgenZapas.com"}/>
  }
  else {
  return (
    <div className='cart-container'>
        {cart.map((prod)=>(
            <div className='cart-items' key={prod.id}>
                <img  className='cart-img' 
                      src={prod.img} 
                      alt={prod.title} />
                  <div className='cart-detail'>
                      <h3 className='cart-detail-title'>{prod.title}</h3>
                      <h4 className='cart-detail-price'>$ {prod.price}</h4>
                      <h4 className='cart-detail-cantidad'>Cantidad: {prod.cantidad}</h4>
                  </div>
                  <div className='cart-cont-delete-item'>
                    <h5 className='cart-subtotal'>Subtotal:${subtotal(prod.cantidad , prod.price)} </h5>
                    <button className='cart-delete-item'
                            onClick={()=>deleteItem(prod.id)}>
                              Eliminar
                    </button>
                  </div>
            </div>
        ))
        }
        <button className='cart-delete-item'
                onClick={deleteAll}>Vaciar Carrito
        </button>
        <h3 className='cart-total-price'>Total a Pagar: ${totalPrice()}</h3>
        <Link  className='btn-cart-comprar' to='/form'>Comprar</Link>
    </div>
  )}
}

export default Cart