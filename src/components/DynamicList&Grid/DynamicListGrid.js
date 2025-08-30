import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import "./DynamicListGrid.css";

const ProductList = ({ products, fields, redirect, deleteApi, showEdit = true, showDelete = true }) => {
  const navigate = useNavigate();

  // Function to handle editing a product
  const handleEdit = (_id) => {
    const currentUrl = window.location.pathname;
    const redirectUrl = `${currentUrl}/${_id}`;
    navigate(redirectUrl);
  };

  // Function to handle deleting a product
  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`${deleteApi}/${_id}`);
        alert('Product deleted successfully!');
        window.location.reload(); // Reload the page or refetch the products
      } catch (error) {
        console.error("Error deleting product:", error);
        alert('Failed to delete product.');
      }
    }
  };

  // Function to handle rendering complex fields (objects or arrays)
  const renderField = (fieldValue) => {
    if (Array.isArray(fieldValue)) {
      return fieldValue.map(item => (typeof item === 'object' ? item.title || JSON.stringify(item) : item)).join(', ');
    } else if (typeof fieldValue === 'object' && fieldValue !== null) {
      return JSON.stringify(fieldValue);
    }
    return fieldValue;
  };

  // Limit fields to first 5
  const limitedFields = fields.slice(0, 5);

  // Sort products by _id in ascending order
  const sortedProducts = products.sort((a, b) => (a._id > b._id ? 1 : -1));

  // Convert field names to Title Case
  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  // Navigate to the admin page
  const navigateToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div>
      <div className="admin-icon" onClick={navigateToAdmin} style={{ cursor: 'pointer', marginBottom: '10px' }}>
        <FontAwesomeIcon icon={faHome} size="2x" title="Go to Admin" />
      </div>
      <table className="product-table">
        <thead>
          <tr>
            {limitedFields.map(field => (
              <th key={field.fields}>{formatFieldName(field.fields)}</th>
            ))}
            {showEdit && <th>Edit</th>} {/* Add an extra column for the edit button */}
            {showDelete && <th>Delete</th>} {/* Add an extra column for the delete button */}
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => (
            <tr key={product._id}>
              {limitedFields.map(field => (
                <td key={field.fields} data-label={formatFieldName(field.fields)}>
                  {field.fields === 'photo' ? (
                    <img
                      src={product[field.fields]}
                      alt={product.title}
                      style={{ maxWidth: '50px' }} loading="lazy"
                    />
                  ) : (
                    renderField(product[field.fields])
                  )}
                </td>
              ))}
              {showEdit && (
                <td>
                  <button onClick={() => handleEdit(product._id)} className="edit-btn">
                    Edit
                  </button>
                </td>
              )}
              {showDelete && (
                <td>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
