import React, {useState} from 'react'
import './itemCount.css'

const ItemCount = (props) => {
    const [count, setCount] = useState (props.initial);

    const sumar = () => {
        if (count < props.stock){
            setCount(count +1);
        }
    };

    const restar = () => {
        if (count > props.initial){
            setCount(count -1);
        }
    };

    return (
    <div className='container-count'>
        <div className='count-btn'> 
            <button className="btn" disabled={count === props.stock} onClick={sumar}>+</button>
            <p>{count}</p>
            <button className="btn" disabled={count === props.initial} onClick={restar}>-</button>
        </div>
        <button className='btn'>Agregar al carrito</button>
    </div>
    )
};

export default ItemCount