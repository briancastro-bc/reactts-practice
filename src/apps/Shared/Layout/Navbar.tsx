import {
  FC,
  ChangeEvent,
  ComponentPropsWithRef,
  useRef,
  useEffect,
} from 'react';
import { useNavigate, useSearchParams, } from 'react-router-dom';

type NavbarProps = object & ComponentPropsWithRef<'header'>;

const Navbar: FC<NavbarProps> = ({
  ref,
}) => {
  const navigate = useNavigate();
  const [queryParams, setQueryParams,] = useSearchParams();

  const timeoutRef = useRef<number | null>(null);

  const handleSearch: (event: ChangeEvent<HTMLInputElement>) => Promise<void> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const value = e?.target?.value;

    if (!value || value?.length === 0) {
      queryParams.delete('search');
      setQueryParams(undefined);
      return;
    }

    const params = { search: value, };

    setQueryParams({
      ...params,
    });

  };
  
  useEffect(() => {
    const value = queryParams.get('search');
    if (!value) {
      return;
    }
    
    timeoutRef.current = setTimeout(() => {
      navigate({
        pathname: '/results',
        search: `search=${value}`,
      });
    }, 1000);

    return () => {
      if (timeoutRef?.current)
        clearTimeout(timeoutRef.current);
    }
  }, [queryParams.get('search')]);

  return (
    <header 
      ref={ref} 
      className='z-10 w-full h-[--navbar-height] bg-white border-b border-b-gray-200 fixed rounded-b-xl'>
      <div className='w-full h-full flex items-center max-w-[1620px] mx-auto'>
        <a className='text-2xl font-primary font-bold'>
          Hotel
        </a>
        <div className='ml-auto'>
          <input
            type='search'
            placeholder='Buscar...'
            onChange={handleSearch}
            value={queryParams.get('search') ?? ''} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;