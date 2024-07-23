/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable, } from '@ioc/inversify';
import { Response, Operation } from '@contexts/shared/domain/types';
import { HttpRepository, } from '@contexts/shared/domain/repositories/HttpRepository';

@injectable()
export class FetchHttpRepository implements HttpRepository {
  constructor(
    @inject('BACKEND_URL') private readonly backendUrl: string,
  ) {}

  async get<T>(
    url: string, 
    params: Record<string, any> = {},
  ): Promise<Response<T> | Operation> {
    try {
      const endpoint = new URL(url, this.backendUrl);

      const {
        headers = {},
      } = params;

      const request = await fetch(endpoint, {
        method: 'GET',
        // ...(params && {
        //   ...params,
        // }),
        headers: {
          'Content-Type': 'application/json',
          ...(headers && {
            ...headers,
          }),
        },
      });

      const result = await request.json() as Response<T>;
      return result;
    } catch (e) {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  async post<T>(
    url: string, 
    body: any, 
    params: Record<string, any> = {}
  ): Promise<Response<T> | Operation> {
    try {
      const endpoint = new URL(url, this.backendUrl);

      const {
        headers = {},
      } = params;

      const request = await fetch(endpoint, {
        method: 'POST',
        ...(params && {
          ...params,
        }),
        headers: {
          'Content-Type': 'application/json',
          ...(headers && {
            ...headers,
          }),
        },
        body: body && JSON.stringify(body),
      });

      const result = await request.json() as Response<T>;
      return result;
    } catch {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  async put<T>(
    url: string, 
    body: any, 
    params: Record<string, any> = {},
  ): Promise<Response<T> | Operation> {
    try {
      const endpoint = new URL(url, this.backendUrl);

      const {
        headers = {},
      } = params;

      const request = await fetch(endpoint, {
        method: 'PUT',
        ...(params && {
          ...params,
        }),
        headers: {
          'Content-Type': 'application/json',
          ...(headers && {
            ...headers,
          }),
        },
        body: body && JSON.stringify(body),
      });

      const result = await request.json() as Response<T>;
      return result;
    } catch {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  async patch<T>(
    url: string, 
    body: any, 
    params: Record<string, any> = {},
  ): Promise<Response<T> | Operation> {
    try {
      const endpoint = new URL(url, this.backendUrl);

      const {
        headers = {},
      } = params;

      const request = await fetch(endpoint, {
        method: 'PATCH',
        ...(params && {
          ...params,
        }),
        headers: {
          'Content-Type': 'application/json',
          ...(headers && {
            ...headers,
          }),
        },
        body: body && JSON.stringify(body),
      });

      const result = await request.json() as Response<T>;
      return result;
    } catch {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  async delete<T>(
    url: string, 
    params: Record<string, any> = {},
  ): Promise<Response<T> | Operation> {
    try {
      const endpoint = new URL(url, this.backendUrl);

      const {
        headers = {},
      } = params;

      const request = await fetch(endpoint, {
        method: 'DELETE',
        ...(params && {
          ...params,
        }),
        headers: {
          'Content-Type': 'application/json',
          ...(headers && {
            ...headers,
          }),
        },
      });

      if (request.status === 204) {
        return {
          success: true,
          message: 'Success',
        };
      }

      const result = await request.json() as Response<T>;
      return result;
    } catch {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }
}