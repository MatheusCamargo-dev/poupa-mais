import numeral from 'numeral';
import 'numeral/locales/pt-br';
numeral.locale('pt-br');
export const toBRL = (value: number) => {
  return numeral(value).format('$ 0,0.00');
};
