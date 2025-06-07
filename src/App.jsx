import React from 'react'
import HeroSection from './components/HeroSection'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className='flex flex-col min-h-screen bg-black text-white scroll-smooth'>
      <HeroSection />
      <main className='flex-1 container mx-auto px-1 py-5 space-y-16'>
        <section id="gallery">
          <h2 className='text-3xl font-bold mb-4'>Gallery</h2>
          <Gallery />
        </section>
        <section id="about">
          <h2 className='text-3xl font-bold mb-4'>About</h2>
          <p className='text-lg max-w-prose'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
            laborum.
          </p>
        </section>
        <section id="contact">
          <h2 className='text-3xl font-bold mb-4'>Contact</h2>
          <p className='text-lg max-w-prose'>
            For inquiries, please react out via email at <a className='text-blue-300 underline' href='mailto:example@example.com'>example@example.com</a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
