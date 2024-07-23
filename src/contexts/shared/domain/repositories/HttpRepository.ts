/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Operation, } from '@contexts/shared/domain/types';

export interface HttpRepository {
  get<T>(
    url: string, 
    params?: Record<string, any>
  ): Promise<Response<T> | Operation>;
  post<T>(
    url: string,
    body: any,
    params?: Record<string, any>,
  ): Promise<Response<T> | Operation>;
  put<T>(
    url: string,
    body: any,
    params?: Record<string, any>,
  ): Promise<Response<T> | Operation>;
  patch<T>(
    url: string,
    body: any,
    params?: Record<string, any>,
  ): Promise<Response<T> | Operation>;
  delete<T>(
    url: string,
    params?: Record<string, any>,
  ): Promise<Response<T> | Operation>;
}