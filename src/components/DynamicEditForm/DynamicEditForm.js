import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./DynamicEditForm.css";

const DynamicEditForm = ({ fields, apiUrl }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // To indicate loading existing product data
  const [successMessage, setSuccessMessage] = useState(""); // For showing success message
  const { id } = useParams(); // Get the product ID (_id) from the route params

  // Fetch the current data for the product to be edited
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${id}`); // Fetch product data from API using _id
        setFormData(response.data); // Prepopulate form with existing data
        setFetching(false); // Finished fetching data
      } catch (error) {
        console.error('Error fetching product data:', error);
        setFetching(false);
      }
    };

    fetchProductData();
  }, [apiUrl, id]);

  // Handle input changes for flat fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle input changes for array subfields (like highlights, benefits, FAQs)
  const handleArrayChange = (fieldName, index, subField, value) => {
    const updatedArray = [...(formData[fieldName] || [])];
    if (!updatedArray[index]) {
      updatedArray[index] = {};
    }
    updatedArray[index][subField] = value;
    setFormData({
      ...formData,
      [fieldName]: updatedArray,
    });
  };

  // Handle adding a new item to an array field
  const handleAddItem = (fieldName) => {
    const updatedArray = [...(formData[fieldName] || []), {}];
    setFormData({
      ...formData,
      [fieldName]: updatedArray,
    });
  };

  // Handle removing an item from an array field
  const handleRemoveItem = (fieldName, index) => {
    const updatedArray = [...(formData[fieldName] || [])];
    updatedArray.splice(index, 1);
    setFormData({
      ...formData,
      [fieldName]: updatedArray,
    });
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(""); // Clear previous success message

    try {
      await axios.put(`${apiUrl}/${id}`, formData); // Send updated data with PUT request
      setLoading(false);
      setSuccessMessage("Product updated successfully!"); // Display success message
    } catch (error) {
      console.error('Error updating product:', error);
      setLoading(false);
    }
  };

  // Add a hotkey for form submission (Ctrl + S)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Prevent the browser's default save action
        handleSubmit(e); // Trigger form submission
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [formData]); // Include formData dependency to ensure the latest data is submitted

  if (fetching) {
    return <p>Loading product data...</p>;
  }

  return (
    <div className="dynamic-form">
      <form onSubmit={handleSubmit}>
        {fields.map((fieldObj, index) => (
          <div key={index} className="form-group">
            <label>{fieldObj.fields}</label>
            
            {fieldObj.subfields ? (
              <div>
                {formData[fieldObj.fields]?.map((item, itemIndex) => (
                  <div key={itemIndex} className="array-item">
                    {fieldObj.subfields.map((subField, subIndex) => (
                      <div key={subIndex} className="form-group">
                        <label>{subField.fields}</label>
                        <input
                          type="text"
                          name={`${fieldObj.fields}-${itemIndex}-${subField.fields}`}
                          value={item[subField.fields] || ''}
                          onChange={(e) => handleArrayChange(fieldObj.fields, itemIndex, subField.fields, e.target.value)}
                          required
                        />
                      </div>
                    ))}
                    <button type="button" onClick={() => handleRemoveItem(fieldObj.fields, itemIndex)}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddItem(fieldObj.fields)}>Add {fieldObj.fields}</button>
              </div>
            ) : (
              <input
                type="text"
                name={fieldObj.fields}
                value={formData[fieldObj.fields] || ''}
                onChange={handleInputChange}
                required
              />
            )}
          </div>
        ))}
        <div className='buttoneditPage'>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Event'}
          </button>
        </div>
      </form>

      {/* Show success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default DynamicEditForm;
