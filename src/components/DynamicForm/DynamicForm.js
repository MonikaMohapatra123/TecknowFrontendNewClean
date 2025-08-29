import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DynamicForm.css';

const DynamicForm = ({ fields, apiUrl, successRedirect }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes for simple fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle input changes for array subfields (like keyplaces, photos, amenities)
  const handleArrayChange = (fieldName, index, subField, value) => {
    const updatedArray = [...(formData[fieldName] || [])];
    if (!updatedArray[index]) updatedArray[index] = {};
    updatedArray[index][subField] = value;
    setFormData({
      ...formData,
      [fieldName]: updatedArray,
    });
  };

  // Add a new item to an array field
  const handleAddItem = (fieldName) => {
    const updatedArray = [...(formData[fieldName] || []), {}];
    setFormData({
      ...formData,
      [fieldName]: updatedArray,
    });
  };

  // Remove an item from an array field
  const handleRemoveItem = (fieldName, index) => {
    const updatedArray = [...(formData[fieldName] || [])];
    updatedArray.splice(index, 1);
    setFormData({
      ...formData,
      [fieldName]: updatedArray,
    });
  };

  // Handle form submission (useCallback for stable reference)
  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      setLoading(true);

      try {
        console.log(formData); // Debug formData
        await axios.post(apiUrl, formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        setLoading(false);
        alert('Project created successfully!');
        navigate(successRedirect); // Redirect after success
      } catch (error) {
        console.error('Error creating project:', error);
        setLoading(false);
      }
    },
    [apiUrl, formData, navigate, successRedirect]
  );

  // Add a hotkey for form submission (Ctrl + S)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit]); // Include handleSubmit to avoid warnings

  return (
    <div className="dynamic-form">
      <h2>Create New Entry</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((fieldObj, index) => (
          <div key={index} className="form-group">
            <label>{fieldObj.fields}</label>

            {fieldObj.subfields ? (
              <div>
                {formData[fieldObj.fields]?.map((item, itemIndex) => (
                  <div key={itemIndex} className="array-group">
                    {fieldObj.subfields.map((subField, subIndex) => (
                      <div key={subIndex} className="form-group">
                        <label>{subField.fields}</label>
                        <input
                          type="text"
                          name={`${fieldObj.fields}-${subField.fields}`}
                          value={item[subField.fields] || ''}
                          onChange={(e) =>
                            handleArrayChange(
                              fieldObj.fields,
                              itemIndex,
                              subField.fields,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(fieldObj.fields, itemIndex)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddItem(fieldObj.fields)}
                  className="add-btn"
                >
                  Add {fieldObj.fields}
                </button>
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
        <div className="buttoneditPage">
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
