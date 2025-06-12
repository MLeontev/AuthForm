import * as React from 'react';
import './Checkbox.css';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <label>
      <input
        className="checkbox"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export default Checkbox;
