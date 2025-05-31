import React from 'react'

const FeatureCard = ({ icon: Icon, title, description, quote, author }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col items-start gap-6">
        <div className="inline-flex p-3 rounded-xl bg-blue-50 text-blue-600">
          <Icon size={28} strokeWidth={2} />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
  
        {quote && (
          <div className="relative mt-4 pl-4 border-l-4 border-blue-200">
            <p className="italic text-gray-600">{quote}</p>
            <p className="mt-2 text-sm font-medium text-gray-900">{author}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeatureCard;
