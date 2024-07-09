import { lazy, } from 'react';
import { createBrowserRouter, RouteObject, } from 'react-router-dom';

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
        element: <div className='p-4'>
          <button
            onClick={() => window.location.href = '/login'} 
            className='py-2 px-4 bg-red-500'>
            Ir a la ruta login
          </button>
        </div>
      },
      {
        id: 'login',
        path: 'login',
        Component: lazy(
          () => import('./apps/Login/pages/Login'),
        ),
      },
      {
        id: 'register',
        path: 'signup',
        Component: lazy(
          () => import('./apps/Signup/pages/Signup'),
        ),
      }
    ]
  },
];

const Router = createBrowserRouter(routes);

export default Router;