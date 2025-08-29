import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../../components/DynamicList&Grid/DynamicListGrid';
import { getStoredData } from "../../JsonFiles/fetchData.js";
import { useNavigate } from 'react-router-dom';
import "./AdminProjects.css";

const AdminProjects = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fields = getStoredData()?.["1"]?.AdminProjects ?? {};
  const totalData = getStoredData()?.["1"] ?? {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://technow-overseasbackend.vercel.app/projects');
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
    return <p>Loading products...</p>;
  }

  return (
    <div className="admin-products">
      <h2>{totalData.AdminProductListTitle}</h2>
      <button onClick={() => navigate(`${totalData.AdminProductListLink}`)}>
      {totalData.AdminProductListButton}
      </button>
      <ProductList products={products} fields={fields} redirect={totalData.AdminProjectsEdit} deleteApi="https://technow-overseasbackend.vercel.app/projects"/>
    </div>
  );
};

export default AdminProjects;