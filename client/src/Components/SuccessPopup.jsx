import React from 'react'
import { CheckCircle } from 'lucide-react'

const SuccessPopup = ({ message, onClose, className }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-fade-in">
    <div className={`bg-white p-8 rounded-2xl shadow-xl max-w-md text-center ${className}`}>
      <CheckCircle
        size={48}
        className="text-green-500 mx-auto mb-4 animate-bounce"
      />
      <p className="text-lg font-semibold mb-4">{message}</p>
      <button
        onClick={() => {
          onClose();
          window.location.href = window.location.pathname || "/";
        }}
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Close
      </button>
    </div>
  </div>
  )
}

export default SuccessPopup
