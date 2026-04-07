"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Importamos dinámicamente el componente de nieve para evitar errores de hidratación
// ya que depende del tamaño exacto de la ventana (window) en el cliente.
const Snowfall = dynamic(() => import("react-snowfall"), {
  ssr: false,
});

export default function SnowfallBlock() {
  const [wind, setWind] = useState<[number, number]>([1.5, 3.0]);

  useEffect(() => {
    // Patrones de viento variados: viento suave a moderado.
    const windPatterns: [number, number][] = [
      [0.5, 1.5],    // Viento suave hacia la derecha
      [-1.5, -0.5],  // Viento suave hacia la izquierda
      [-0.2, 0.2],   // Calmado (cae casi recto)
      [0.2, 0.8],    // Brisa ligera a la derecha
      [-0.8, -0.2],  // Brisa ligera a la izquierda
      [1.0, 2.0],    // Ráfaga media derecha
      [-2.0, -1.0],  // Ráfaga media izquierda
    ];

    // Cambiar la dirección del viento cada 7 segundos
    const interval = setInterval(() => {
      const randomPattern = windPatterns[Math.floor(Math.random() * windPatterns.length)];
      setWind(randomPattern);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[100] h-full overflow-hidden transition-all duration-1000">
      <Snowfall 
        // Usa formato RGBA para asignar el color blanco con transparencia (ej. 60% opaco)
        color="rgba(255, 255, 255, 0.2)"
        snowflakeCount={100}
        speed={[0.1, 0.5]}
        wind={wind} 
        radius={[0.9, 5.0]}
      />
    </div>
  );
}
