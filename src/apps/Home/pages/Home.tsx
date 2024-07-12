/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState, } from 'react';

type HomeProps = object;

const Home: FC<HomeProps> = () => {
  const [token, setToken,] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('user_token');
    setToken(storedToken);
  }, []);

  return (
    <div className='p-4'>
      {token && (
        <p>Tienes una sesion iniciada</p>
      )}
      <button
        onClick={() => window.location.href = '/login'}
        className='py-2 px-4 bg-red-500'>
        Ir a la ruta login
      </button>
    </div>
  );
};

export default Home;