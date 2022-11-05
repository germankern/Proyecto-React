import { useContext } from 'react';
import { useState } from 'react';
import { CartContext } from '../context/CartContext'
import ItemCount from './ItemCount';
import './itemDetail.css';
import Cart from './Cart';

const ItemDetail = ({item}) => {
    const [unidades, setUnidades] = useState(0);

    const { addToCart } = useContext(CartContext)

    const setter = (numero) => {
      setUnidades(numero);
      addToCart(item, numero);
    }


  return (
    <div >
      {unidades === 0 ?
        <div className='container-detail'>
        <img src={item.img} alt="" />
        <div className='container-description'>
            <h2 className='container-description-title'>{item.title}</h2>
            <p>{item.description}</p>
        </div>
        <h4 className='detail-price'>${item.price}</h4>
          <ItemCount setter={setter} stock={item.stock} initial={1}/>
        </div>
          :
        <Cart/>} 
    </div>
  )
}

export default ItemDetail