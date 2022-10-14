import React, { useEffect, useState } from 'react'
import ItemDetail from './ItemDetail'
import { products } from '../mockAPI/productsMock'
import { useParams } from 'react-router-dom';

// Responsabilidad: Traer nuestros productos a travéz de una promesa y guardarlos en el estado.

const ItemDetailContainer = ({greeting}) => {
  const [item, setItem] = useState([]);

  const {id} = useParams();
  // estado

  useEffect(()=>{
    const getProduct = () => {
      return new Promise ((res, rej) =>{
        const product = products.find((prod)=> prod.id === Number(id))
        setTimeout(() => {
          res(product);
        }, 400)
      });
    };
    getProduct()
        .then((respuesta) => {
          setItem(respuesta)
        })
        .catch((error) => {
          console.log(error)
        });
  }, []);

// Primero va a retornar y despues leer el useEffect
  return (
    <>
    <div>
      <ItemDetail item={item}/>
    </div>
    </>
  );
};

export default ItemDetailContainer