import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import ProjectDetails from './components/projects/ProjectDetails.jsx';
import BlogPostDetails from './components/blog/BlogPostDetails.jsx';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/blog/:id" element={<BlogPostDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
