import React, { useState, useEffect } from 'react';
import CreateTrip from './pages/CreateTrip';
import TripDetail from './pages/TripDetail';

const App = () => {
  // 從 localStorage 讀取上次未完成的旅程
  const [trip, setTrip] = useState(() => {
    const saved = localStorage.getItem('current_trip');
    return saved ? JSON.parse(saved) : null;
  });

  // 當 trip 改變時，存入 localStorage
  useEffect(() => {
    if (trip) {
      localStorage.setItem('current_trip', JSON.stringify(trip));
    } else {
      localStorage.removeItem('current_trip');
    }
  }, [trip]);

  const handleClearTrip = () => {
    if (window.confirm('確定要結束並清除目前的旅程嗎？')) {
      setTrip(null);
    }
  };

  return trip
    ? <TripDetail trip={trip} onClearTrip={handleClearTrip} />
    : <CreateTrip onStart={setTrip} />;
};

export default App;
