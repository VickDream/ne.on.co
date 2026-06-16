import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NeonEvent.css';

export default function NeonEvent() {

    // Cambiado para manejar el string completo del tiempo restante
    const [timeLeft, setTimeLeft] = useState("SOLO FALTAN 00 DIAS 00:00:00");

    useEffect(() => {
        // Fecha objetivo estándar para evitar bugs de zona horaria
        const targetDate = new Date("August 13, 2026 21:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {  
                setTimeLeft('SOLO FALTAN 00 DIAS 00:00:00');
            } else {
                // Desglose matemático exacto del tiempo restante
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                
                // Formateador para añadir el cero a la izquierda si es un solo dígito
                const dStr = String(days).padStart(2, '0');
                const hStr = String(hours).padStart(2, '0');
                const mStr = String(minutes).padStart(2, '0');
                const sStr = String(seconds).padStart(2, '0');

                // Armamos la cadena final con los días y el reloj dinámico corriendo
                setTimeLeft(`SOLO FALTAN ${dStr} DIAS ${hStr}:${mStr}:${sStr}`);
            }
        };

        // Ejecuta inmediatamente al montar la página para que no muestre ceros al inicio
        updateCountdown();

        // El intervalo corre cada 1 segundo para actualizar los segundos en pantalla
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
        {/* Header */}
        <header className="neon-header">
         <div className="brand-badge">BY NEON</div>
         <NavLink to="https://ig.me/m/ne.on.co"
                  className="btn-secondary"
                  target='_blank'
                  rel='noopener noreferrer'
          >
            RESERVAR
          </NavLink>
         </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="neon-main">

        {/* Badge de generos */}
        <div className="genre-tag">
         <span>2010s VIBES</span> · <span>ELECTRO</span> · <span>HARD TECHNO</span>
        </div>

        {/* Titulo Principal */}
        <h1 className="main-title">
         NEON <br />
         <span className="gradient-text">PARTY</span>
        </h1>

        {/* Fecha Corregida (Estilo Bloque Industrial) */}
         <div className="date-block">
         JUEVES 13.08.26
        </div>

        {/* DETALLES DEL EVENTO */}
        <section className="info-card">
        {/* Renderizado del texto combinado con el reloj en tiempo real */}
          <div className="card-rec-signal">
          <span className='rec-dot'>●</span>
          <span className='rec-title'>REC</span> {timeLeft}
        </div>

          <h2 className="location-title">📍 AMNESIA TOLUCA</h2>
          <p className="location-address">C. Plutarco González, Barrio de la Merced</p>

        <div className="details-log">
          <p>⚡ ACCESS: 21:00 HRS</p>
          <p>⚡ DRESSCODE: NEON / CYBER / INDUSTRIAL</p>
          <p>⚡ LINEUP: MAXIMUM HARDCORE & HARD TECHNO SESSIONS</p>
          <p>⚡ ACCESS FEE: $100 MXN</p>
        </div>
        </section>

        {/* BOTON DE ACCIÓN (Call To Action) */}
        <div className="cta-wrapper">
        {/* <button className="btn-primary">
          CONSEGUIR ACCESO
        </button> */}
        </div>
          <footer className="neon-footer">
          © 2026 NE.ON.CO.
          </footer>
        </main>
      </>
    )
}
