import React from 'react';
import Header from '/Users/sabbirahmad/Desktop/DhakaConnect/src/components/header';
import Slider from '../components/Slider'
import '../styles/global.css'
import hero_photo from '/Users/sabbirahmad/Desktop/DhakaConnect/src/assets/hero_photo.jpg'; // Adjust the path based on your folder structure

const HomePage = () => {
    const slides = [
        {
            image: hero_photo ,
            heading: 'Your Smart Guide to Dhaka City Commutes',
            paragraph: 'Find local bus routes, ride partners, and hassle-free solutions for your daily travel.',
            buttonText: 'Explore Now',
        },
    ];
    return (
        <div>
            {/* <Header /> */}
            <main>
                {/* Full Viewport Slider */}
                <Slider
                    slides={slides}
                    containerStyles="relative" // Full viewport size
                    style={{ height: '85vh'}}
                    headingPosition={{ top: '20%', left: '10%' }}
                    paraPosition={{top: '50%', left: '10%' }}
                    buttonPosition={{ top: '75%', left: '10%' }}
                />
                

            </main>
        </div>
    );
};

export default HomePage;




// import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import Header from '/Users/sabbirahmad/Desktop/DhakaConnect/src/components/header';
// import Slider from '../components/Slider';
// import LoginPopup from '../components/LoginPopup';
// import '../styles/global.css';
// import hero_photo from '/Users/sabbirahmad/Desktop/DhakaConnect/src/assets/hero_photo.jpg'; // Adjust the path based on your folder structure

// const HomePage = ({ setIsLoggedIn, isLoggedIn }) => {
//     const [isLoginOpen, setIsLoginOpen] = useState(false); // State to control the login popup

//     const slides = [
//         {
//             image: hero_photo,
//             heading: 'Your Smart Guide to Dhaka City Commutes',
//             paragraph: 'Find local bus routes, ride partners, and hassle-free solutions for your daily travel.',
//             buttonText: 'Explore Now',
//         },
//     ];

//     // Redirect to dashboard if logged in
//     if (isLoggedIn) {
//         return <Navigate to="/dashboard" />;
//     }

//     return (
//         <div>
//             <Header />
//             <main>
//                 {/* Full Viewport Slider */}
//                 <Slider
//                     slides={slides}
//                     containerStyles="relative" // Full viewport size
//                     style={{ height: '85vh' }}
//                     headingPosition={{ top: '20%', left: '10%' }}
//                     paraPosition={{ top: '50%', left: '10%' }}
//                     buttonPosition={{ top: '75%', left: '10%' }}
//                 />

//                 {/* Login Button */}
//                 {/* <div className="text-center mt-6">
//                     <button
//                         onClick={() => setIsLoginOpen(true)}
//                         className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                         Log In
//                     </button>
//                 </div> */}
//             </main>

//             {/* Login Popup */}
//             <LoginPopup
//             isOpen={isLoginOpen}
//             onClose={() => setIsLoginOpen(false)}
//             setIsLoggedIn={setIsLoggedIn} // Pass login state updater
//             />
//         </div>
//     );
// };

// export default HomePage;
