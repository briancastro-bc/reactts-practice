/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState, } from 'react';

import { Hotel } from '@contexts/shared/domain/models';

type HomeProps = object;

const Home: FC<HomeProps> = () => {
  const [hotels, setHotels,] = useState<Array<Hotel>>([]);
  const [loading, setLoading,] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getAllHotels = async () => {
      const result = await fetch('http://localhost:3000/hotels', {
        method: 'GET',
      });

      const data = await result.json();
      const hotels = data?.data;
      return hotels;
    };

    getAllHotels()
      .then(setHotels)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, []);

  return (
    <div className='p-4'>
      {loading && (
        <p>Estamos trayendo los hoteles</p>
      )}
      {!loading && hotels && hotels?.length > 0 && (
        <ul>
          {hotels?.map(hotel => (
            <li key={hotel.id}>
              {hotel.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;