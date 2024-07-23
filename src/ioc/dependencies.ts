/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, } from 'inversify';

import { FetchHttpRepository } from '@contexts/shared/infrastructure/repositories/FetchHttpRepository';

export type InjectableType = 'class' | 'constant';

export type Injectable = {
  id: string;
  class: unknown;
  type: InjectableType;
};

const dependencies: Array<Injectable> = [
  {
    id: 'BACKEND_URL',
    class: import.meta.env.VITE_BACKEND_URL,
    type: 'constant',
  },
  {
    id: 'Http',
    class: FetchHttpRepository,
    type: 'class',
  },
];

export function bindCoreDependencies(container: Container): Container {
  dependencies.forEach(dependency => {
    const actions = {
      'constant': () => container
        .bind(dependency.id)
        .toConstantValue(dependency.class),
      'class': () => container
        .bind(dependency.id)
        .to(dependency.class as any)
        .inSingletonScope()
    }

    return actions[dependency.type]();
  });

  return container;
}