import React, { useEffect, useState } from 'react'
import personImage from '../assets/person.png'

export default function HeroSection() {
    return (
        <section className="relative w-full h-[50vh] overflow-hidden bg-[#141414]">
            <img
                src={personImage}
                alt="Person"
                className="absolute bottom-0 left-0 h-full z-20"
            />
            <div className="fixed top-0 right-0 z-30 bg-[#141414] px-5 py-3 rounded-bl-3xl text-white space-x-6 text-lg">
                <a href="#gallery" className="hover:text-blue-400">Gallery</a>
                <a href="#about" className="hover:text-blue-400">About</a>
                <a href="#contact" className="hover:text-blue-400">Contact</a>
            </div>
        </section>
    )
}