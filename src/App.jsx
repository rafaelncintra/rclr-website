import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Speaking from './components/Speaking'
import Writing from './components/Writing'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-sand text-bark">
      <Nav />
      <main>
        <Hero />
        <About />
        <Speaking />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
