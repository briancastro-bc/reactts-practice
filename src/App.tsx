/**
 * 
 * Creación de un componente en React.
 * 
 */
import { 
  FC, 
  useState,
} from 'react';

// ! NOTA: esto solo se utiliza con ts.
type AppProps = object;

const App: FC<AppProps> = () => {
  // Sintaxis del use State, [valor almacenado, funcion encargada de cambiar el valor];
  // [getter, setter];
  const [counter, setCounter,] = useState<number>(0);
  const [name, setName,] = useState<string>('Brian');
  const [users, setUsers,] = useState<string[]>([
    'Brian',
    'Julian',
    'Alberto',
    'Lola',
  ]);

  return (
    <div className='p-6'>
      <h1 className='text-red-500'>Hola mundo!</h1>
      <div className='flex flex-col gap-y-4'>
        <h2>{counter}</h2>
        <ul>{users}</ul>
        <p>Nombre actual: {name}</p>
        <div className='flex items-center gap-x-4'>
          <button onClick={() => setCounter(counter + 1)}>
            Aumentar
          </button>
          <button onClick={() => setCounter(counter - 1)}>
            Decrementar
          </button>
          <button onClick={() => {
            const randomNumber = Math.floor(Math.random() * users.length);
            setName(users[randomNumber]);
          }}>
            Cambiar el primer nombre
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;