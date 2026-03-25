import React from 'react';
import { Plane, Calendar, MapPin, Plus, Trash2 } from 'lucide-react';

const TripList = ({ trips, onSelectTrip, onCreateNew, onDeleteTrip }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Plane className="w-6 h-6 text-white" />
              </div>
              我的旅程
            </h1>
          </div>
          <button
            onClick={onCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={18} />
            新增旅程
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <Plane className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-600 mb-2">目前還沒有任何旅程</h2>
            <p className="text-slate-400 mb-6">點擊上方按鈕開始規劃你的第一趟旅程吧！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.map(trip => (
              <div key={trip.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative group">
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteTrip(trip.id); }}
                  className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  title="刪除旅程"
                >
                  <Trash2 size={18} />
                </button>
                <div className="cursor-pointer" onClick={() => onSelectTrip(trip.id)}>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 pr-8">{trip.title}</h3>
                  <div className="space-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-500" />
                      {trip.destination}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-blue-500" />
                      {trip.startDate} — {trip.endDate} ({trip.days} 天)
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripList;
