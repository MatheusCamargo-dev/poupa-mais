'use client';
import Skeleton from 'react-loading-skeleton';

export default function Loading() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-title">
        <Skeleton height={28} width={300} />
      </div>

      <div className="item-group">
        <div className="skeleton-item bg-dark">
          <Skeleton height={20} width={`100%`} />
        </div>

        <div className="skeleton-item bg-dark">
          <Skeleton height={20} width={`100%`} />
        </div>
      </div>

      <div className="item-group bg-dark">
        <div className="skeleton-item">
          <Skeleton height={20} width={`100%`} />
        </div>

        <div className="skeleton-item">
          <Skeleton height={20} width={`100%`} />
        </div>
      </div>

      <div className="item-group">
        <div className="skeleton-item">
          <Skeleton height={20} width={`100%`} />
        </div>

        <div className="skeleton-item">
          <Skeleton height={20} width={`100%`} />
        </div>
      </div>
    </div>
  );
}
