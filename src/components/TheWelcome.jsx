
import React from 'react';
import WelcomeItem from './WelcomeItem';

const TheWelcome = ({ items }) => {
  return (
    <div className="welcome">
      <h1>Welcome!</h1>
      <ul>
        {items.map((item, index) => (
          <WelcomeItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default TheWelcome;