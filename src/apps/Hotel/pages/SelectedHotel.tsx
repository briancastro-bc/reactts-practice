import { 
  FC, 
  useCallback, 
  useEffect, 
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useService } from '@redtea/react-inversify';

import noImage from '@assets/noImage.png';

import { Hotel, } from '@contexts/shared/domain/models';
import { HttpRepository } from '@contexts/shared/domain/repositories/HttpRepository';
import Button from '@apps/Shared/Components/Button';

type SelectedHotelProps = object;

const SelectedHotel: FC<SelectedHotelProps> = () => {
  const navigate = useNavigate();
  const { id, } = useParams();

  const [loading, setLoading,] = useState<boolean>(false);

  const [hotel, setHotel,] = useState<Hotel | null>(null);

  const fetchRepository = useService<HttpRepository>('Http');

  const getHotelById: () => Promise<Hotel> = useCallback(async () => {
    const result = await fetchRepository.get<Hotel>(`/hotels/${id}`);
    return result.data;
  }, [
    id,
    fetchRepository,
  ]);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    if (isSubscribed)
      getHotelById()
        .then(setHotel)
        .catch((err) => { throw err; })
        .finally(() => setLoading(false));

    return () => {
      isSubscribed = false;
    };
  }, [getHotelById,]);

  return (
    <section className='w-full h-[calc(100vh-70px)] overflow-hidden'>
        <div className='h-full w-full overflow-y-auto'>
          {loading && (
            <div className='h-full w-full flex items-center justify-center'>
              <span>Cargando hotel...</span>
            </div>
          )}
          {!loading && (
            <div className='max-w-[1366px] w-full h-full mx-auto py-6'>
              <div className='flex flex-col gap-y-6'>
                <div className='flex items-center'>
                  <div className='grow max-w-[768px]'>
                    <img 
                      className='w-full h-full' 
                      src={hotel?.photo ?? noImage} 
                      alt={hotel?.name} />
                  </div>
                  <div className='grow'>
                    <h2>{hotel?.name}</h2>
                    <h3>{hotel?.country}</h3>
                    <span>{hotel?.city}</span>
                    <p>{hotel?.description}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                  {hotel && hotel?.Rooms && hotel?.Rooms?.length > 0 && hotel?.Rooms?.map(room => (
                    <div className='w-full flex items-center' key={room?.id}>
                      <span>{room?.codeName}</span>
                      <div className='ml-auto'>
                        <Button
                          onClick={() => navigate(`./reservation/${room?.id}`)}>
                          Reservar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
    </section>
  );
};

export default SelectedHotel;