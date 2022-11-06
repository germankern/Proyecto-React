import React, { useEffect, useState } from 'react'
import ItemDetail from './ItemDetail'
import { useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { collection, getDoc, doc } from 'firebase/firestore';
import { dataBase } from '../services/fireBaseConfig';


const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);

  const [loading, setLoading] = useState(true);

  const {id} = useParams();

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
