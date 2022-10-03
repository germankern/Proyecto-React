// Escribir "rafce" (sniped ES7+React)

import CartWidget from "./CartWidget"
import './navBar.css'

const NavBar = () => {
  return (
    <nav className="nav-container">
      <h1>ArgZapas</h1>
      <ul className="ul-nav">
        <li>
          <a href="#">Inicio</a>
        </li>
        <li>
          <a href="#">Hombre</a>
        </li>
        <li>
          <a href="#">Mujer</a>
        </li>
        <li>
          <a href="#">Ofertas</a>
        </li>
      <CartWidget/>
      </ul>
    </nav>
    
  )
}

export default NavBar;