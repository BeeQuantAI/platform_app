'use client';
import { FormGroup, FormGroupField, FormGroupLabel } from '@/shared/components/form/FormElements';
import React from 'react';

interface SelectProps {
  fieldName: string;
  options: string[];
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

function Select({ fieldName, options, onChangeHandler, value }: SelectProps): React.ReactNode {
  return (
    <FormGroup>
      <FormGroupLabel>{fieldName}</FormGroupLabel>
      <FormGroupField>
        <select
          value={value}
          name={fieldName}
          aria-label={fieldName}
          id={fieldName}
          onChange={(e) => onChangeHandler(e)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </FormGroupField>
    </FormGroup>
  );
}

export default Select;
