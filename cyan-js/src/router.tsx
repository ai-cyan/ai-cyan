import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Pricing from './pages/Pricing';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Profile from './pages/Profile';
import UserOverview from './pages/UserOverview';

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
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/jobs/:id',
    element: <JobDetail />,
  },
  {
    path: '/:username',
    element: <Profile />,
  },
  {
    path: '/:username/overview',
    element: <UserOverview />,
  },
];

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes); 