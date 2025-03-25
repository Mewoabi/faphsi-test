import { JSX } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './contexts/UserContext';
import { ProductsProvider } from './contexts/ProductsContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import OrderSuccessPage from './pages/OrderSuccessPage';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/" />;
};

function App() {
  const { user } = useUser();

  return (
      <ProductsProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/home" /> : <LoginPage />}
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccessPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ProductsProvider>
  );
}

export default App;
