import { useStoreSelector } from "../useStoreSelector";

export const useBalanceValue = () => {

  const { totIncome } = useStoreSelector((store) => store.Incomes);
  const { totExpenses} = useStoreSelector((store) => store.Expenses);
  const balanceValue = totIncome - totExpenses;

  return {
    balanceValue
  }
}
