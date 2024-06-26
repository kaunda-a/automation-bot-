// FormField.tsx
import React from 'react';

interface FormFieldProps {
  index: number;
  field: { name: string; value: string };
  onChange: (index: number, fieldName: 'name' | 'value', value: string) => void;
}

const FormField: React.FC<FormFieldProps> = ({ index, field, onChange }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'name' | 'value'
  ) => {
    onChange(index, fieldName, e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Field Name"
        value={field.name}
        onChange={(e) => handleChange(e, 'name')}
      />
      <input
        type="text"
        placeholder="Field Value"
        value={field.value}
        onChange={(e) => handleChange(e, 'value')}
      />
    </div>
  );
};

export default FormField;
