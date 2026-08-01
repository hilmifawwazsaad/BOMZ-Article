import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import HomePage from '@/pages/HomePage'
import ArticlePage from '@/pages/ArticlePage'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}
