'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { MdDashboard } from 'react-icons/md';
import { TbFileImport } from 'react-icons/tb';
import { useDispatch } from 'react-redux';

import { setAuthenticated } from '@/features/Auth';
import { useStoreSelector } from '@/hooks/useStoreSelector';
import { destroyCookie } from 'nookies';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
const supabaseURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/poupa-mais`;
export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useStoreSelector((store) => store.User);
  const dispatch = useDispatch();
  const [navigation, setNavigation] = useState([
    {
      name: 'Dashboard',
      href: '/app',
      icon: <MdDashboard size={25} />,
      current: false
    },
    {
      name: 'Rendimentos',
      href: '/app/incomes',
      icon: <GiReceiveMoney size={25} />,
      current: false
    },
    {
      name: 'Despesas',
      href: '/app/expenses',
      icon: <GiPayMoney size={25} />,
      current: false
    },
    {
      name: 'Importações',
      href: '/app/importations',
      icon: <TbFileImport size={25} />,
      current: false
    }
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
    await destroyCookie({}, 'token');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(setAuthenticated(0));
    router.push('/');
  }
  return (
    <>
      <div className="min-h-screen sm:block bg-primary-blue">
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
                        ? 'bg-gray-900 relative bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white'
                        : 'bg group rounded-full px-4 py-3 text-gray-300 hover:text-teal-500 ',
                      'rounded-md px-3 py-2 text-sm font-medium min-w-max'
                    )}
                    key={item.name}
                  >
                    <Link
                      href={item.href}
                      onClick={() => currentPage(item.name)}
                      className="flex items-center space-x-4 "
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.icon}
                      <span>{item.name}</span>
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
                  src={user.avatar.length > 0 ? `${supabaseURL}/${user.avatar}` : `${supabaseURL}/avatars/6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.png`}
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
                  className="group group-hover:text-red-400"
                ></FiLogOut>
                <span className="group-hover:text-red-400">Sair</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// const SkeletonSidebar = () => {
//   return(
//     <div className="min-h-screen sm:block bg-primary-blue">
//       <div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r border-dark-blue hover:w-56 hover:bg-primary-blue hover:shadow-lg">
//         <div className="flex h-screen flex-col justify-between pt-2 pb-6">
//           <div>
//             <div className="w-max p-2.5 flex items-center space-x-3">
//               <img
//                 className=" h-8 w-auto lg:block"
//                 src="/PriceHouse.ico"
//                 alt="Your Company"
//               />
//               <h1 className="font-roboto text-2xl font-bold text-teal-400">
//                 {' '}
//                 Poupa Mais
//               </h1>
//             </div>
//             <ul className="mt-6 space-y-2 tracking-wide">
//               {Array.from([0, 1, 2, 3]).map(() => (
//                 <li
//                   className='bg-skeleton animate-pulse group text-gray-300 hover:text-teal-500
//                   rounded-md px-3 py-2 text-sm font-medium min-w-max'
//                   key={crypto.randomUUID()}
//                 >
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="w-max -mb-3 items-center">
//             <Link
//               href="/app/account"
//               className="flex px-3 space-x-3 cursor-pointer  w-56 items-center"
//             >
//               <img
//                 className="h-8 w-8 rounded-full"
//                 src="https://github.com/MatheusCamargo-dev.png"
//                 alt=""
//               />{' '}
//               <div className="flex flex-col justify-center">
//                 <span className="bg-skeleton animate-pulse px-4 py-2">
//                 </span>
//                 <span className=" bg-skeleton animate-pulse px-4 py-2">
//                 </span>
//               </div>
//             </Link>
//             <a
//               className="gbg group flex items-center space-x-4 rounded-full px-4 py-3 cursor-pointer text-gray-300 hover:text-white
//             "
//             >
//               <FiLogOut
//                 size={30}
//                 className="group group-hover:text-red-400"
//               ></FiLogOut>
//               <span className="group-hover:text-red-400">Sair</span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
