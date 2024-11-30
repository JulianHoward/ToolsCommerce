import React, { useEffect, useState } from 'react';

const SuccessPage = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');
        if (sessionId) {
            // Realiza una solicitud a tu backend para obtener detalles de la sesión
            fetch(`/api/payment/verify-session/${sessionId}`)
                .then(response => response.json())
                .then(data => {
                    setSession(data);
                    if (data && data.paymentStatus === 'success') {
                        clearCart(); // Vaciar el carrito después de un pago exitoso
                    }
                })
                .catch(error => console.error('Error al obtener la sesión', error));
        }
    }, []);
    
    return (
        <div>
            <h1>Pago Exitoso</h1>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {session && !loading && !error && (
                <div>
                    <p><strong>ID de sesión:</strong> {session.id}</p>
                    <p><strong>Detalles del pago:</strong> {session.payment_status}</p>
                    <p><strong>Monto pagado:</strong> ${session.amount_total / 100}</p>
                    {/* Puedes agregar más detalles del pago como la dirección de facturación si lo deseas */}
                </div>
            )}
        </div>
    );
};

export default SuccessPage;
