import React from 'react';
import "../style/slider.css"

const SliderDots = ({ totalSlides, currentSlide, handleDotClick }) => {
  const dots = Array.from({ length: totalSlides }, (_, index) => (
    <span
      key={index}
      onClick={() => handleDotClick(index)}
      className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
    />
  ));

  return <div className="slider-dots">{dots}</div>;
};

export default SliderDots;