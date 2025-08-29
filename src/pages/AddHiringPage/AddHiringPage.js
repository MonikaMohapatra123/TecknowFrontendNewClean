import React from 'react';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import { getStoredData } from "../../JsonFiles/fetchData.js";

const AddHiringPage = () => {
  const fields = getStoredData()?.["1"]?.AdminHiring ?? {};
  const apiUrl = 'https://technow-overseasbackend.vercel.app/hiring'; // API endpoint for creating product
  const successRedirect = '/AdminHiring'; // Redirect after successful product creation

  return (
    <div>
      <DynamicForm fields={fields} apiUrl={apiUrl} successRedirect={successRedirect} />
    </div>
  );
};

export default AddHiringPage