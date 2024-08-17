import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import src from '../../assets/portrait.jpg';
import src2 from '../../assets/portrait2.jpg';
import src3 from '../../assets/portrait3.jpg';
import src4 from '../../assets/shape.jpg';
import src5 from '../../assets/shape2.jpg';

function SimpleSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef([]);

  const images = [src, src2, src3, src4, src5]; // Tableau d'images
  const totalImages = images.length;

//   useEffect(() => {
//     // Animation GSAP lors du changement d'image
//     gsap.to(imageRefs.current, {
//       opacity: 0,
//       ease: 'power4.inOut',
//       onComplete: () => {
//         gsap.to(imageRefs.current[currentIndex], {
//           opacity: 1,
//           ease: 'power4.inOut'
//         });
//       }
//     });
//   }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel z-[4] w-full h-screen">
      <div className="carousel-images">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
            style={{ opacity: index === currentIndex ? 1 : 0 }}
            ref={(el) => (imageRefs.current[index] = el)}
          >
            <Image
              src={image}
              alt={`Slide ${index}`}
              placeholder="blur"
              fill
              objectFit='cover'
            />
          </div>
        ))}
      </div>
      <button onClick={goToPrevious} className="carousel-control prev">Previous</button>
      <button onClick={goToNext} className="carousel-control next">Next</button>
    </div>
  );
}

export default SimpleSlider;
