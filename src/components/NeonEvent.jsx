import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NeonEvent.css';

export default function NeonEvent() {
    // Estado para el contador
    const [timeLeft, setTimeLeft] = useState("SOLO FALTAN 00 DIAS 00:00:00");

    // Estado para saber si ya empezó la fiesta
    const [isPartyTime, setIsPartyTime] = useState(false);

    // --- NUEVO: ARRAY DE ENLACES A FOTOS ---
    // Aquí puedes añadir todos los números o cuentas que quieras.
    // Solo copia y pega un nuevo objeto { id, nombre, url } y cambia los datos.
    const photoLinks = [
        { id: 1, nombre: "Álbum 1", url: "https://www.instagram.com/ne.on.co/p/Ddxl8VoDcBG/" },
        { id: 2, nombre: "Álbum 2", url: "#" },
        { id: 3, nombre: "Álbum 3", url: "#" },
        { id: 4, nombre: "Álbum 4", url: "#" },
        { id: 5, nombre: "Álbum 5", url: "#" },
        // Añade más aquí si lo necesitas...
    ];

    useEffect(() => {
        // --- CONFIGURACIÓN DE FECHAS ---
        // El evento es el Jueves 24 de Septiembre de 2026 a las 18:00 (6 PM)
        const startDate = new Date("September 24, 2026 18:00:00").getTime();
        // Termina el 25 de Septiembre a las 02:00 AM
        const endDate = new Date("September 25, 2026 02:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = startDate - now;

            // Si ya pasó la hora de inicio Y aún no son las 2 AM del día siguiente
            if (now >= startDate && now < endDate) {
                setIsPartyTime(true);
                setTimeLeft("¡LA FIESTA YA COMENZÓ!");
            }
            // Si ya pasaron las 2 AM del día 25
            else if (now >= endDate) {
                setIsPartyTime(true);
                setTimeLeft("EL EVENTO HA TERMINADO");
            }
            // Si aún falta para el evento
            else {
                setIsPartyTime(false);
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                const dStr = String(days).padStart(2, '0');
                const hStr = String(hours).padStart(2, '0');
                const mStr = String(minutes).padStart(2, '0');
                const sStr = String(seconds).padStart(2, '0');

                setTimeLeft(`SOLO FALTAN ${dStr} DIAS ${hStr}:${mStr}:${sStr}`);
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    // --- RENDERIZADO CONDICIONAL: MODO FIESTA ---
    if (isPartyTime) {
        return (
            <div className="party-mode-container">
                <div className="party-content">
                    <h1 className="party-title">¡GRACIAS, TOLUCA!</h1>
                    <p className="party-subtitle">La noche fue nuestra.</p>

                    <div className="party-info">
                        <p><strong>🎧 GRACIAS A TODOS LOS ASISTENTES</strong></p>
                        <p>🎁🎉 Por regalarnos una noche llena de Hardcore y Hard Techno.</p>
                        <p>✨ Fue una experiencia increíble. ¡Esperamos que la hayan disfrutado tanto como nosotros!</p>
                        <p>💖 Gracias por ser parte de NEON PARTY.</p>
                    </div>

                    <div className="party-thanks">
                        <p>Esperen con ansias la próxima edición...</p>
                    </div>

                    {/* --- SECCIÓN DE GALERÍA DE FOTOS --- */}
                    <div className="photo-gallery-section">
                        <p className="party-teaser">📸 REVIVE LOS MEJORES MOMENTOS 📸</p>

                        <div className="photo-links-grid">
                            {photoLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="photo-link-btn"
                                >
                                    {link.nombre}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- RENDERIZADO: LANDING PAGE NORMAL ---
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

                <div className="genre-tag">
                    <span>2010s VIBES</span> · <span>ELECTRO</span> · <span>HARD TECHNO</span>
                </div>

                <h1 className="main-title">
                    NEON <br />
                    <span className="gradient-text">PARTY</span>
                </h1>

                <div className="date-block">
                    JUEVES 24.09.26
                </div>

                {/* DETALLES DEL EVENTO */}
                <section className="info-card">
                    <div className="card-rec-signal">
                        <span className='rec-dot'>●</span>
                        <span className='rec-title'>REC</span> {timeLeft}
                    </div>

                    <h2 className="location-title">📍 AMNESIA TOLUCA</h2>
                    <p className="location-address">C. Plutarco González, Barrio de la Merced</p>

                    <div className="details-log">
                        <p>⚡ ACCESS: 18:00 HRS</p>
                        <p>⚡ DRESSCODE: NEON / CYBER / INDUSTRIAL</p>
                        <p>⚡ LINEUP: MAXIMUM HARDCORE & HARD TECHNO SESSIONS</p>
                        <p>⚡ ACCESS FEE: $100 MXN</p>
                    </div>
                </section>

                <div className="cta-wrapper">
                </div>

                <footer className="neon-footer">
                    © 2026 NE.ON.CO. By
                    <a href="https://portafolio-cbr.pages.dev/" target="_blank" rel="noopener noreferrer">vickmetadeth</a>.
                </footer>
            </main>
        </>
    )
}