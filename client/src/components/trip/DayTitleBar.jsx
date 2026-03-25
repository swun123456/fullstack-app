import React from 'react';

const DayTitleBar = ({ day, customTitle, onUpdateTitle, count }) => (
  <div className="mb-6">
    <div className="flex items-baseline gap-2">
      <h2 className="text-2xl font-black text-slate-800">Day {day}</h2>
      {customTitle && <span className="text-lg font-bold text-slate-400">· {customTitle}</span>}
    </div>
    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
      共 {count} 個行程安排
    </p>
  </div>
);

export default DayTitleBar;
