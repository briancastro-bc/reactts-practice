import { 
  FC, 
  useRef,
  useState,
  MouseEvent, 
} from 'react';

type InputProps = object & {
  type?: string;
  label: string;
  placeholder: string;
};

const Input: FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
}) => {
  if (!label || !placeholder) {
    throw new Error('Some props are required');
  }

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [focus, setFocus,] = useState<boolean>(false);
  // false = Ocultando la contraseña
  const [showPassword, setShowPassword,] = useState<boolean>(false);

  const handleShowPassword: (event: MouseEvent) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowPassword((isShowingPassword) => {
      // isShowingPassword = false / quiere decir que la contraseña esta oculta.
      if (!isShowingPassword) {
        inputRef.current!.type = 'text';
      } else {
        inputRef.current!.type = 'password';
      }

      return !isShowingPassword;
    });
  };

  return (
    <div className='flex flex-col gap-y-2'>
      <label className={`relative flex flex-col px-6 py-3 gap-y-1 rounded-lg border-2 ${focus ? 'border-blue-700' : 'border-gray-400'}`}>
        <span className={`text-sm font-bold leading-[14px] ${focus ? 'text-blue-700' : 'text-gray-700'}`}>
          {label}
        </span>
        <input
          ref={inputRef}
          className="focus:outline-none"
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)} />
        {type === 'password' && (
          <span 
            onClick={handleShowPassword}
            className='absolute top-[25%] right-0 my-auto py-1 px-4 bg-red-100 text-xs rounded-md text-red-900 mr-6 hover:cursor-pointer'>
            {!showPassword ? 'Mostrar contraseña' : 'Ocultar contraseña'}
          </span>
        )}
      </label>
    </div>
  );
}

export default Input;