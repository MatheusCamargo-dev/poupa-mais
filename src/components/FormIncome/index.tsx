'use client';
import { useForm, FormProvider } from 'react-hook-form';

import InputTransactions from '../InputTransactions';

export default function FormIncome() {
  const formProps = useForm();

  return (
    <FormProvider {...formProps}>
      <form className=" space-y-4 w-max">
        <InputTransactions
          name="title"
          label="Titulo:"
          placeholder="Titulo do rendimento"
          autoComplete="title"
          type="text"
        />
        <InputTransactions
          name="amount"
          label="Valor:"
          placeholder="Valor do rendimento"
          type="text"
        />
        <InputTransactions
          name="date"
          label="Data:"
          placeholder="Data do rendimento"
          autoComplete="date"
          type="date"
        />
        <InputTransactions
          name="type"
          label="Selecione a opcao"
          placeholder=""
          autoComplete=""
          type="select"
        />

        <InputTransactions
          name="type"
          label="Descricao:"
          placeholder="Uma breve descricao"
          autoComplete=""
          type="textarea"
        />

        <button
          type="submit"
          className="group relative flex w-full text-md justify-center rounded-3xl bg-teal-500 py-2 px-3 font-semibold text-slate-700 hover:bg-teal-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          + Adicionar rendimento
        </button>
      </form>
    </FormProvider>
  );
}
