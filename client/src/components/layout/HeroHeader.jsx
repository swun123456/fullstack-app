import React from 'react';
import { Plane, Calendar, MapPin, Map, ArrowLeft } from 'lucide-react';
import StatPill from '../ui/StatPill'; // 確保路徑正確

const HeroHeader = ({ trip, activeDay, dayTitles, itinerary, totalItems, onDayChange, onBack }) => (
  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white relative shadow-lg">
    {/* 返回按鈕：手機版隱藏文字只留 Icon，電腦版顯示完整 */}
    <button 
      onClick={onBack}
      className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs md:text-sm font-bold transition-colors"
    >
      <ArrowLeft size={16} />
      <span className="hidden md:inline">返回列表</span>
    </button>
    
    <div className="max-w-6xl mx-auto px-5 py-8 md:px-6 md:py-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur rounded-lg md:rounded-xl flex items-center justify-center">
              <Plane className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-blue-200 text-[10px] md:text-sm font-semibold tracking-widest uppercase">
              Travel Planner
            </span>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-1">
            {trip.title}
            <span className="ml-2 text-xl md:text-2xl">🗾</span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-3 text-blue-100 text-xs md:text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {trip.startDate} — {trip.endDate}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <MapPin size={14} />
              {trip.destination}
            </span>
          </div>

          {/* 手機版專用：迷你統計標籤 (電腦版隱藏) */}
          <div className="flex md:hidden gap-2 mt-4">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-bold">
              <Calendar size={12} className="text-blue-200" /> {trip.days} 天
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-bold">
              <Map size={12} className="text-blue-200" /> {totalItems} 行程
            </div>
          </div>
        </div>

        {/* 電腦版專用：保留原本的大方塊 (手機版隱藏) */}
        <div className="hidden md:flex gap-3 mt-4 md:mt-0">
          <StatPill label="天數" value={trip.days} icon={<Calendar size={14} />} />
          <StatPill label="行程" value={totalItems} icon={<Map size={14} />} />
        </div>
      </div>
    </div>

    {/* Day Tabs：手機版縮小高度 */}
    <div className="max-w-6xl mx-auto px-5 md:px-6">
      <div className="flex gap-1 overflow-x-auto pb-px scrollbar-hide">
        {Array.from({ length: trip.days }, (_, i) => i + 1).map(day => (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className={`
              relative flex-shrink-0 flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-t-xl text-xs md:text-sm font-bold
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
                text-[10px] rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-black ml-1
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
