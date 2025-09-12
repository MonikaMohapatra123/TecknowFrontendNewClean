import React, { useRef, useEffect } from "react";
import "./HomeIconSlider.css";
import LogoSlider1 from "../../Assets/LogoSlider1.svg";
import LogoSlider2 from "../../Assets/LogoSlider2.svg";
import LogoSlider3 from "../../Assets/LogoSlider3.svg";
import LogoSlider4 from "../../Assets/LogoSlider4.svg";
import LogoSlider5 from "../../Assets/LogoSlider5.svg";
import LogoSlider6 from "../../Assets/LogoSlider6.svg";
import LogoSlider7 from "../../Assets/LogoSlider7.svg";
import LogoSlider8 from "../../Assets/LogoSlider8.svg";
import LogoSlider9 from "../../Assets/LogoSlider9.svg";
import LogoSlider10 from "../../Assets/LogoSlider10.svg";
import LogoSlider11 from "../../Assets/LogoSlider11.svg";
import LogoSlider12 from "../../Assets/LogoSlider12.svg";
import LogoSlider13 from "../../Assets/LogoSlider13.svg";
import LogoSlider14 from "../../Assets/LogoSlider14.svg";
import LogoSlider15 from "../../Assets/LogoSlider15.svg";
import LogoSlider16 from "../../Assets/LogoSlider16.svg";
import LogoSlider17 from "../../Assets/LogoSlider17.svg";
import LogoSlider18 from "../../Assets/LogoSlider18.svg";
import LogoSlider19 from "../../Assets/LogoSlider19.svg";

const logos = [
  LogoSlider1, LogoSlider2, LogoSlider3, LogoSlider4, LogoSlider5,
  LogoSlider6, LogoSlider7, LogoSlider8, LogoSlider9, LogoSlider10,
  LogoSlider11, LogoSlider12, LogoSlider13, LogoSlider14, LogoSlider15,
  LogoSlider16, LogoSlider17, LogoSlider18, LogoSlider19,
];

const testimonials = [
  {
    text: "… the quality of work produced by them is excellent and professional. Our company is always extremely satisfied with the work that Balance Engineering & Construction has delivered this project successful.",
    client: "Nawarat (Cambodia) Co.,Ltd",
    author: "Mr. Sathid Sittiphaisal"
  },
  {
    text: "It was not an easy task for Rahul and his team, but I can confirm that your people had a positive one on the job.",
    client: "Construction Australia",
    author: ""
  }
];

const HomeIconSlider = () => {
  const doubledLogos = logos.concat(logos);
  const doubledTestimonials = testimonials.concat(testimonials);

  const logoRef = useRef(null);
  const testimonialRef = useRef(null);

  // Drag-to-scroll function
  const enableDragScroll = (ref) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    const ele = ref.current;

    ele.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - ele.offsetLeft;
      scrollLeft = ele.scrollLeft;
      ele.classList.add("active-drag", "no-animation");
    });

    ele.addEventListener("mouseleave", () => {
      isDown = false;
      ele.classList.remove("active-drag", "no-animation");
    });

    ele.addEventListener("mouseup", () => {
      isDown = false;
      ele.classList.remove("active-drag", "no-animation");
    });

    ele.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - ele.offsetLeft;
      const walk = (x - startX) * 1.2;
      ele.scrollLeft = scrollLeft - walk;
    });
  };

  // Auto-slide effect
  const enableAutoSlide = (ref, speed) => {
    const ele = ref.current;
    let scrollAmount = 0;
    setInterval(() => {
      if (!ele.classList.contains("no-animation")) {
        ele.scrollLeft += 1; // auto scroll speed
        scrollAmount += 1;
        if (scrollAmount >= ele.scrollWidth / 2) {
          ele.scrollLeft = 0; // reset for infinite loop
          scrollAmount = 0;
        }
      }
    }, speed);
  };

  useEffect(() => {
    if (logoRef.current) {
      enableDragScroll(logoRef);
      enableAutoSlide(logoRef, 20); // 20ms for smooth scroll
    }
    if (testimonialRef.current) {
      enableDragScroll(testimonialRef);
      enableAutoSlide(testimonialRef, 30); // slower for testimonials
    }
  }, []);

  return (
    <div className="slider-section">
      <h2 className="slider-title">Satisfied Customers</h2>

      {/* Logo Slider */}
      <div className="slider-container" ref={logoRef}>
        <div className="slider-grid">
          {doubledLogos.map((logo, i) => (
            <div key={i} className="logo-box">
              <img src={logo} alt={`Client ${i}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Slider */}
      <div className="testimonial-slider-container" ref={testimonialRef}>
        <div className="testimonial-slider">
          {doubledTestimonials.map((item, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-text">{item.text}</div>
              <div className="testimonial-client">{item.client}</div>
              <div className="testimonial-author">{item.author}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeIconSlider;
