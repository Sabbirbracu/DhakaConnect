import React, { useEffect, useState } from 'react';
import '/Users/sabbirahmad/Desktop/DhakaConnect/src/index.css';

const Slider = ({ slides, headingPosition, paraPosition, buttonPosition, containerStyles, style }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Automatically change slides if multiple slides are provided
    useEffect(() => {
        if (slides.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 3000); // Change every 3 seconds
            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [slides]);

    if (!slides || slides.length === 0) {
        return <div>No slides available</div>;
    }

    return (
        <div className={`slider-section w-full overflow-hidden ${containerStyles}`} style={style}>
            {/* Render slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
                        index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
                    style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                    {/* Heading */}
                    <div
                        className="slider-heading absolute w-80 text-white "
                        style={{ ...headingPosition }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold subpixel-antialiased">{slide.heading}</h1>
                    </div>

                    {/* Paragraph */}
                    <div
                        className="slider-para absolute w-72 text-white"
                        style={{ ...paraPosition }}
                    >
                        <p className="text-lg md:text-xl">{slide.paragraph}</p>
                    </div>

                    {/* Button */}
                    {slide.buttonText && (
                        <div
                            className="slider-button absolute"
                            style={{ ...buttonPosition }}
                        >
                            <button 
                            className="px-6 py-3 font-extrabold bg-green-500 text-white rounded-md hover:bg-blue-600" 
                            onClick={slide.onClick}
                            >
                            {slide.buttonText}
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {/* Navigation Buttons */}
            {slides.length > 1 && (
                <>
                    <button
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full"
                        onClick={() =>
                            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
                        }
                    >
                        &#10094; {/* Left arrow */}
                    </button>
                    <button
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full"
                        onClick={() =>
                            setCurrentSlide((prev) => (prev + 1) % slides.length)
                        }
                    >
                        &#10095; {/* Right arrow */}
                    </button>
                </>
            )}
        </div>
    );
};

export default Slider;
