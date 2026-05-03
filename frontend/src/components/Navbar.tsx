import { useState, useEffect } from 'react';
import { Link,NavLink } from 'react-router-dom';
import { useAuth } from '../../src/hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, loading: authLoading, error: authError } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (authError) {
    return <div>Error: {authError}</div>;
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-semibold">
            BudgetWise
          </Link>

          {/* Navigation Links */}
          <div className="space-x-4">
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/categories"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/reports"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Reports
                </NavLink>
                <button
                  className="text-gray-700 hover:text-blue-500"
                  onClick={() => {
                    // Simulate logout
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="text-gray-700 hover:text-blue-500">
                  Login
                </NavLink>
                <NavLink to="/register" className="text-gray-700 hover:text-blue-500">
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;