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
      [0.1, 0.4],    // Viento suave hacia la derecha
      [-0.4, -0.1],  // Viento suave hacia la izquierda
      [-0.05, 0.05], // Calmado (cae casi recto)
      [0.05, 0.2],   // Brisa ligera a la derecha
      [-0.2, -0.05], // Brisa ligera a la izquierda
      [0.2, 0.6],    // Ráfaga media derecha
      [-0.6, -0.2],  // Ráfaga media izquierda
    ];

    // Cambiar la dirección del viento cada 7 segundos
    const interval = setInterval(() => {
      const randomPattern = windPatterns[Math.floor(Math.random() * windPatterns.length)];
      setWind(randomPattern);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] w-full h-full overflow-hidden">
      <Snowfall 
        // Aumentamos opacidad y cantidad para que sea visible
        color="rgba(255, 255, 255, 0.15)"
        snowflakeCount={150}
        speed={[0.1, 0.4]}
        wind={wind} 
        radius={[1.0, 4.0]}
      />
    </div>
  );
}
