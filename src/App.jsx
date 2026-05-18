import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Speaking from './components/Speaking'
import Book from './components/Book'
import Oculus from './components/Oculus'
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
        <Book />
        <Oculus />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
