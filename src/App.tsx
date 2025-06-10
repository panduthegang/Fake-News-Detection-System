import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ArticleAnalysisPage } from './pages/ArticleAnalysisPage';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="verifai-theme">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/article-analysis" element={<ArticleAnalysisPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;