import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/HomePage'
import { CatalogPage } from './pages/CatalogPage'
import { KnowledgePage } from './pages/KnowledgePage'
import { LinksPage } from './pages/LinksPage'
import { AboutPage } from './pages/AboutPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-canvas flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/"          element={<HomePage />}      />
            <Route path="/catalog"   element={<CatalogPage />}   />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/links"     element={<LinksPage />}     />
            <Route path="/about"     element={<AboutPage />}     />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
