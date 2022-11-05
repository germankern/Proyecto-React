import React, { useEffect, useState } from 'react'
import ItemDetail from './ItemDetail'
// import { products } from '../mockAPI/productsMock'
import { useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { collection, getDoc, doc } from 'firebase/firestore';
import { dataBase } from '../services/fireBaseConfig';

// Responsabilidad: Traer nuestros productos a travéz de una promesa y guardarlos en el estado.

const ItemDetailContainer = ({greeting}) => {
  const [item, setItem] = useState([]);

  const [loading, setLoading] = useState(true);

  const {id} = useParams();
  // estado

  useEffect(()=>{
      const collectionProducts = collection(dataBase, 'products')
      const reference = doc(collectionProducts, id)

      getDoc(reference)
        .then((res) => {
          setItem({
              id: res.id,
              ...res.data(),
          });
          setLoading(false)
        })
        .catch((error) => {
                console.log(error)
        });
      return () => setLoading(true);
  }, [id]);

// Primero va a retornar y despues leer el useEffect
  return (
    <>
    <div>
      { loading?
        <div className='div-loading'>
          <HashLoader color="rgb(95, 0, 185)"/>
        </div>
        :
        <ItemDetail item={item}/>
      }
    </div>
    </>
  );
};

export default ItemDetailContainer


// const getProduct = () => {
//   return new Promise ((res, rej) =>{
//     const product = products.find((prod)=> prod.id === Number(id))
//     setTimeout(() => {
//       res(product);
//     }, 1200)
//   });
// };
// getProduct()
//     .then((respuesta) => {
//       setItem(respuesta)
//       setLoading(false)
//     })
//     .catch((error) => {
//       console.log(error)
//     });
// return () => setLoading(true);