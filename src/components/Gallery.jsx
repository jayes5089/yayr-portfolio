import React, { useState, useEffect } from 'react'
import PhotoCard from './PhotoCard'
import photoDates from '../assets/photo-dates.json'

const modules = import.meta.glob('../assets/images/*.jpg', { eager: true, import: 'default' })

const photosByDate = {}

Object.entries(modules).forEach(([path, src]) => {
    const fileName = path.split('/').pop()
    const date = photoDates[fileName] || 'Unknown'
    if (!photosByDate[date]) photosByDate[date] = []
    photosByDate[date].push({ src })
})

function formatDate(dateStr) {
    if (dateStr === 'Unknown') return 'Unknown Date'
    try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        })
    } catch {
        return dateStr
    }
}

export default function Gallery() {
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelected(null)
        }
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [])

    const sortedDates = Object.keys(photosByDate).sort((a, b) => {
        if (a === 'Unknown') return 1
        if (b === 'Unknown') return -1
        return new Date(b) - new Date(a)
    })

    return (
        <section id='gallery' className='space-y-6'>
            {sortedDates.map((date) => (
                <div key={date}>
                    <h3 className='text-xl font-mono mb-2'>{formatDate(date)}</h3>
                    <div className='grid grid-cols-3 gap-2'>
                        {photosByDate[date].map((photo, idx) => (
                            <PhotoCard key={`${date}-${idx}`} photo={photo} onClick={() => setSelected(photo)} />
                        ))}
                    </div>
                </div>
            ))}
            {selected && (
                <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity animate-fadeIn'>
                    <div className='relative'>
                        <img src={selected.src} alt='Selected' className='max-h-screen' />
                        <button
                            onClick={() => setSelected(null)}
                            className='absolute top-2 right-2 text-white text-2xl'
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}