import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cart from './components/Cart'

// import { BrowserRouter, Routes, Rout, Route } from 'react-router-dom';
// Instalamos react rooter dom 

const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<ItemListContainer greeting={"ArgenZapas.com"}/>}/>
          <Route path='/category/:id' element={<ItemListContainer greeting={"ArgenZapas.com"}/>}/>
          <Route path='/items/:id' element={<ItemDetailContainer/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
