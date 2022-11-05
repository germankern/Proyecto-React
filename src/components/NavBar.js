// Escribir "rafce" (sniped ES7+React)

import CartWidget from "./CartWidget";
import './navBar.css';
import {Link, NavLink} from 'react-router-dom'
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../services/fireBaseConfig";
import { useState } from "react";

const NavBar = () => {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const categoriesCollection = collection(dataBase, 'categories');
    getDocs(categoriesCollection)
      .then((res) => {
          const categories = res.docs.map((cat) => {
            return {
              id: cat.id,
              ...cat.data()
            }
          })
          setCategory(categories)
      })
      .catch((error) => {
          console.log(error)
      })
  }, [])
  
  return (
    <nav className="nav-container">
      <Link to="/">
        <h1>ArgZapas</h1>
      </Link>
      <ul className="ul-nav">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {category.map((cat) => {
          return (
                <NavLink className='nav-link' key ={cat.id} to={`/category/${cat.path}`}>{cat.name}</NavLink>
              )
          })
        }
      <Link to='/cart'>
        <CartWidget/>
      </Link>
      </ul>
    </nav>
    
  )
}

export default NavBar;