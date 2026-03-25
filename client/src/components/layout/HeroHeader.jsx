import React from 'react';
import { Plane, Calendar, MapPin, Map, LogOut } from 'lucide-react';
import StatPill from '../ui/StatPill';

const HeroHeader = ({ trip, activeDay, dayTitles, itinerary, totalItems, onDayChange, onClearTrip }) => (
  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white relative">
    {/* 結束旅程按鈕 */}
    <button 
      onClick={onClearTrip}
      className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors"
    >
      <LogOut size={16} />
      結束旅程
    </button>
    
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-blue-200 text-sm font-semibold tracking-widest uppercase">
              Travel Planner
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-1">
            {trip.title}
            <span className="ml-3 text-2xl">🗾</span>
          </h1>
          <div className="flex items-center gap-4 mt-3 text-blue-100 text-sm">
            {trip.startDate && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {trip.startDate} — {trip.endDate}
              </span>
            )}
            <span className="w-1 h-1 bg-blue-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              {trip.destination}
            </span>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap mt-4 md:mt-0">
          <StatPill label="天數" value={trip.days} icon={<Calendar size={14} />} />
          <StatPill label="行程" value={totalItems} icon={<Map size={14} />} />
        </div>
      </div>
    </div>

    {/* Day Tabs */}
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex gap-1 overflow-x-auto pb-px scrollbar-hide">
        {Array.from({ length: trip.days }, (_, i) => i + 1).map(day => (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className={`
              relative flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-bold
              transition-all duration-200
              ${activeDay === day
                ? 'bg-white text-slate-800 shadow-lg'
                : 'text-blue-200 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span className="whitespace-nowrap">
              Day {day} {dayTitles[day] ? `· ${dayTitles[day]}` : ''}
            </span>
            {itinerary[day]?.length > 0 && (
              <span className={`
                text-xs rounded-full w-5 h-5 flex items-center justify-center font-black ml-2
                ${activeDay === day ? 'bg-blue-600 text-white' : 'bg-white/20 text-white'}
              `}>
                {itinerary[day].length}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default HeroHeader;
