import React, { useEffect, Suspense, lazy } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import {useDocTitle} from './components/CustomHook';
import ScrollToTop from './components/ScrollToTop';
import { getCurrentUser } from './services/api';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
// const DemoProduct = lazy(() => import('./pages/DemoProduct'));
const InternetPackages = lazy(() => import('./pages/InternetPackages'));
const NanoBeamProducts = lazy(() => import('./pages/NanoBeamProducts'));
const CCTVProducts = lazy(() => import('./pages/CCTVProducts'));
const News = lazy(() => import('./pages/News'));
const About = lazy(() => import('./pages/About'));
const NavBar = lazy(() => import('./components/Navbar/NavBar'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const Login = lazy(() => import('./pages/Login'));

// Protected Route component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

// Layout component for pages that need the NavBar
const MainLayout = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
);

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Always set dark mode
    document.documentElement.classList.add('dark');
    
    // Initialize AOS with a slight delay to prioritize content rendering
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
        startEvent: 'DOMContentLoaded',
      });
    };

    // Initialize AOS after a small delay
    setTimeout(aos_init, 100);
  }, []);

  useDocTitle("داناتليكوم | مزود خدمات الانترنت وانظمة المراقبة");

  return (
    <div className="min-h-screen dark bg-gray-900 text-white">
      <Router>
        <ScrollToTop>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public routes without NavBar */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes with NavBar */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/about" element={<MainLayout><About /></MainLayout>} />
              <Route path="/cctv" element={<MainLayout><CCTVProducts /></MainLayout>} />
              <Route path="/nanobeam" element={<MainLayout><NanoBeamProducts /></MainLayout>} />
              <Route path="/internet" element={<MainLayout><InternetPackages /></MainLayout>} />
              <Route path="/news" element={<MainLayout><News /></MainLayout>} />
              <Route path="/news/:id" element={<MainLayout><News /></MainLayout>} />
              <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <MainLayout>
                      <AdminDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <UserProfile />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
