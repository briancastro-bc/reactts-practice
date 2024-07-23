/**
 * 
 * Creación de un componente en React.
 * 
 */
import {
  FC,
  useCallback,
  useEffect,
} from 'react';
import { useSetRecoilState, } from 'recoil';
import { SnackbarProvider, } from 'notistack';
import { RouterProvider, } from 'react-router-dom';
import { Context, } from '@redtea/react-inversify';

import { container, } from '@ioc/inversify';

import { User } from '@contexts/shared/domain/User';
import { HttpRepository } from '@contexts/shared/domain/repositories/HttpRepository';

import { currentUserState, } from '@state/atoms';

import Router from './Router';

const FIVE_SECONDS_IN_MS = 5000;

type AppProps = object;

const App: FC<AppProps> = () => {

  const setCurrentUser = useSetRecoilState(currentUserState);

  const fetchRepository = container.get<HttpRepository>('Http');

  const getUserInfo: () => Promise<User> = useCallback(async () => {
    const result = await fetchRepository
      .get<User>('/users/userinfo', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
        },
      });
    console.log('result from', result);
    const user = result?.data;
    if (!user) return null;

    console.log('user', user);
    return user;
  }, [fetchRepository]);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      getUserInfo()
        .then(setCurrentUser)
        .catch((err) => console.log(err))
        .finally();

    return () => {
      isSubscribed = false;
    }
  }, [getUserInfo,]);

  return (
    <Context.Provider value={container}>
      <SnackbarProvider
        preventDuplicate
        autoHideDuration={FIVE_SECONDS_IN_MS}
        maxSnack={5}>
        <RouterProvider router={Router} />
      </SnackbarProvider>
    </Context.Provider>
  );
};

export default App;