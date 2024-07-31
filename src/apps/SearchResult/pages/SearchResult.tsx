import { FC, useCallback, useEffect, useState, } from 'react';
import { useRecoilState, } from 'recoil';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useService } from '@redtea/react-inversify';

import { searchResultsState } from '@state/atoms';
import { Hotel, Room, User } from '@contexts/shared/domain/models';
import { HttpRepository } from '@contexts/shared/domain/repositories/HttpRepository';

import Stepper from '@Shared/Layout/Stepper';
import HotelCard from '@apps/Home/pages/HotelCard/HotelCard';

type SearchResultProps = object;

const SearchResult: FC<SearchResultProps> = () => {
  const navigate = useNavigate();
  const [loading, setLoading,] = useState<boolean>(false);
  const [currentStep, setCurrentStep,] = useState<number>(0);

  const [queryParams,] = useSearchParams();

  const fetchRepository = useService<HttpRepository>('Http');

  // const [searchResults, setSearchResults] = useRecoilState(searchResultsState)
  const [searchResults, setSearchResults] = useState<{
    rooms: Array<Room>;
    hotels: Array<Hotel>;
    users: Array<User>;
  }>()

  const getAllSearchResults = useCallback(async () => {
    const search = queryParams.get('search');
    if (!search) {
      return [];
    }

    const result = await fetchRepository.get(`/search?value=${search}`);
    return result?.data;
  }, [
    fetchRepository,
    queryParams.get('search'),
  ]);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    if (isSubscribed)
      getAllSearchResults()
        .then(setSearchResults)
        .catch(err => console.error(err))
        .finally(() => setLoading(false));

    return () => {
      isSubscribed = false;
    };
  }, [getAllSearchResults,])

  useEffect(() => {
    const search = queryParams.get('search');
    if (!search || search?.length === 0) {
      navigate('/');
    }
  }, [queryParams.get('search'),])

  return (
    <section className='w-full min-h-screen h-screen overflow-hidden'>
      <div className='max-w-[1366px] h-full mx-auto py-6'>
        <div className='w-full h-auto flex items-center gap-x-4'>
          <span 
            className='text-lg leading-4 hover:cursor-pointer'
            style={{
              ...(currentStep === 0 && {
                fontWeight: 700,
                color: 'green',
              }),
            }}
            onClick={() => setCurrentStep(0)}>
            Hoteles
          </span>
          <span 
            className='text-lg leading-4 hover:cursor-pointer'
            style={{
              ...(currentStep === 1 && {
                fontWeight: 700,
                color: 'green',
              }),
            }}
            onClick={() => setCurrentStep(1)}>
            Habitaciones
          </span>
          <span 
            className='text-lg leading-4 hover:cursor-pointer'
            style={{
              ...(currentStep === 2 && {
                fontWeight: 700,
                color: 'green',
              }),
            }}
            onClick={() => setCurrentStep(2)}>
            Usuarios
          </span>
        </div>
        <div className='w-full h-full mt-8 flex flex-col justify-start items-start'>
          <Stepper currentStep={currentStep}>
            <div className='grow h-full w-full flex gap-x-6 flex-wrap'>
              {!loading && searchResults && searchResults?.hotels?.length > 0 && searchResults?.hotels?.map(hotel => (
                <HotelCard key={hotel?.id} hotel={hotel}/>
              ))}
              {loading && (
                <p>Cargando...</p>
              )}
              {!loading && searchResults && searchResults?.hotels?.length <= 0 && (
                <p>No se encontraron hoteles</p>
              )}
            </div>
            <div className='grow h-full w-full flex gap-x-6 flex-wrap'>
              <ul>
                {!loading && searchResults && searchResults?.rooms?.length > 0 && searchResults?.rooms?.map(room => (
                  <li key={room?.id}>
                    {room.codeName}
                  </li>
                ))}
              </ul>
              {loading && (
                <p>Cargando...</p>
              )}
              {!loading && searchResults && searchResults?.rooms?.length <= 0 && (
                <p>No se encontraron habitaciones</p>
              )}
            </div>
            <div className='grow h-full w-full flex gap-x-6 flex-wrap'>
              <ul>
                {!loading && searchResults && searchResults?.users?.length > 0 && searchResults?.users?.map(user => (
                  <li key={user?.id}>
                    {user.name}
                  </li>
                ))}
              </ul>
              {loading && (
                <p>Cargando...</p>
              )}
              {!loading && searchResults && searchResults?.users?.length <= 0 && (
                <p>No se encontraron usuarios</p>
              )}
            </div>
          </Stepper>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;