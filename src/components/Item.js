import React from 'react'
import './item.css'
import { Link } from 'react-router-dom'

const Item = ({prod}) => {

  return (
    <Link to={`/items/${prod.id}`}>
      <article className='container-products'>
      {prod.stock === 0? 
            <h6 className='agotado'>Agotado</h6> 
            : 
          (prod.stock <= 6? 
            <h6 className='agotado'>Pocas Unidades</h6>
            :
            <></>)
      }
          <img className='img-products'
              src={prod.img} 
              alt={prod.title} 
          />
          <div className='price'>
            <h4>${prod.price}</h4>
          </div>
          <div className='card-product'>
              <h2>{prod.title}</h2>
              <h5>#{prod.category}</h5>
          </div>
      </article>
    </Link>
  )
}

export default Item