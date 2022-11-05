import React, { useState } from 'react'
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

    const addCart = () =>{
        props.setter(count);
    }

    return (
    <div>
        {props.stock === 0 ? <h5 className='sin-stock'>Agotado</h5>
            :<div className='container-count'>
                <div className='count-btn'> 
                    <button className="btn" 
                            disabled={count === props.initial} 
                            onClick={restar}>-
                    </button>
                            <p>{count}</p>
                    <button className="btn" 
                            disabled={count === props.stock} 
                            onClick={sumar}>+
                    </button>
                </div>
                <p className='p-stock'>{props.stock} disponibles</p>
                <button onClick={addCart} className='btn'>
                    Agregar al carrito
                </button>
            </div>}
    </div>
    )
};

export default ItemCount