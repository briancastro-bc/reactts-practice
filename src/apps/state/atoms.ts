import { atom, } from 'recoil';

import { User } from '@contexts/shared/domain/User';

export const currentUserState = atom<User | null>({
  key: 'userState',
});