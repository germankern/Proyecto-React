import { createContext, useState } from 'react'

export const CartContext = createContext() 

const Provider = ({children}) => {
    const [cart, setCart] = useState([])

    const addToCart = (item, cantidad) => {
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