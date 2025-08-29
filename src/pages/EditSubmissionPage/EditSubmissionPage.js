import React from 'react';
import DynamicEditForm from '../../components/DynamicEditForm/DynamicEditForm.js'; // Import your form component
import { getStoredData } from "../../JsonFiles/fetchData.js";

const EditSubmissionPage = () => {
  const fields = getStoredData()?.["1"]?.AdminSubmission ?? {};
  const apiUrl = 'https://technow-overseasbackend.vercel.app/form'; // API URL for fetching/editing product
  const successRedirect = '/AdminSubmission'; // Where to redirect after a successful update

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

export default EditSubmissionPage;
