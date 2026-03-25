import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import HeroHeader from '../components/layout/HeroHeader';
import DayTitleBar from '../components/trip/DayTitleBar';
import AddItemForm from '../components/trip/AddItemForm';
import Timeline from '../components/trip/Timeline';
import { useItinerary } from '../hooks/useItinerary';

const TripDetail = ({ trip, onBack }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false); // 控制表單顯示
  const { itinerary, addItem, deleteItem, totalItems, dayTitles, updateDayTitle } = useItinerary(trip.days, trip.id);

  // 封裝新增邏輯，新增完自動關閉表單
  const handleAddItem = (day, item) => {
    addItem(day, item);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 font-sans pb-32">
      <HeroHeader
        trip={trip}
        activeDay={activeDay}
        dayTitles={dayTitles}
        itinerary={itinerary}
        totalItems={totalItems}
        onDayChange={setActiveDay}
        onBack={onBack}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <DayTitleBar
          day={activeDay}
          customTitle={dayTitles[activeDay]}
          onUpdateTitle={updateDayTitle}
          count={itinerary[activeDay]?.length ?? 0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 電腦版顯示左側，手機版隱藏 (由彈窗取代) */}
          <div className="hidden lg:block lg:col-span-4">
            <AddItemForm activeDay={activeDay} onAdd={addItem} />
          </div>
          
          <div className="lg:col-span-8">
            <Timeline
              items={itinerary[activeDay] ?? []}
              activeDay={activeDay}
              onDelete={deleteItem}
            />
          </div>
        </div>
      </div>

      {/* 手機版彈出式表單 (Overlay) */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="absolute inset-0" 
            onClick={() => setShowAddForm(false)} 
          />
          <div className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-black text-slate-800">新增行程至 Day {activeDay}</h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <AddItemForm activeDay={activeDay} onAdd={handleAddItem} />
          </div>
        </div>
      )}

      {/* 手機版懸浮按鈕 (FAB) - 只在手機版顯示，或全版顯示 */}
      <button
        onClick={() => setShowAddForm(true)}
        className="lg:hidden fixed bottom-8 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl shadow-blue-400 flex items-center justify-center transition-transform active:scale-90 z-40"
      >
        <Plus size={32} strokeWidth={3} />
      </button>
    </div>
  );
};

export default TripDetail;