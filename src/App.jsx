import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('React rendering error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 text-center">
          <h2>Something went wrong.</h2>
          <p>The page crashed because of an unexpected React runtime error.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    const handleLogout = () => {
      toast.error('Your session has expired. Please log in again.');
    };

    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-vh-100 bg-light">
        <Navbar />

        <main className="container pb-5">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to={user ? '/products' : '/login'} replace />} />

            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-product"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <AddProduct />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-product/:id"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <EditProduct />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </ErrorBoundary>
  );
}

export default App;
