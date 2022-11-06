import { 
    addDoc, 
    collection, 
    documentId, 
    getDocs,
    query, 
    serverTimestamp,
    where, 
    writeBatch 
} from 'firebase/firestore';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { CartContext } from '../context/CartContext';
import { dataBase } from '../services/fireBaseConfig';
import './form.css'


const Form = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [direction, setDirection] = useState('');
    const [email, setEmail] = useState('');
    const [emailRepeat, setEmailRepeat] = useState('');
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);

    const { cart, totalPrice, deleteAll} = useContext(CartContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        
        try {
            const order = {
                buyer: {name, phone, direction, email},
                items: cart,
                total: totalPrice(),
                date: serverTimestamp(),
            };

        const idsInCart = cart.map((prod) => prod.id)

        const idsInFirestore = collection (dataBase, 'products')

        const prodInFirestore = await getDocs (
            query(idsInFirestore, where(documentId(), 'in', idsInCart))
        );

        const { docs } = prodInFirestore;

        const batch = writeBatch(dataBase);

        const outStock = [];

        docs.forEach((doc) => {
            const dataDoc = doc.data();
            const stockDb = dataDoc.stock;

            const prodAddToCart = cart.find((prod) => prod.id === doc.id)

            const prodQuantity = prodAddToCart?.cantidad;

            if (stockDb >= prodQuantity) {
                batch.update(doc.ref, {stock: stockDb - prodQuantity})
            } else {
                outStock.push({id: doc.id, ...dataDoc})
            }
        })
        
        if (outStock.length === 0) {
            batch.commit()
            if (email === emailRepeat) {
            const ordersRef = collection (dataBase, 'orders');
            const ordersAdded = await addDoc(ordersRef, order);
        
            setOrderId(ordersAdded.id)
            deleteAll()
            } else {
                alert('email no coincide')
            }

        } else {
            console.log('no hay stock del producto')
            console.log(outStock)
        }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const handleChangeDirection = (e) => {
        setDirection(e.target.value)
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangeEmailRepeat = (e) => {
        setEmailRepeat(e.target.value)
    }
    
    if (orderId) {
        return (
            <div className='container-order'>
                <h2 className='order-h2'>Finalizaste tu compra {name}!</h2>
                <h3 className='order-h3'>Tu número de seguimiento es: 
                        <p className='order-id'>{orderId}</p>
                </h3>
                <h4 className='order-h4'>- Recordá que los pedidos tardan un maximo de 48hs.</h4>
                <Link to='/' className='order-h5'>Gracias por confiar en ArgenZapas.com</Link>
            </div>
        )
    }

    return (
    <form className='container-form' onSubmit={handleSubmit}>
        <fieldset>Llena el formulario para finalziar la compra.</fieldset>
        <label className='label-form' htmlFor="">* Nombre y Apellido</label>
        <input className='input-form' 
            type="text" 
            name='nombre'
            autoFocus
            required
            pattern= '[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*'
            minLength={8} 
            placeholder='Nombre y apellido' 
            onChange={handleChangeName} 
            value={name} 
        /> 
        <label className='label-form' htmlFor="">* Numero de Celular</label>
        <input className='input-form' 
            type="number" 
            name='celular'
            required
            pattern='0{0,2}([\+]?[\d]{1,3} ?)?([\(]([\d]{2,3})[)] ?)?[0-9][0-9 \-]{6,}( ?([xX]|([eE]xt[\.]?)) ?([\d]{1,5}))?'
            minLength={10} 
            placeholder='Ej: 1134742012...' 
            onChange={handleChangePhone}
            value={phone}
        />
        <label className='label-form' htmlFor="">* Dirección</label>
        <input className='input-form' 
            type="text" 
            name='direción'
            required
            pattern='[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)* (((#|[nN][oO]\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)' 
            minLength={8} 
            placeholder='Dirección (Calle y Altura)' 
            onChange={handleChangeDirection}
            value={direction}
        />
        <label className='label-form' htmlFor="">* Email</label>
        <input className='input-form' 
            type="email" 
            name='email'
            required 
            pattern='[a-z0-9_\-]+(\.[_a-z0-9\-]+)*@([_a-z0-9\-]+\.)+([a-z]{2}|aero|asia|arpa|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx)'
            minLength={12} 
            placeholder='example@gmail.com...' 
            onChange={handleChangeEmail}
            value={email}
        />
        <label className='label-form' htmlFor="">* Confrimar Email</label>
        <input className='input-form' 
            type="email" 
            name='email'
            required
            pattern='[a-z0-9_\-]+(\.[_a-z0-9\-]+)*@([_a-z0-9\-]+\.)+([a-z]{2}|aero|asia|arpa|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx)'
            minLength={12} 
            placeholder='example@gmail.com...' 
            onChange={handleChangeEmailRepeat}
            value={emailRepeat}
        />
        <button className='btn-form'>
            {loading    ? 
                <PulseLoader color='rgb(255, 255, 255)'/> 
                        : 'Finalizar Compra'}
        </button>
    </form>
    ) 
}

export default Form