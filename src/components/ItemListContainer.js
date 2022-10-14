import React, { useEffect, useState } from 'react'
import ItemList from './ItemList'
import {products} from '../mockAPI/productsMock'
import './itemListContainer.css'
import {useParams} from 'react-router-dom' 

// Responsabilidad: Traer nuestros productos a travéz de una promesa y guardarlos en el estado.

const ItemListContainer = ({greeting}) => {
  const [items, setItems] = useState([]);
  // estado

  const {id} = useParams();

  useEffect(()=>{
    const getProducts = () => {
      return new Promise ((res, rej) =>{
        const prodFilter = products.filter((prod)=> prod.category === id);
        
        const prod = id ? prodFilter : products;
        setTimeout(() => {
          res(prod);
        }, 500);
      });
    };
    getProducts()
        .then((respuesta) => {
          setItems(respuesta)
        })
        .catch((error) => {
          console.log(error)
        });
  }, [id]);

// Primero va a retornar y despues leer el useEffect
  return (
    <>
    <div className='marca'>
      Somos {greeting}
    </div>
    <main>
      <div>
        <ItemList items={items}/>
      </div>
    </main>
    </>
  );
};

export default ItemListContainer