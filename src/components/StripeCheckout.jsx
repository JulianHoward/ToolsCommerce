import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "./CartContext";
import axios from "axios";

// Cargar tu clave pública de Stripe
const stripePromise = loadStripe("tu_publicKey_de_Stripe");

const StripeCheckout = () => {
    const { cart, getTotal } = useCart();

    const handleCheckout = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/pagos/create-stripe-session", {
                carrito: cart,
                total: getTotal(),
                clienteFK: 1, // Reemplazar con el ID real del cliente
            });

            // Redirige al usuario a la página de Stripe
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error("Error iniciando el checkout:", error);
            alert("Hubo un problema al iniciar el proceso de pago.");
        }
    };

    return (
        <div>
            <h2>Resumen de tu Pedido</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.nombre} - ${item.precio} x {item.cantidad}
                    </li>
                ))}
            </ul>
            <h3>Total: ${getTotal().toFixed(2)}</h3>
            <button onClick={handleCheckout}>Pagar con Stripe</button>
        </div>
    );
};

export default StripeCheckout;
