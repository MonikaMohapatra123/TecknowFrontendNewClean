import React, { useEffect } from 'react';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AllAboutTemplate({ title, description, image, image2 }) {
  const animationControls = useAnimation(); // Define animationControls
  const [ref, inView] = useInView(); // Define ref and inView

  useEffect(() => {
    if (inView) {
      animationControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1 },
      });
    }
  }, [animationControls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={animationControls}
    >
      <section className="bg-white ">
        <div className="gap-10 items-center py-8 px-4 mx-auto max-w-screen-xxl lg:grid lg:grid-cols-2 lg:py-16 lg:px-8 about-container">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-semibold text-gray-200 dark:text-black uppercase">{title + "_"}</h2>
            <p className="mb-4 text-base leading-relaxed text-gray-600 dark:text-gray-600 dark:text-black">{description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg" src={image} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" loading="lazy" />
            <img className="mt-4 w-full lg:mt-10 rounded-lg" src={image2} alt="Priya Infra Engineers Pvt Ltd - High-Quality Construction Services" loading="lazy" />
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default AllAboutTemplate;
