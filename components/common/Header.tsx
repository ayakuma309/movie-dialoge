import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "../../lib/auth";
import LogoutButton from "../login/LogoutButton";
const Header: React.FC = () => {
  const user = useUser();
  const [menuOpen, setMenuOpen] = useState(false); //leftMenuState

  //leftMenu関数
  const handleMenuOpenClick = () => {
    {
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <nav className="fixed left-0 z-50 block w-full shadow-2xl text-black bg-white">
      <div className="mx-auto md:mx-20 xl:mx-44">
        <div className="relative flex h-16 items-center justify-around sm:justify-between">
          <Link href="/">
            <div className="block h-7 w-auto font-bold text-4xl">セリフの映画館</div>
          </Link>
          {user !== null ? (
            <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-1">
              <div className="relative z-30 ml-3 mr-10 md:mr-0">
                <div
                  className="flex rounded-full text-sm text-gray-800 hover:opacity-70 focus:outline-none"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={handleMenuOpenClick}
                >
                  {user.photoURL ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.photoURL}
                      alt="avatar"
                    />
                  ): (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  )}
                </div>
                {menuOpen ? (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-100 px-2 py-1 shadow-lg focus:outline-none">
                    <Link href={`/users/${user?.uid}`}>
                      <p
                        className="block rounded-md px-3 py-2 text-sm text-gray-900 hover:bg-gray-300"
                        role="menuitem"
                      >
                        マイページ
                      </p>
                    </Link>
                    <LogoutButton />
                  </div>
                ) : undefined}
              </div>
            </div>
          ) : (
            <div>
              <Link href="/loginForm">
                <p>ログイン</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
