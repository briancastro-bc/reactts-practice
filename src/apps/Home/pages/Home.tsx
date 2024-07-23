/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  FC, 
  useState, 
  useEffect, 
  useCallback,
} from 'react';
import { useService, } from '@redtea/react-inversify';

import { Hotel } from '@contexts/shared/domain/models';
import { HttpRepository } from '@contexts/shared/domain/repositories/HttpRepository';

import HotelCard from './HotelCard/HotelCard';

type HomeProps = object;

const Home: FC<HomeProps> = () => {
  const [hotels, setHotels,] = useState<Array<Hotel>>([]);
  const [loading, setLoading,] = useState<boolean>(false);

  const fetchRepository = useService<HttpRepository>('Http');

  const getAllHotels: () => Promise<Array<Hotel>> = useCallback(async () => {
    const result = await fetchRepository.get<Array<Hotel>>('/hotels');
    return result.data;
  }, [fetchRepository,]);

  useEffect(() => {
    setLoading(true);

    getAllHotels()
      .then(setHotels)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, [getAllHotels]);

  return (
    <section className='w-full min-h-screen h-full overflow-hidden'>
      <div className='max-w-[1620px] py-6 mx-auto flex items-center gap-6'>
        {loading && (
          <p>Cargando hoteles...</p>
        )}
        {!loading && hotels && hotels?.length > 0 && hotels?.map(hotel => (
          <HotelCard 
            key={hotel?.id} 
            hotel={{...hotel}}/>
        ))}
      </div>
    </section>
  );
};

export default Home;