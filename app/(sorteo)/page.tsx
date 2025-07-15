"use client";
import React from "react";
import Link from "next/link";

const HomePage = () => {
  // Generar números aleatorios para el fondo
  React.useEffect(() => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
      "#F8C471",
      "#82E0AA",
      "#F1948A",
      "#D7BDE2",
      "#F9E79F",
      "#ABEBC6",
      "#FAD7A0",
      "#D5A6BD",
      "#A9CCE3",
    ];

    const generateRandomColor = () => {
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Crear números con efecto matriz
    const createMatrixNumbers = () => {
      const container = document.querySelector(".floating-numbers");
      if (!container) return;

      // Limpiar números existentes
      container.innerHTML = "";

      // Crear columnas de números que caen
      const columns = 15; // Número de columnas
      const columnWidth = 100 / columns;

      for (let col = 0; col < columns; col++) {
        const left = col * columnWidth + (Math.random() * 10 - 5); // Posición X con variación
        const color = generateRandomColor();
        const size = Math.random() * 20 + 10; // 10px a 30px
        const speed = Math.random() * 4 + 6; // Velocidad de caída más lenta
        const delay = Math.random() * 5; // Delay inicial

        // Crear múltiples números por columna
        const numbersInColumn = Math.floor(Math.random() * 8) + 3; // 3-10 números por columna

        for (let i = 0; i < numbersInColumn; i++) {
          const number = Math.floor(Math.random() * 99) + 1;
          const top = -20 - i * 40; // Empezar más cerca de la pantalla

          const numberElement = document.createElement("div");
          numberElement.className = "matrix-number";
          numberElement.textContent = number.toString();
          numberElement.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: ${top}%;
            color: ${color};
            font-size: ${size}px;
            font-weight: bold;
            opacity: 1;
            pointer-events: none;
            animation: matrixFall ${speed}s linear infinite;
            animation-delay: ${delay + i * 0.5}s;
            text-shadow: 0 0 10px ${color};
          `;

          container.appendChild(numberElement);
        }
      }
    };

    createMatrixNumbers();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <section className="relative flex items-center justify-center w-full h-full px-6 text-center overflow-hidden bg-black">
        {/* Floating Numbers Background */}
        <div className="absolute inset-0 bg-black">
          <div className="floating-numbers"></div>
        </div>

        <div className="relative z-10 max-w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white uppercase mb-4">
            Groks Loto Predictor
          </h1>
          <p className="mt-4 text-lg text-white font-semibold">
            Tu plataforma de sorteos diarios. Participa, gana y diviértete con
            nuestros sorteos exclusivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Link
              href="/sorteos"
              className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold transition-all duration-200"
            >
              🎲 Ver Sorteos
            </Link>
            <Link
              href="/suggestNumbers"
              className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold transition-all duration-200"
            >
              💡 Sugerir Números
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
