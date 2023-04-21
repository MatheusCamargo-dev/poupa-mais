'use client';
import { CiImport } from 'react-icons/ci';

import TransactionItems from '../TransactionItems';

import { useOFXReader } from '@/hooks/useOFXReader';

export default function OFXReader() {
  const { handleFileChange, transactions, hiddenFileInput, handleClick } =
    useOFXReader();

  return (
    <div className="flex pt-8 space-x-4">
      <div className="bg-white border-2 rounded-2xl border-zinc-300 w-1/4 px-6 py-8 h-max space-y-4">
        <h1 className="text-3xl font-bold whitespace-nowrap">
          OFX - Transações
        </h1>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".ofx"
          ref={hiddenFileInput}
        ></input>
        <button
          className=" bg-teal-400 hover:bg-teal-500 h-12 rounded-3xl text-white px-8 whitespace-nowrap flex items-center gap-2"
          onClick={handleClick}
        >
          Importar arquivo OFX <CiImport size={25} className="" />
        </button>
      </div>
      <TransactionItems transactions={transactions} />
    </div>
  );
}
