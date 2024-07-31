/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, } from 'recoil';

import { User } from '@contexts/shared/domain/models';

export const currentUserState = atom<User | null>({
  key: 'userState',
});

export const searchValueState = atom<string | null>({
  key: 'searchValue',
})

export const searchResultsState = atom<{
  rooms: Array<any> | null,
  hotels: Array<any> | null,
  users: Array<User> | null,
}>({
  key: 'searchResultsState',
});