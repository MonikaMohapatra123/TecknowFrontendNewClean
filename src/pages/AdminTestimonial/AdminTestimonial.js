import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../../components/DynamicList&Grid/DynamicListGrid';
import { getStoredData } from "../../JsonFiles/fetchData.js";
import { useNavigate } from 'react-router-dom';
import "./AdminTestimonial.css";

const AdminTestimonial = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fields = getStoredData()?.["19"]?.AdminTestimonial ?? {};
  const totalData = getStoredData()?.["19"] ?? {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://technow-overseasbackend.vercel.app/testimonial');
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
    return <p>Loading Testimonials...</p>;
  }

  return (
    <div className="admin-products">
      <h2>{totalData.AdminTestimonialListTitle}</h2>
      <button onClick={() => navigate(`${totalData.AdminTestimonialListLink}`)}>
      {totalData.AdminTestimonialListButton}
      </button>
      <ProductList products={products} fields={fields} redirect={totalData.AdminProjectsEdit} deleteApi="https://technow-overseasbackend.vercel.app/testimonial"/>
    </div>
  );
};
export default AdminTestimonial