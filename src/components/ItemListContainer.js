import React, { useEffect, useState } from 'react'
import ItemList from './ItemList'
import './itemListContainer.css'
import { useParams } from 'react-router-dom' 
import HashLoader from "react-spinners/HashLoader";
import {collection, getDocs, query, where} from 'firebase/firestore';
import {dataBase} from '../services/fireBaseConfig'

// Responsabilidad: Traer nuestros productos a travéz de una promesa y guardarlos en el estado.

const ItemListContainer = ({greeting}) => {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const {id} = useParams();
// Le llega del {id} parametro y pinta la categoria.
  useEffect(()=>{
      const collectionProducts = collection(dataBase, 'products')
      
      const queryFilter = id ? 
                          query(collectionProducts, where('category', '==', id)) 
                        : collectionProducts;
      
      getDocs(queryFilter) 
      .then((res) => {
        const products = res.docs.map((prod) => {
          return {
            id: prod.id,
            ...prod.data(),
          }
        })
        setItems(products)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      });
      return () => setLoading(true);
  }, [id]); //el use efect esta atento al parametro ID, si cambia lo vuelve a renderizar.

// Primero va a retornar y despues leer el useEffect
  return (
    <>
      <div className='marca'>
        Somos {greeting}
      </div>
      <main>
        { loading ?
            <div className='div-loading'>
                <HashLoader color="rgb(95, 0, 185)"/>
            </div>
            :
            <div>
              <ItemList items={items}/>
            </div>
        }
      </main>
    </>
  );
};

export default ItemListContainer

