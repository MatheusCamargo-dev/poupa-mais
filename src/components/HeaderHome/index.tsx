'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useState, useEffect } from 'react';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function HeaderHome() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [navigation, setNavigation] = useState([
    { name: 'Home', href: '/', current: false },
    { name: 'Login', href: '/account?type=login', current: false },
    { name: 'Register', href: '/account?type=register', current: false }
  ]);

  useEffect(() => {
    const href = pathname + (type ? `?type=${type}` : '');
    const currentNav = navigation.map((item: any) =>
      item.href == href
        ? { ...item, current: true }
        : { ...item, current: false }
    );
    setNavigation(currentNav);
  }, [pathname, type]);

  function currentPage(key: string) {
    const currentNav = navigation.map((item: any) =>
      item.name == key
        ? { ...item, current: true }
        : { ...item, current: false }
    );
    setNavigation(currentNav);
  }

  return (
    <Disclosure as="nav" className="bg-white shadow-lg z-500">
      {({ open }) => (
        <>
          <div className="ml max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center justify-center ml-2 sm:mr-auto">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="/PriceHouse.ico"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block text-white"
                      src="/PriceHouse.ico"
                      alt="Your Company"
                    />
                  </div>
                  <h1 className="font-roboto font-bold text-teal-400">
                    {' '}
                    Poupa Mais
                  </h1>
                </div>
                <div className="hidden sm:ml-6 sm:block ml-auto">
                  <div className="flex space-x-4 ">
                    {navigation?.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'border-b-4 border-teal-500 text-black'
                            : 'text-gray-500 hover:border-teal-400 hover:border-b-4 hover:text-black',
                          'rounded-1 px-3 py-2 text-sm font-medium'
                        )}
                        onClick={() => currentPage(item.name)}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {({ close }) => (
              <div className="space-y-1 px-2 pt-2 pb-3 flex flex-col">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-teal-500 text-white'
                        : 'text-gray-300 hover:bg-teal-500 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium ui-close:rotate-90 ui-close:transform'
                    )}
                    onClick={() => {
                      currentPage(item.name);
                      close();
                    }}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
