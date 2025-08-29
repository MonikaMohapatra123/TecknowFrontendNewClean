import React from 'react';
import DynamicEditForm from '../../components/DynamicEditForm/DynamicEditForm.js'; // Import your form component
import { getStoredData } from "../../JsonFiles/fetchData.js";

const AdminEditProductPage = () => {
  const fields = getStoredData()?.["1"]?.AdminProjects ?? {};
  const apiUrl = 'https://technow-overseasbackend.vercel.app/projects'; // API URL for fetching/editing product
  const successRedirect = '/AdminProjects'; // Where to redirect after a successful update

  return (
    <div>
      <DynamicEditForm
        fields={fields}
        apiUrl={apiUrl}
        successRedirect={successRedirect}
      />
    </div>
  );
};

export default AdminEditProductPage;
