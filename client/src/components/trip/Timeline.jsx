import React from 'react';
import { Clock, Trash2, Navigation, Map } from 'lucide-react';
import { TYPE_CONFIG } from '../../constants/tripConfig';

const Timeline = ({ items, activeDay, onDelete }) => {
  // 如果這天還沒有行程的空狀態畫面
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-dashed border-slate-300">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Map className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-700 mb-1">Day {activeDay} 尚未安排行程</h3>
        <p className="text-slate-400 text-sm">在左側表單新增你的第一個行程吧！</p>
      </div>
    );
  }

  // 自動計算停留時間 (例如: 1h 30m)
  const getDuration = (start, end) => {
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    let diff = (eh * 60 + em) - (sh * 60 + sm);
    if (diff < 0) diff += 24 * 60; // 處理跨日情況
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.spot;
        const isLast = index === items.length - 1;

        return (
          <div key={item.id} className="relative flex gap-4 sm:gap-6 group">
            {/* 左側：時間軸線與 Icon */}
            <div className="flex flex-col items-center mt-2">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md z-10
                ${config.dot} transition-transform duration-300 group-hover:scale-110
              `}>
                {config.icon}
              </div>
              {!isLast && (
                <div className="w-0.5 h-full bg-gradient-to-b from-slate-200 to-slate-100 mt-2" />
              )}
            </div>

            {/* 右側：行程卡片 (票卷風格) */}
            <div className="flex-1 pb-6">
              <div className={`
                bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md 
                transition-all duration-300 overflow-hidden flex flex-col sm:flex-row
                group-hover:-translate-y-1
              `}>
                {/* 卡片左半部：時間區塊 */}
                <div className="sm:w-32 bg-slate-50/50 p-4 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-slate-200 border-dashed relative">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                    Start
                  </span>
                  <span className="text-2xl font-black text-slate-700">
                    {item.startTime}
                  </span>
                  <div className="flex items-center gap-1 mt-2 text-slate-500 text-xs font-bold bg-white px-2.5 py-1 rounded-full shadow-sm border border-slate-100">
                    <Clock size={12} />
                    {getDuration(item.startTime, item.endTime)}
                  </div>
                </div>

                {/* 卡片右半部：資訊區塊 */}
                <div className="flex-1 p-5 flex items-start justify-between relative overflow-hidden">
                  {/* 右上角裝飾性圓形背景 */}
                  <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-[0.08] ${config.dot}`} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 ${config.badge}`}>
                        {config.icon}
                        {config.label}
                      </span>
                      <span className="text-slate-400 text-sm flex items-center gap-1 font-medium">
                        <Navigation size={12} className="opacity-60" />
                        結束於 {item.endTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{item.name}</h3>
                  </div>

                  {/* 刪除按鈕 (Hover 時才顯示) */}
                  <button
                    onClick={() => onDelete(activeDay, item.id)}
                    className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all relative z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    title="刪除行程"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
