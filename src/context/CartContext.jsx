import { createContext, useState } from 'react'

//1- Creamos el contexto y lo exportamos para luego utilizarlo en algún componente.
export const CartContext = createContext() 

//2- Creamos un componente proveedor que nos sirve para envolver al contexto. En este
//componente podemos tener funciones, varialbes, estados, etc.

//3- Importamos el componente Provider en algún punto de nuestra aplicación.

//4- Hacemos uso de la prop "children" para poder visualizar todos los componentes.
const Provider = ({children}) => {
//5- Creamos estados en el caso que lo necesitemos.
    const [cart, setCart] = useState([])

//6- Creamos funciones para manipular el estado del contexto.
    const addToCart = (item, cantidad) => {
        // Spread operator: le decimos que todo tenga todo lo que tenia en item
        // y además agregale cantidad.Se encierra entre llaves para que este dentro del mismo objeto.
        const product = {...item, cantidad};
        if (isInCart(product.id)) {
            addQuantity(product);
        } else {
            setCart([...cart, product])
        }
        
    }

    const addQuantity = (prodAdd) => {
        const cartUpdated = cart.map((prodInCart)=> {
            if (prodInCart.id === prodAdd.id) {
                const updateProd = {
                    ...prodInCart,
                    cantidad: prodInCart.cantidad + prodAdd.cantidad,
                }
                return updateProd;
            } else {
                return prodInCart;
            }
        })
        setCart(cartUpdated)
    }

    const isInCart = (id) => cart.some((prod) => prod.id === id);

    const deleteAll = () => setCart([])

    const deleteItem = (id) => setCart(cart.filter((prod)=> prod.id !== id)); 

    const countItemsInCart = () => {
        let acc = 0;
        const span = [...cart];
        span.forEach((prod) => {
            acc+= prod.cantidad;
        })
        return acc;
    }
    const subtotal = (num1, num2) => {
        return num1 * num2 
    }
    const totalPrice = () => {
        let acc = 0;
        const span = [...cart];
        span.forEach((prod) => {
            acc+= prod.cantidad*prod.price;
        })
        return acc;
    }

// 7- A travéz del value compartimos la información (estados, funciones, etc) con los children.
    return(
        <CartContext.Provider value ={{ 
                                    cart,
                                    addToCart, 
                                    deleteAll, 
                                    deleteItem,
                                    countItemsInCart, 
                                    subtotal, 
                                    totalPrice }}>
                                                    {children}
        </CartContext.Provider>
    );
}

export default Provider