import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Pricing from './pages/Pricing';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/features',
    element: <Features />,
  },
  {
    path: '/signin',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/pricing',
    element: <Pricing />,
  },
];

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes); 