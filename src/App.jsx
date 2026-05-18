import Nav from './components/Nav'
import About from './components/About'
import Book from './components/Book'
import Speaking from './components/Speaking'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <About />
        <Book />
        <Speaking />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
