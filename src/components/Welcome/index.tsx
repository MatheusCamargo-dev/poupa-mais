'use client';
import { useStoreSelector } from '@/hooks/useStoreSelector';

export default function Welcome() {
  const user = useStoreSelector((store) => store.User);

  return (
    <h1 className="text-2xl text-white font-bold">
      Bem vindo novamente, {user.fullname} 👋
    </h1>
  );
}
