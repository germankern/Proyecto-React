import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
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
// Como hacer que un estado en vez de ser un string sea un objeto y dentro de este objeto tener los 3 campos y
// tener una sola funcion en vez de las 3 funciones. (Min: 57 CLASE 9)

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        const order = {
            buyer: {name, phone, direction, email},
            items: cart,
            total: totalPrice(),
            date: serverTimestamp(),
        }

        const ordersCollection = collection(dataBase, 'orders')
        addDoc(ordersCollection, order)
            .then((res) => {
                setOrderId(res.id)
                deleteAll();
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
        return () => setLoading(true);
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
                <h3 className='order-h3'>Tu número de seguimiento es: <p className='order-id'>{orderId}</p></h3>
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
            onChange={handleChangeName} //onChange va capturando lo que escribimos en el campo.
            value={name}  // value ->Hay que darle de comer el mismo estado.Para que el input sepa lo que estas escribiendo en el campo.
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