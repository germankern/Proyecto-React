import {memo} from 'react'
import Item from './Item';
import './itemList.css'

// Responsabilidad: mapear los productos. Luego renderiza un Item

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

export default memo(ItemList)