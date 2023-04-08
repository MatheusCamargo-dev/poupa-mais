'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import { setAuthenticated } from '@/features/Auth';
import { useStoreSelector } from '@/hooks/useStoreSelector';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { destroyCookie } from 'nookies';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useStoreSelector((state: any) => state.User);
  const dispatch = useDispatch();
  const [navigation, setNavigation] = useState([
    { name: 'Dashboard', href: '/app', current: false },
    { name: 'Rendimentos', href: '/app/incomes', current: false },
    { name: 'Despesas', href: '/app/expenses', current: false }
  ]);

  useEffect(() => {
    const href = pathname;
    const currentNav = navigation.map((item: any) =>
      item.href == href
        ? { ...item, current: true }
        : { ...item, current: false }
    );
    setNavigation(currentNav);
  }, [pathname]);

  function currentPage(key: string) {
    const currentNav = navigation.map((item: any) =>
      item.name == key
        ? { ...item, current: true }
        : { ...item, current: false }
    );
    setNavigation(currentNav);
  }

  async function signOut() {
    if (destroyCookie({}, 'token')) {
      dispatch(setAuthenticated(0));
      router.push('/');
    }
  }
  return (
    <>
      <div className="min-h-screen hidden sm:block bg-primary-blue">
        <div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r border-dark-blue hover:w-56 hover:bg-primary-blue hover:shadow-lg">
          <div className="flex h-screen flex-col justify-between pt-2 pb-6">
            <div>
              <div className="w-max p-2.5 flex items-center space-x-3">
                <img
                  className=" h-8 w-auto lg:block"
                  src="/PriceHouse.ico"
                  alt="Your Company"
                />
                <h1 className="font-roboto text-2xl font-bold text-teal-400">
                  {' '}
                  Poupa Mais
                </h1>
              </div>
              <ul className="mt-6 space-y-2 tracking-wide">
                {navigation?.map((item) => (
                  <li
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 relative flex items-center space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white'
                        : 'bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-300 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium min-w-max'
                    )}
                    key={item.name}
                  >
                    <svg
                      className="-ml-1 h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                        className="fill-current text-cyan-400 dark:fill-slate-600"
                      ></path>
                      <path
                        d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                        className="fill-current text-cyan-200 group-hover:text-cyan-300"
                      ></path>
                      <path
                        d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                        className="fill-current group-hover:text-sky-300"
                      ></path>
                    </svg>
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => currentPage(item.name)}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-max -mb-3 items-center">
              <Link
                href="/app/account"
                className="flex px-3 space-x-3 cursor-pointer  w-56 items-center"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://github.com/MatheusCamargo-dev.png"
                  alt=""
                />{' '}
                <div className="flex flex-col justify-center">
                  <span className=" text-white text-semibold text-lg hover:text-teal-500 break-all">
                    {user.fullname}
                  </span>
                  <span className=" text-zinc-400 text-semibold text-lg break-all">
                    #{user.username}
                  </span>
                </div>
              </Link>
              <a
                onClick={signOut}
                className="gbg group flex items-center space-x-4 rounded-full px-4 py-3 cursor-pointer text-gray-300 hover:text-white
              "
              >
                <FiLogOut
                  size={30}
                  className="group group-hover:text-red-200"
                ></FiLogOut>
                <span className="group-hover:text-red-200">Sair</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar end right-2 fixed m-2 to-transparent p-2 sm:hidden border-2 bg-teal-500 border-white rounded-md">
        <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
    </>
  );
}
