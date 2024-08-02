import { lazy, } from 'react';
import { createBrowserRouter, redirect, RouteObject, } from 'react-router-dom';

import RootLayout from './apps/Root/RootLayout';

const routes: Array<RouteObject> = [
  {
    id: 'root',
    path: '',
    element: <RootLayout />,
    children: [
      {
        id: 'home',
        path: '',
        Component: lazy(
          () => import('./apps/Home/pages/Home'),
        ),
      },
      {
        id: 'searchResults',
        path: 'results',
        Component: lazy(
          () => import('./apps/SearchResult/pages/SearchResult'),
        ),
      },
      {
        id: 'hotel',
        path: 'hotel/:id',
        Component: lazy(
          () => import('./apps/Hotel/pages/SelectedHotel'),
        ),
      },
      {
        id: 'reservation',
        path: 'hotel/:id/reservation/:roomId',
        Component: lazy(
          () => import('./apps/Hotel/pages/Reservation'),
        ),
      },
      {
        id: 'login',
        path: 'login',
        // loader: () => {
        //   const storedToken = localStorage.getItem('user_token');
        //   if (storedToken) {
        //     return redirect('/');
        //   }

        //   return true
        // },
        Component: lazy(
          () => import('./apps/Login/pages/Login'),
        ),
      },
      {
        id: 'register',
        path: 'signup',
        // loader: () => {
        //   const storedToken = localStorage.getItem('user_token');
        //   if (storedToken) {
        //     return redirect('/');
        //   }
          
        //   return true;
        // },
        Component: lazy(
          () => import('./apps/Signup/pages/Signup'),
        ),
      },
      {
        id: 'admin',
        path: 'dashboard',
        // loader: () => {
        //   const storedToken = localStorage.getItem('user_token');
        //   if (!storedToken) {
        //     return redirect('/login');
        //   }

        //   return true;
        // },
        Component: lazy(
          () => import('./apps/Home/pages/Home'),
        ),
      },
    ],
  },
];

const Router = createBrowserRouter(routes);

export default Router;