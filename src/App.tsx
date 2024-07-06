/**
 * 
 * Creación de un componente en React.
 * 
 */
import { 
  FC, 
} from 'react';
import { RouterProvider, } from 'react-router-dom';

import Router from './Router';

type AppProps = object;

const App: FC<AppProps> = () => {
  return (
    <RouterProvider router={Router} />
  );
};

export default App;