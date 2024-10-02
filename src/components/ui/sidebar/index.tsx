'use client';
import { useUser } from '@/src/context/user.provider';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { SidebarOptions } from './SidebarOptions';
import { adminLinks, userLinks } from './constant';
import Image from 'next/image';

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div>
      <div className='rounded-xl bg-default-100 p-2'>
        <div className='rounded-md'>
          <Image
            src={
              user?.profilePhoto ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            alt='user-profile-photo'
            width={380}
            height={300}
          />
        </div>
        <div className='my-3'>
          <h1 className='text-2xl font-semibold'>{user?.name}</h1>
          <p className='break-words text-sm'>{user?.email}</p>
        </div>
        <Button
          as={Link}
          className='mt-2 w-full rounded-md'
          href={'/profile/create-post'}
        >
          Create a post
        </Button>
      </div>
      <div className='mt-3 space-y-2 rounded-xl bg-default-100 p-2'>
        <SidebarOptions
          links={user?.role === 'USER' ? userLinks : adminLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
