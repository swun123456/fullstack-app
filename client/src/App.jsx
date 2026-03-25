import React, { useState, useEffect } from 'react';
import CreateTrip from './pages/CreateTrip';
import TripDetail from './pages/TripDetail';
import TripList from './pages/TripList';

const App = () => {
  // 從 localStorage 讀取所有旅程清單
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('all_trips');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentTripId, setCurrentTripId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // 當 trips 改變時，存入 localStorage
  useEffect(() => {
    localStorage.setItem('all_trips', JSON.stringify(trips));
  }, [trips]);

  const handleStartTrip = (newTrip) => {
    setTrips(prev => [...prev, newTrip]);
    setCurrentTripId(newTrip.id);
    setIsCreating(false);
  };

  const handleBackToList = () => {
    setCurrentTripId(null);
  };

  const handleDeleteTrip = (id) => {
    if (window.confirm('確定要刪除這個旅程嗎？相關的行程資料也會一併刪除。')) {
      setTrips(prev => prev.filter(t => t.id !== id));
      // 同時清除該旅程的行程細節資料
      localStorage.removeItem(`trip_${id}_itinerary`);
      localStorage.removeItem(`trip_${id}_titles`);
    }
  };

  // 渲染旅程詳情頁
  if (currentTripId) {
    const trip = trips.find(t => t.id === currentTripId);
    return <TripDetail trip={trip} onBack={handleBackToList} />;
  }

  // 渲染新增旅程頁
  if (isCreating) {
    return (
      <div className="relative">
        <button 
          onClick={() => setIsCreating(false)}
          className="absolute top-6 left-6 z-10 px-4 py-2 bg-white/50 hover:bg-white/80 rounded-xl text-sm font-bold transition-colors shadow-sm"
        >
          ← 返回列表
        </button>
        <CreateTrip onStart={handleStartTrip} />
      </div>
    );
  }

  // 渲染旅程列表頁 (預設首頁)
  return (
    <TripList 
      trips={trips} 
      onSelectTrip={setCurrentTripId} 
      onCreateNew={() => setIsCreating(true)} 
      onDeleteTrip={handleDeleteTrip} 
    />
  );
};

export default App;
