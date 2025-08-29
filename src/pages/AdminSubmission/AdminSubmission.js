import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../../components/DynamicList&Grid/DynamicListGrid';
import { getStoredData } from "../../JsonFiles/fetchData.js";
// import { useNavigate } from 'react-router-dom';
import "./AdminSubmission.css";

const AdminSubmission = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  const fields = getStoredData()?.["1"]?.AdminSubmission ?? {};
  const totalData = getStoredData()?.["1"] ?? {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://technow-overseasbackend.vercel.app/form');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading form data...</p>;
  }

  return (
    <div className="admin-products">
      <h2>Form List</h2>
      <ProductList products={products} fields={fields} redirect={totalData.AdminSubmissionEdit} deleteApi="https://technow-overseasbackend.vercel.app/form"/>
    </div>
  );
};

export default AdminSubmission;