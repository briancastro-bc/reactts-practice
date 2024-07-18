import {
  FC,
  ComponentPropsWithRef,
} from 'react';

type NavbarProps = object & ComponentPropsWithRef<'header'>;

const Navbar: FC<NavbarProps> = ({
  ref,
}) => {
  return (
    <header 
      ref={ref} 
      className='z-10 w-full h-[--navbar-height] bg-white border-b border-b-gray-200 fixed rounded-b-xl'>
      <div className='w-full h-full flex items-center max-w-[1620px] mx-auto'>
        <a className='text-2xl font-primary font-bold'>
          Hotel
        </a>
      </div>
    </header>
  );
}

export default Navbar;