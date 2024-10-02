'use client';

import { protectedRoutes } from '@/src/constant';
import { useUser } from '@/src/context/user.provider';
import { logout } from '@/src/services/auth';
import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';

import { usePathname, useRouter } from 'next/navigation';

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading: userLoading, user } = useUser();

  const handleLogout = () => {
    logout();

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/');
    }
    userLoading(true);
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className='cursor-pointer' src={user?.profilePhoto} />
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        <DropdownItem onClick={() => handleNavigation('/profile')}>
          Profile
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation('/profile/settings')}>
          Settings
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation('/profile/create-post')}>
          Create Post
        </DropdownItem>
        <DropdownItem
          onClick={handleLogout}
          key='delete'
          className='text-danger'
          color='danger'
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
