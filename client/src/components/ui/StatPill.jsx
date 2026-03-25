import React from 'react';

const StatPill = ({ label, value, icon }) => (
  <div className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl px-5 py-3 text-center min-w-[80px]">
    <div className="flex items-center justify-center gap-1 text-blue-200 text-xs mb-1">
      {icon} {label}
    </div>
    <div className="text-2xl font-black">{value}</div>
  </div>
);

export default StatPill;
