import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Stylists from './pages/Stylists'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import Admin from './pages/Admin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  )
}

function PublicLayout({ children, bare = false }) {
  return (
    <>
      <Nav />
      {children}
      {!bare && <Footer />}
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PublicLayout>
                <Page>
                  <Home />
                </Page>
              </PublicLayout>
            }
          />
          <Route
            path="/services"
            element={
              <PublicLayout>
                <Page>
                  <Services />
                </Page>
              </PublicLayout>
            }
          />
          <Route
            path="/stylists"
            element={
              <PublicLayout>
                <Page>
                  <Stylists />
                </Page>
              </PublicLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <PublicLayout>
                <Page>
                  <Gallery />
                </Page>
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <Page>
                  <About />
                </Page>
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <Page>
                  <Contact />
                </Page>
              </PublicLayout>
            }
          />
          <Route
            path="/book"
            element={
              <PublicLayout bare>
                <Page>
                  <Booking />
                </Page>
              </PublicLayout>
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
