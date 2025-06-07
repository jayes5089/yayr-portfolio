import React from 'react'

export default function PhotoCard({ photo, onClick }) {
    return (
        <div 
            className='cursor-pointer overflow-hidden shadow-lg ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-400 transition-all duration-300' 
            onClick={onClick}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick()}
        >
            <img 
                src={photo.src} 
                alt={photo.title} 
                loading="lazy"
                className='object-cover w-full h-auto transform hover:scale-105 transition-transform duration-300' />
        </div>
    )
}