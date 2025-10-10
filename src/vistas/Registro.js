import React, { useState } from "react";
import styles from "../styles/Registro.module.css";
import logoPascual from "../assets/pascuallogo.png";

const Registro = () => {
	const [formData, setFormData] = useState({
		nombre: "",
		email: "",
		password: "",
		carrera: ""
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError("");
		setSuccess("");
	};

	const validarCorreo = (correo) => {
		return /@pascualbravo\.edu\.co$/i.test(correo);
	};

	const handleSubmit = async (e) => {
			e.preventDefault();
			if (!validarCorreo(formData.email)) {
				setError("El correo debe ser institucional (@pascualbravo.edu.co)");
				return;
			}
			try {
				const response = await fetch("http://localhost:8080/ReservasAPP/registro", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(formData)
				});
				if (response.ok) {
					setSuccess("¡Registro exitoso!");
					setFormData({ nombre: "", email: "", password: "", carrera: "" });
				} else {
					setError("Error al registrar usuario. Intenta nuevamente.");
				}
			} catch (err) {
				setError("Error de conexión con el servidor.");
			}
		};

	return (
		<div className={styles.registroContainer}>
			<div className={styles.registroBox}>
				<img src={logoPascual} alt="Logo Pascual Bravo" className={styles.logoPascual} />
				<h2>Registro de Usuario</h2>
				{error && <div className={styles.errorMsg}>{error}</div>}
				{success && <div style={{ color: '#388e3c', marginBottom: 10 }}>{success}</div>}
				<form onSubmit={handleSubmit}>
					<div className={styles.inputGroup}>
						<label htmlFor="nombre">Nombre completo</label>
						<input
							type="text"
							name="nombre"
							id="nombre"
							placeholder="Ingresa tu nombre"
							value={formData.nombre}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="email">Correo institucional</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="usuario@pascualbravo.edu.co"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Crea una contraseña"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="carrera">Carrera (opcional)</label>
						<input
							type="text"
							name="carrera"
							id="carrera"
							placeholder="Tu carrera o área"
							value={formData.carrera}
							onChange={handleChange}
						/>
					</div>
					<button type="submit" className={styles.btnRegistro}>
						Registrarse
					</button>
				</form>
			</div>
		</div>
	);
};

export default Registro;
