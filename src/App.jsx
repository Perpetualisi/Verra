import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Collection from './components/Collection'
import Notes from './components/Notes'
import About from './components/About'
import OrderForm from './components/OrderForm'
import './App.css'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Collection/>
      <Notes/>
      <About/>
      <OrderForm/>
      <Footer/>
    </div>
  )
}

export default App
