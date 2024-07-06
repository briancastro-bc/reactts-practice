import { FC, } from 'react';

import Input from '../../Shared/Components/Input';

type LoginProps = object;

const Login: FC<LoginProps> = () => {
  return (
    <section className='h-screen w-full px-6'>
      <div className='flex flex-col gap-y-4'>
        <h1>Pagina de login</h1>
        <Input 
          type='email' 
          label='Correo electronico' 
          placeholder='example@mail.com' />
        <Input 
          type='password' 
          label='Contraseña' 
          placeholder='- - - - - - - -' />
      </div>
    </section>
  );
}

export default Login;