// Escribir "rafce" (sniped ES7+React)

import CartWidget from "./CartWidget";
import './navBar.css';
import {Link, NavLink} from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="nav-container">
      <Link to="/">
        <h1>ArgZapas</h1>
      </Link>
      <ul className="ul-nav">
        <li>
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/category/running">Running</NavLink>
        </li>
        <li>
          <NavLink to="/category/tenis">Tenis</NavLink>
        </li>
        <li>
          <NavLink to="/category/botines">Botines</NavLink>
        </li>
      <Link to='/cart'>
        <CartWidget/>
      </Link>
      </ul>
    </nav>
    
  )
}

export default NavBar;