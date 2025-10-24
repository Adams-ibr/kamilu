// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';

const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAdmin();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light dark:bg-gray-800">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 shadow-xl rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-blue dark:text-gray-100">
            Admin Login
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
             Kamilu<span className="text-brand-gold">Welding</span> Control Panel
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Log In
          </Button>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">Hint: Use 'admin123'</p>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
