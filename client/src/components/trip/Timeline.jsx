import React from 'react';
import { Trash2, Clock, MapPin, Utensils, Hotel, Train, Plane, ShoppingBag, Camera } from 'lucide-react';

const typeIcons = {
  spot: <MapPin size={18} />,
  food: <Utensils size={18} />,
  stay: <Hotel size={18} />,
  transport: <Train size={18} />,
  flight: <Plane size={18} />,
  shop: <ShoppingBag size={18} />,
  activity: <Camera size={18} />,
};

const Timeline = ({ items, activeDay, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
        <p className="text-slate-400 font-medium text-sm md:text-base">這天還沒有行程，快來新增一個吧！</p>
      </div>
    );
  }

  const sortedItems = [...items].sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-2 relative before:absolute before:left-[23px] md:before:left-[31px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200/60">
      {sortedItems.map((item) => (
        <div key={item.id} className="relative flex gap-3 md:gap-6 items-start group pb-4">
          
          {/* 左側時間軸圖示：手機版 10x10，電腦版 14x14 */}
          <div className="relative z-10 flex-shrink-0 w-12 md:w-16 flex flex-col items-center pt-1">
            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-sm border-2 border-white
              ${item.type === 'transport' ? 'bg-green-500 text-white' : 
                item.type === 'food' ? 'bg-orange-500 text-white' : 
                'bg-blue-500 text-white'}
            `}>
              {typeIcons[item.type] || <MapPin size={18} />}
            </div>
          </div>

          {/* 右側內容卡片：手機版 p-3，電腦版 p-6 */}
          <div className="flex-1 bg-white rounded-2xl p-3 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                {/* 時間與類型標籤 */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm md:text-lg font-black text-slate-700 tabular-nums">
                    {item.startTime}
                    {item.endTime && <span className="text-slate-400 font-medium ml-1"> - {item.endTime}</span>}
                  </span>
                  <span className="text-[10px] md:text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>
                
                {/* 標題 */}
                <h4 className="text-base md:text-xl font-bold text-slate-800 leading-tight">
                  {item.title}
                </h4>
              </div>

              {/* 刪除按鈕 */}
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 text-slate-300 hover:text-red-500 active:bg-red-50 rounded-xl transition-colors ml-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
