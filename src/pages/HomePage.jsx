import React from 'react';
import Header from '/Users/sabbirahmad/Desktop/DhakaConnect/src/components/header';
import Slider from '../components/Slider'
import '../styles/global.css'
import hero_photo from '/Users/sabbirahmad/Desktop/DhakaConnect/src/assets/hero_photo.jpg'; // Adjust the path based on your folder structure


const HomePage = () => {
    const slides = [
        {
            image: hero_photo ,
            heading: 'Welcome to Our Service',
            paragraph: 'Experience the best ride-sharing app.',
            buttonText: 'Get Started',
        },
    ];
    return (
        <div>
            <Header />
            <main>
                {/* Full Viewport Slider */}
                <Slider
                    slides={slides}
                    containerStyles="relative" // Full viewport size
                    style={{ height: '85vh' }}
                    headingPosition={{ top: '30%', left: '10%' }}
                    paraPosition={{ top: '40%', left: '10%' }}
                    buttonPosition={{ top: '50%', left: '10%' }}
                />
                

            </main>
        </div>
    );
};

export default HomePage;
