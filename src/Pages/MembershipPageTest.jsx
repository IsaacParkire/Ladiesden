import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MembershipPageTest() {
  const navigate = useNavigate();

  const handleTestClick = () => {
    console.log('Test button clicked!');
    alert('Test button works!');
  };

  const handleNavigateToPayment = () => {
    console.log('Navigate to payment clicked!');
    navigate('/payment');
  };

  return (
    <div className="pt-24 bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Membership Test Page</h1>
      
      <div className="max-w-md mx-auto space-y-4">
        <button 
          onClick={handleTestClick}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Test Button (Should Alert)
        </button>
        
        <button 
          onClick={handleNavigateToPayment}
          className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Navigate to Payment
        </button>
        
        <button 
          onClick={() => {
            console.log('Inline function works');
            navigate('/payment', { 
              state: { 
                plan: {
                  id: 'premium',
                  name: 'Premium',
                  price: 'KSH 25,000',
                  billing: '/month'
                }
              } 
            });
          }}
          className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Navigate with Plan Data
        </button>
      </div>
    </div>
  );
}
