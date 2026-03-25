import { useState, useEffect } from 'react';

const buildEmptyItinerary = (days) =>
  Object.fromEntries(Array.from({ length: days }, (_, i) => [i + 1, []]));

export const useItinerary = (tripDays, tripId) => {
  const [itinerary, setItinerary] = useState(() => {
    try {
      const saved = localStorage.getItem(`trip_${tripId}_itinerary`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return buildEmptyItinerary(tripDays);
  });

  // 新增：儲存每一天的自訂標題
  const [dayTitles, setDayTitles] = useState(() => {
    try {
      const saved = localStorage.getItem(`trip_${tripId}_titles`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(`trip_${tripId}_itinerary`, JSON.stringify(itinerary));
      localStorage.setItem(`trip_${tripId}_titles`, JSON.stringify(dayTitles));
    } catch (e) {}
  }, [itinerary, dayTitles, tripId]);

  const addItem = (day, formData) => {
    const newItem = { ...formData, id: Date.now() };
    setItinerary(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), newItem].sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      ),
    }));
  };

  const deleteItem = (day, id) => {
    setItinerary(prev => ({
      ...prev,
      [day]: prev[day].filter(item => item.id !== id),
    }));
  };

  const updateDayTitle = (day, title) => {
    setDayTitles(prev => ({ ...prev, [day]: title }));
  };

  const totalItems = Object.values(itinerary).flat().length;

  return { itinerary, addItem, deleteItem, totalItems, dayTitles, updateDayTitle };
};
