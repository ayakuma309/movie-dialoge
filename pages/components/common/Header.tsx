import React from 'react'
import Link from 'next/link'
import { useUser, logout } from "../../../lib/auth";
const Header: React.FC = () => {
  const user = useUser();

  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };

  return (
    <nav className='fixed left-0 z-50 block w-full bg-gray-900 bg-opacity-95 shadow-2xl'>
      <div className='mx-auto md:mx-20 xl:mx-44'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute right-0 mt-2 text-white'>
            {user !== null ? (
              <button onClick={handleLogout}>ログアウト</button>
            ) : (
              <Link href="/loginForm">
                <p>ログイン</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Header
