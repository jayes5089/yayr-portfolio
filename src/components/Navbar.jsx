import React from 'react'

export default function Navbar() {
    return (
        <nav className='bg-gray-800 shadow fixed w-full z-10'>
            <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
                <a href='/' className='text-2xl font-bold'>Yayr Portfolio</a>
                <div className='space-x-4'>
                    <a href='#gallery' className='hover:text-blue-500'>Gallery</a>
                    <a href='#about' className='hover:text-blue-500'>About</a>
                    <a href='#contact' className='hover:text-blue-500'>Contact</a>
                </div>
            </div>
        </nav>
    )
}