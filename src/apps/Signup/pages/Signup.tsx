import { FC, MouseEvent, useState, } from 'react';

import Card from '@Shared/Components/Card';
import Input from '@Shared/Components/Input';
import Button from '@Shared/Components/Button';

type SignupProps = object;

const Signup: FC<SignupProps> = () => {

  const [userData, setUserData,] = useState<{
    name: string | null;
    email: string | null;
    password: string | null;
  } | null>(null);
  const [loading, setLoading,] = useState<boolean>(false);

  const handleInputName = (value: string) => {
    setUserData((previousState)  => ({
      ...previousState,
      name: value,
    }));
  };

  const handleInputEmail = (value: unknown) => {
    setUserData((previousState)  => ({
      ...previousState,
      email: value,
    }));
  };
  
  const handleInputPassword = (value: unknown) => {
    setUserData((previousState)  => ({
      ...previousState,
      password: value,
    }));
  };

  const onSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);

    // userData = name, email, password
    console.log('user data', userData);
    try {
      const body = JSON.stringify(userData);

      const response = await fetch('http://localhost:3000/auth/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
  
      const data = await response.json();
      console.log('response', data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='relative h-screen w-full overflow-hidden'>
      <div className='h-full w-full max-w-[1620px] mx-auto'>
        <div className='h-full w-full flex items-center'>
          <div className='grow'></div>
          <div className='grow h-full flex flex-col items-center justify-center p-6'>
            <Card
              title='Registrese'>
              <Input
                name='name'
                label='Nombre completo'
                placeholder='Ej. Pepe'
                onChange={handleInputName} />
              <Input
                type="email"
                name='email'
                label='Correo electronico'
                placeholder='example@mail.com'
                onChange={handleInputEmail} />
              <Input
                type='password'
                name='password'
                label='Contraseña'
                placeholder='- - - - - - - -'
                onChange={handleInputPassword} />
              <Button
                onClick={(e) => onSubmit(e)}
                disabled={!userData?.email || !userData?.name || !userData?.password}>
                Registrarme
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;