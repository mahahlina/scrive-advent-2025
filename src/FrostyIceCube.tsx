import React from 'react';

interface FrostyIceCubeProps {
  day: number;
}

export function FrostyIceCube({ day }: FrostyIceCubeProps) {
  return (
    <div className="relative w-24 h-24" style={{ perspective: '200px' }}>
      {/* Real ice cube image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/ice cube.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: `
            0 20px 40px rgba(8, 145, 178, 0.4),
            0 8px 20px rgba(147, 197, 253, 0.5),
            0 0 60px rgba(135, 206, 250, 0.3)
          `,
          transform: 'rotateX(15deg) rotateY(15deg) rotateZ(2deg)',
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 4px 8px rgba(8, 145, 178, 0.3))',
        }}
      >
      </div>

      {/* Day number - no background, elegant on ice */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span
          className="text-2xl font-black"
          style={{
            color: '#1e3a8a',
            textShadow: `
              0 0 10px rgba(255, 255, 255, 0.8),
              0 0 20px rgba(255, 255, 255, 0.6),
              0 0 30px rgba(255, 255, 255, 0.4),
              2px 2px 4px rgba(8, 145, 178, 0.3),
              0 0 40px rgba(135, 206, 250, 0.2)
            `,
            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
            letterSpacing: '1px'
          }}
        >
          {day}
        </span>
      </div>

      {/* Subtle crystal sparkles */}
      <div className="absolute top-3 left-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse opacity-60" style={{ boxShadow: '0 0 2px rgba(255, 255, 255, 0.6)' }}></div>
      <div className="absolute top-5 right-4 w-1 h-1 bg-cyan-50 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.3s', boxShadow: '0 0 3px rgba(224, 242, 254, 0.6)' }}></div>
      <div className="absolute bottom-5 left-1/2 w-0.5 h-0.5 bg-blue-50 rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.7s' }}></div>

      {/* Enhanced 3D Shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: '-15px',
          width: '90%',
          height: '15px',
          background: 'radial-gradient(ellipse at center, rgba(8, 145, 178, 0.4) 0%, rgba(147, 197, 253, 0.2) 50%, transparent 100%)',
          filter: 'blur(8px)',
          transform: 'rotateX(75deg)',
        }}
      ></div>
    </div>
  );
}
