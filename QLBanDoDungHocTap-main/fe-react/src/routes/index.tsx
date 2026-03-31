import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';

// Pages
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Transaction from '../pages/Transaction/Transaction';
import Wallet from '../pages/Wallet/Wallet';
import Category from '../pages/Category/Category';
import Budget from '../pages/Budget/Budget';
import Goal from '../pages/Goal/Goal';
import Admin from '../pages/Admin/Admin';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'transactions',
        element: <Transaction />,
      },
      {
        path: 'wallets',
        element: <Wallet />,
      },
      {
        path: 'categories',
        element: <Category />,
      },
      {
        path: 'budgets',
        element: <Budget />,
      },
      {
        path: 'goals',
        element: <Goal />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
    ],
  },
]);
