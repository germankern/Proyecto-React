import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cart from './components/Cart';
import Form from './components/Form';
import Footer from './components/Footer'
import Provider from './context/CartContext';

const App = () => {
  
  return (
    <>
      <Provider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<ItemListContainer greeting={"ArgenZapas.com"}/>}/>
            <Route path='/category/:id' element={<ItemListContainer greeting={"ArgenZapas.com"}/>}/>
            <Route path='/items/:id' element={<ItemDetailContainer/>}/>
            <Route path='/items/form' element={<ItemDetailContainer/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/form' element={<Form/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
      <Footer/>
    </>
  )
}

export default App;
