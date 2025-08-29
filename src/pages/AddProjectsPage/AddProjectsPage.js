import React from 'react';
import { getStoredData } from "../../JsonFiles/fetchData.js";
import DynamicForm from '../../components/DynamicForm/DynamicForm';

const AddProjectsPage = () => {
  const fields = getStoredData()?.["1"]?.AdminProjects ?? {};
  const apiUrl = 'https://technow-overseasbackend.vercel.app/projects'; // API endpoint for creating product
  const successRedirect = '/AdminProjects'; // Redirect after successful product creation

  return (
    <div>
      <DynamicForm fields={fields} apiUrl={apiUrl} successRedirect={successRedirect} />
    </div>
  );
};

export default AddProjectsPage;