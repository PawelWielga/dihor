import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ScrollToTopOnNavigate from './components/ScrollToTopOnNavigate.jsx';
import SkipLinks from './components/SkipLinks.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

const Home = lazy(() => import('./components/Home.jsx'));
const Blog = lazy(() => import('./components/Blog.jsx'));
const BlogPost = lazy(() => import('./components/BlogPost.jsx'));
const ProjectDetails = lazy(() => import('./components/projects/ProjectDetails.jsx'));
const NotFound = lazy(() => import('./components/NotFound.jsx'));

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ErrorBoundary>
        <SkipLinks />
        <ScrollToTopOnNavigate />
        <Navbar />
        <main id="main-content">
          <Suspense fallback={<div className="suspense-fallback" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <ScrollToTop />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
