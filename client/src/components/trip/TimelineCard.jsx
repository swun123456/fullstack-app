import React from 'react';
import { Trash2, Clock } from 'lucide-react';
import { TYPE_CONFIG } from '../../constants/tripConfig';

const TimelineCard = ({ item, onDelete }) => {
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.spot;

  return (
    <div className={`
      flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm
      hover:shadow-md transition-all duration-200 overflow-hidden
      ${cfg.cardBorder} group-hover:border-opacity-100
    `}>
      <div className={`h-1 ${cfg.cardAccent} w-full`} />
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex-shrink-0 text-center bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
            <div className="text-xs text-slate-400 font-semibold">開始</div>
            <div className="text-base font-black text-slate-700 leading-tight">
              {item.startTime}
            </div>
          </div>
          <div className="min-w-0">
            <div className={`
              inline-flex items-center gap-1 text-[10px] font-black uppercase
              tracking-widest px-2 py-0.5 rounded-full mb-1.5 ${cfg.badge}
            `}>
              {cfg.icon}
              {cfg.label}
            </div>
            <h3 className="text-base font-black text-slate-800 truncate">{item.name}</h3>
            <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mt-0.5">
              <Clock size={11} />
              {item.startTime} — {item.endTime}
            </div>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center
            text-slate-300 hover:text-red-500 hover:bg-red-50
            rounded-xl transition-all duration-150 opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default TimelineCard;
