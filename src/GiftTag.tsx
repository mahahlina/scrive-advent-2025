import React from 'react';
import { Gift } from 'lucide-react';

export function GiftTag() {
  return (
    <div className="flex items-center justify-center mb-8">
      {/* Gift tag shape */}
      <div className="relative transform hover:scale-105 transition-all duration-300 animate-bounce" style={{
        animation: 'sway 3s ease-in-out infinite'
      }}>
        {/* String/ribbon with enhanced styling */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1 h-10 rounded-full shadow-lg" style={{
          backgroundColor: '#8B4513',
          background: 'linear-gradient(45deg, #8B4513, #A0522D, #8B4513)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }} />

        {/* Tag body with enhanced styling - Made smaller */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl p-6 pt-8 pb-6 relative border-2 border-gray-200" style={{
          boxShadow: '0 8px 20px rgba(0,0,0,0.15), 0 3px 8px rgba(0,0,0,0.1)',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          transform: 'scale(0.8)'
        }}>
          {/* Hole at top for string with enhanced styling */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-inner" style={{
            borderWidth: '2px',
            borderColor: '#8B4513',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
          }} />

          {/* Content */}
          <div className="flex flex-col items-center gap-3">
            {/* Scrive Logo with enhanced styling - Made smaller */}
            <div className="w-28 h-10 rounded-lg flex items-center justify-center shadow-md border-2 border-amber-200" style={{
              backgroundColor: '#FEF3C7',
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              boxShadow: '0 3px 6px rgba(0,0,0,0.1)'
            }}>
              <img
                src="/resources/scrive.webp"
                alt="Scrive Logo"
                className="max-w-full max-h-full object-contain filter drop-shadow-sm"
              />
            </div>

            {/* Gift icon with enhanced styling - Made smaller */}
            <div className="p-1.5 rounded-full bg-red-50 shadow-md">
              <Gift className="w-6 h-6" style={{ color: '#DC2626' }} />
            </div>

            {/* Text with enhanced styling - Made smaller */}
            <div className="text-center">
              <p className="text-xs font-medium mb-1" style={{
                color: '#059669',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}>
                From your friends at
              </p>
              <p className="text-sm font-bold" style={{
                color: '#DC2626',
                textShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                Scrive
              </p>
            </div>
          </div>

          {/* Enhanced decorative corner fold */}
          <div className="absolute top-0 right-0 w-0 h-0 rounded-tr-xl" style={{
            borderTop: '25px solid #E5E7EB',
            borderLeft: '25px solid transparent',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }} />

          {/* Additional decorative elements */}
          <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-red-100 opacity-60"></div>
          <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-green-100 opacity-60"></div>
        </div>
      </div>
    </div>
  );
}
