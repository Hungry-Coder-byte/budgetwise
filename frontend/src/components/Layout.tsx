// frontend/src/components/Layout.tsx
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../src/hooks/useAuth';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Simulate loading user data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <span className="text-xl font-semibold text-gray-800">BudgetWise</span>

            {/* Navigation Links */}
            <div className="space-x-6">
              <NavLink
                to="/"
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
              {user ? (
                <NavLink
                  to="/reports"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Reports
                </NavLink>
              ) : (
                <button
                  className="text-gray-700 hover:text-blue-500"
                  onClick={() => {
                    // Handle login/registration here
                  }}
                >
                  Login/Register
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-4 px-4">
        {/* Content goes here */}
      </main>
    </div>
  );
};

export default Layout;