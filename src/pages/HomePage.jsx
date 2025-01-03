import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Slider from '../components/Slider';
import '../styles/global.css';
import hero_photo from '/Users/sabbirahmad/Desktop/DhakaConnect/src/assets/hero_photo.jpg'; // Adjust the path based on your folder structure

const HomePage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const slides = [
        {
            image: hero_photo,
            heading: 'Your Smart Guide to Dhaka City Commutes',
            paragraph: 'Find local bus routes, ride partners, and hassle-free solutions for your daily travel.',
            buttonText: 'Be a Driver? Click Here', // Updated button text
            onClick: () => navigate('/register-driver'), // Add navigation for the button
        },
    ];

    return (
        <div>
            <main>
                {/* Full Viewport Slider */}
                <Slider
                    slides={slides}
                    containerStyles="relative"
                    style={{ height: '85vh' }}
                    headingPosition={{ top: '20%', left: '10%' }}
                    paraPosition={{ top: '50%', left: '10%' }}
                    buttonPosition={{ top: '75%', left: '10%' }}
                />
            </main>
        </div>
    );
};

export default HomePage;
