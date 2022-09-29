// Escribir "rafce" (sniped ES7+React)

import CartWidget from "./CartWidget"
import './navBar.css'

const NavBar = () => {
  return (
    <nav className="nav-container">
      <ul className="ul-nav">
        <li>
          <a href="#">Mujer</a>
        </li>
        <li>
          <a href="#">Hombre</a>
        </li>
        <li>
          <a href="#">Niños</a>
        </li>
        <li>
          <a href="#">Ofertas</a>
        </li>
      <CartWidget className="carrito"/>
      </ul>
    </nav>
    
  )
}

export default NavBar;