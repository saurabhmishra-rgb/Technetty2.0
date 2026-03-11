import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Hero from './Hero.jsx'
import Pricing from './components/Pricing.jsx'
import VideoShowcase from './components/VideoShowcase.jsx'
import JustReels from './components/JustReels.jsx'
import Production from './components/Production.jsx'
import EstSection from './components/EstSection.jsx'
import Clients from './components/Client.jsx'
import ReadyPost from './components/ReadyPost.jsx'
import Footer from './components/Footer.jsx'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hero />
    <Pricing />
    <VideoShowcase />
    <JustReels />
    <Production />
    <EstSection />
    <Clients />
    <ReadyPost />
    <Footer />

    
    </StrictMode>,
)
