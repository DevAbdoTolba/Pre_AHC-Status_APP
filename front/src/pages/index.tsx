// pages/index.tsx
import React from 'react';
import UserFormDesign from '../components/UserFormDesign.tsx';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <UserFormDesign/>
    </div>
  );
};

export default Home;