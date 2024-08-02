/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  FC, 
  useCallback, 
  useRef, 
  useState,
} from 'react';
import { useForm, SubmitHandler, } from 'react-hook-form';
import { useSnackbar, } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '@Shared/Components/Input';
import Button from '@apps/Shared/Components/Button';
import { useService } from '@redtea/react-inversify';
import { HttpRepository } from '@contexts/shared/domain/repositories/HttpRepository';
import { Operation } from '@contexts/shared/domain/types';

type ReservationPros = object;

const Reservation: FC<ReservationPros> = () => {
  const snackbarRef = useRef<number | string | null>(null);

  const navigate = useNavigate();
  const { roomId, } = useParams();

  const {
    closeSnackbar,
    enqueueSnackbar,
  } = useSnackbar();

  const [loading, setLoading,] = useState<boolean>(false);

  const fetchRepository = useService<HttpRepository>('Http');

  const createReservation = useCallback(async (data) => {
    const result = await fetchRepository.post<Operation>('/reservations', data);
    return result;
  }, [fetchRepository,]);

  const {
    register,
    handleSubmit,
    formState: { isValid, }
  } = useForm<{
    startDate: Date;
    endDate: Date;
    nightsQuantity: number;
    phoneNumber: string;
    address: string;
  }>({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  // TODO: crear preview de la reserva y confirmacion
  // const handleReservationReview = (submit: SubmitHandler<any>) => {
  //   console.log('submit', submit);
  // }

  const onSubmit: SubmitHandler<any> = async (data) => {
    setLoading(true);
    const result = await createReservation({
      ...data,
      roomId, 
    });
    if (result && result?.success) {
      if (snackbarRef?.current) 
        closeSnackbar(snackbarRef?.current);

      enqueueSnackbar('Se ha creado la reserva', {
        variant: 'success',
      });
      return navigate('/');
    }

    if (snackbarRef?.current)
      closeSnackbar(snackbarRef?.current);

    enqueueSnackbar(result?.message ?? 'Algo salio mal', {
      variant: 'error',
    });

    setLoading(false);
  };

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
              <div className='w-full flex flex-col gap-y-6'>
                <div className='grow w-full flex items-center gap-x-4'>
                  <Input
                    name='startDate'
                    register={register('startDate', {
                      required: true,
                    })}
                    type='date'
                    label='Desde'
                    placeholder='dd/mm/yyyy'/>
                  <Input
                    name='endDate'
                    register={register('endDate', {
                      required: true,
                    })}
                    type='date'
                    label='Hasta'
                    placeholder='dd/mm/yyyy'/>
                </div>
                <div className='w-full flex items-center gap-x-4'>
                  <Input
                    name='phoneNumber'
                    register={register('phoneNumber', {
                      required: true,
                    })}
                    type='text'
                    label='Número de teléfono'
                    placeholder='Ej. +57 30030030000'/>
                  <Input
                    name='address'
                    register={register('address', {
                      required: true,
                    })}
                    type='text'
                    label='Dirección'
                    placeholder='Ej. Calle 1A Norte'/>
                </div>
                <Input 
                  name='nightsQuantity'
                  register={register('nightsQuantity', {
                    required: true,
                  })}
                  type='number'
                  label='Cantidad de noches'
                  placeholder='Ej. 5' />
                <div>
                  <Button
                    disabled={!isValid}
                    onClick={handleSubmit(onSubmit)}>
                    Enviar reserva
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
    </section>
  );
};

export default Reservation;