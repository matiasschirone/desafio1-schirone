import React, { useContext } from 'react'
import { getFirestore, addDoc, collection, } from 'firebase/firestore'
import { CartContext } from '../../components/context/CartContext'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
    const [data, setData] = React.useState()
    console.log(data)
    const [orderId, setOrderId] = React.useState(false)
    console.log(orderId)
    const { cart, deleteAll } = useContext(CartContext)
    const navegar = useNavigate()

    const order = {
        buyer: data,
        items: cart,
        total: 100,
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const db = getFirestore()
        const ordersCollection = collection(db, "orders")
        const productsCollection = collection(db, "productos")
        await addDoc(ordersCollection, order).then(({ id }) => {
            setOrderId(id)
            deleteAll()
        })
    }


    return (
        <div className="checkout">
            {!orderId
            ?<Form onSubmit={handleSubmit}>
                <h1>Checkout</h1>
                <Form. Group id='username'>
                <Form. Control
                    requiered
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />
                </Form. Group>
                <Form. Group id='email'>
                <Form. Control
                    requiered
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                </Form. Group>
                <Form. Group id='phone'>
                <Form. Control
                    required
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />
                </Form. Group>
                <Button variant="primary" type="submit">            
                 Finalizar compra
                </Button>
            </Form>
            :<>
            <p>Muchas gracias por su compra</p>
            <p>Tu Orden es : {orderId}</p>
            <Button onClick={()=>navegar('/')}>volver</Button>
            </>}
        </div>
    )
}

export default Checkout