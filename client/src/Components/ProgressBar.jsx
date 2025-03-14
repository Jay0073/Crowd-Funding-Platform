import React from 'react'

const ProgressBar = ({current, goal}) => {
    if (current < 0) current = 0
    if (goal < 0) goal = 0
    const percentage = Math.min((current / goal) * 100, 100)
  return (
    <div className="relative w-full">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="font-medium text-blue-600">
            ${current} raised
          </span>
          <span className="text-gray-900 text-[17px] font-semibold">
             of ${goal}
          </span>
        </div>
      </div>
  )
}

export default ProgressBar

