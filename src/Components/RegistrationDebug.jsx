// Debug component to test registration data
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

export default function RegistrationDebug() {
  const { register, loading, error } = useAuth();
  const [backendStatus, setBackendStatus] = useState('checking...');
  const [testData] = useState({
    first_name: 'Test',
    last_name: 'User',
    email: 'test@example.com',
    phone_number: '+254700000000',
    date_of_birth: '1990-01-01',
    password: 'TestPassword123',
    password_confirm: 'TestPassword123'
  });
  useEffect(() => {
    // Test backend connectivity
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/accounts/health/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.ok) {
          const data = await response.json();
          setBackendStatus(`connected - ${data.message}`);
        } else {
          setBackendStatus('error - server responded with error');
        }
      } catch (error) {
        setBackendStatus('not connected - server unreachable');
        console.error('Backend check failed:', error);
      }
    };
    
    checkBackend();
  }, []);

  const handleTestRegistration = async () => {
    console.log('Testing registration with:', testData);
    try {
      const result = await register(testData);
      console.log('Registration result:', result);
    } catch (error) {
      console.error('Registration test failed:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">Registration Debug</h3>
      
      <div className="mb-4">
        <h4 className="font-semibold">Backend Status:</h4>
        <span className={`px-2 py-1 rounded text-sm ${
          backendStatus === 'connected' ? 'bg-green-600' : 
          backendStatus === 'checking...' ? 'bg-yellow-600' : 'bg-red-600'
        }`}>
          {backendStatus}
        </span>
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold">Test Data:</h4>
        <pre className="bg-gray-700 p-2 rounded text-xs overflow-auto max-h-32">
          {JSON.stringify(testData, null, 2)}
        </pre>
      </div>
      
      <button
        onClick={handleTestRegistration}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Registration'}
      </button>
      
      {error && (
        <div className="mt-4 p-2 bg-red-900 border border-red-600 rounded">
          <h4 className="font-semibold text-red-300">Error:</h4>
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
