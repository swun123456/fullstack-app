import React, { useState } from 'react';
import HeroHeader from '../components/layout/HeroHeader';
import DayTitleBar from '../components/trip/DayTitleBar';
import AddItemForm from '../components/trip/AddItemForm';
import Timeline from '../components/trip/Timeline';
import { useItinerary } from '../hooks/useItinerary';

const TripDetail = ({ trip, onClearTrip }) => {
  const [activeDay, setActiveDay] = useState(1);
  const { itinerary, addItem, deleteItem, totalItems, dayTitles, updateDayTitle } = useItinerary(trip.days, trip.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 font-sans pb-20">
      <HeroHeader
        trip={trip}
        activeDay={activeDay}
        dayTitles={dayTitles}
        itinerary={itinerary}
        totalItems={totalItems}
        onDayChange={setActiveDay}
        onClearTrip={onClearTrip}
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <DayTitleBar
          day={activeDay}
          customTitle={dayTitles[activeDay]}
          onUpdateTitle={updateDayTitle}
          count={itinerary[activeDay]?.length ?? 0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
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
    </div>
  );
};

export default TripDetail;
