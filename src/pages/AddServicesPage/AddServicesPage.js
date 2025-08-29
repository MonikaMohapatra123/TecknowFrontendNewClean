import React from 'react';
import { getStoredData } from "../../JsonFiles/fetchData.js";
import DynamicForm from '../../components/DynamicForm/DynamicForm';

const AddServicesPage = () => {
  const fields = getStoredData()?.["1"]?.AdminServices ?? {}
  const apiUrl = 'https://technow-overseasbackend.vercel.app/services'; // API endpoint for creating product
  const successRedirect = '/AdminServices'; // Redirect after successful product creation

  return (
    <div>
      <DynamicForm fields={fields} apiUrl={apiUrl} successRedirect={successRedirect} />
    </div>
  );
};
export default AddServicesPage