import { Container, }  from 'inversify';

import { 
  Injectable, 
  InjectableType,
  bindCoreDependencies,
} from './dependencies';

const container = bindCoreDependencies(new Container());

export {
  container,
  type Injectable,
  type InjectableType,
};
export * from 'inversify';