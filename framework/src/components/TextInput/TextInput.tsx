import './TextInput.css';
import * as React from 'react';

interface TextInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shake?: boolean;
}

const TextInput = ({
  id,
  type = 'text',
  placeholder,
  label,
  value,
  onChange,
  shake,
}: TextInputProps) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={shake ? 'shake' : ''}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
