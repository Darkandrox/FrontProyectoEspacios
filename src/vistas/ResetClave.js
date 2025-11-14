import React, { useState, useEffect } from "react";
import axios from "axios";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [token, setToken] = useState("");
    const [redirecting, setRedirecting] = useState(false); // Nuevo estado para controlar la redirección

    useEffect(() => {
        // Leer token de la URL
        const params = new URLSearchParams(window.location.search);
        const tokenUrl = params.get("token");
        setToken(tokenUrl);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            setMensaje("❌ Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await axios.post("${API_BASE_URL}/api/auth/reset-password", {
                token: token,
                password: password
            });

            // 1. Mensaje de éxito
            setMensaje("✅ Contraseña cambiada con éxito. Serás redirigido al inicio en 10 segundos...");
            setRedirecting(true); // Activar estado de redirección

            // 2. Redirección después de 5 segundos (5000 milisegundos)
            setTimeout(() => {
                window.location.href = "/"; 
            }, 5000);

        } catch (error) {
            console.error(error);
            if (!redirecting) {
                setMensaje("❌ Error: el token no es válido o ya expiró.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Restablecer contraseña</h2>

            {mensaje && <p style={{...styles.message, color: mensaje.startsWith('✅') ? 'green' : 'red'}}>{mensaje}</p>}

            {/* Ocultar el formulario si la redirección está en curso */}
            {!redirecting && (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>
                        Guardar nueva contraseña
                    </button>
                </form>
            )}
        </div>
    );
};


const styles = {
    container: {
        width: "360px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        textAlign: "center"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    input: {
        padding: "12px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px"
    },
    button: {
        padding: "12px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold"
    },
    message: {
        fontWeight: "bold"
    }
};

export default ResetPassword;