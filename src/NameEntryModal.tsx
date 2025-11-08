import React, { useState } from 'react';

interface NameEntryModalProps {
  onNameSubmit: (name: string) => void;
}

export function NameEntryModal({ onNameSubmit }: NameEntryModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Please enter your name');
      return;
    }

    if (trimmedName.length > 50) {
      setError('Name must be less than 50 characters');
      return;
    }

    setError('');
    onNameSubmit(trimmedName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#DC2626' }}>
            Welcome to Winter Calendar!
          </h2>
          <p className="text-gray-600">
            Enter your name to start opening the calendar doors
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg text-gray-900 bg-white"
              autoFocus
              maxLength={50}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Opening Doors
          </button>
        </form>
      </div>
    </div>
  );
}

