'use client';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center mt-20 w-full bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full shadow-lg max-w-7xl ">
        <SkeletonTheme baseColor="#e6eaec" highlightColor="#d7dcde">
          <div className="flex flex-col justify-center  items-center w-full rounded-lg bg-gray-100">
            <div className="bg-white p-8 rounded-lg  w-full max-w-7xl">
              <div className="skeleton-title mb-4">
                <Skeleton height={28} width={250} />
              </div>
              <div className="">
                <Skeleton height={130} width={`100%`} />
              </div>
              <div className="mt-4">
                <Skeleton height={35} width={`100%`} />
              </div>
              <div className="skeleton-title mb-4 mt-8">
                <Skeleton height={28} width={150} />
              </div>
              <div className="">
                <Skeleton height={130} width={`100%`} />
              </div>
              <div className="grid justify-end align-end mt-1">
                <Skeleton height={30} width={50} />
              </div>
            </div>
          </div>
        </SkeletonTheme>
      </div>
    </div>
  );
}
