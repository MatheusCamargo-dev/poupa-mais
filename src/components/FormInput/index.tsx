import React from 'react';

import ErrorMessage from '../ErrorMessage';

type InputProps = {
  name: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  type: string;
  error?: any;
  register: any;
};

const FormInput: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  autoComplete,
  type,
  error,
  register
}) => {
  return (
    <div>
      <label htmlFor={name} className="text-teal-500">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        className={`${
          error ? 'border-2 border-red-400' : 'border-1'
        } block border border-grey w-full p-3 rounded`}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
      {error && <ErrorMessage errorMessage={error}></ErrorMessage>}
    </div>
  );
};

export default FormInput;
