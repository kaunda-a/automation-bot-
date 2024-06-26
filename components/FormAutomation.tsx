// FormAutomation.tsx
import React, { useState } from 'react';
import FormField from './forms/FormField'; // Import the FormField component
import { automateFormSubmission } from '../utils/formAutomation';

const FormAutomation = () => {
  const [formUrl, setFormUrl] = useState('');
  // Update the state type to allow null or string
  const [result, setResult] = useState<null | string>(null);
  const [formData, setFormData] = useState<{ name: string; value: string }[]>([
    { name: '', value: '' },
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call form automation function with formUrl and formData
    const res = await automateFormSubmission(formUrl, formData);
    setResult(res); // Directly set the result without using a function
  };

  const handleFormDataChange = (
    index: number,
    field: 'name' | 'value',
    value: string
  ) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const addFormField = () => {
    setFormData([...formData, { name: '', value: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter form URL"
        value={formUrl}
        onChange={(e) => setFormUrl(e.target.value)}
      />
      {formData.map((field, index) => (
        <FormField
          key={index}
          index={index}
          field={field}
          onChange={handleFormDataChange}
        />
      ))}
      <button type="button" onClick={addFormField}>
        Add Field
      </button>
      <button type="submit">Submit Form</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
};

export default FormAutomation;