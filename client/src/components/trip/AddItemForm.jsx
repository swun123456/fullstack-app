import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TYPE_CONFIG } from '../../constants/tripConfig';

const AddItemForm = ({ activeDay, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'spot',
    startTime: '12:00',
    endTime: '13:00',
  });
  const [error, setError] = useState('');

  const set = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
    setError(''); // 輸入時清除錯誤
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('請輸入地點名稱');
      return;
    }
    if (formData.startTime >= formData.endTime) {
      setError('結束時間必須晚於開始時間');
      return;
    }
    
    onAdd(activeDay, formData);
    
    // UX 優化：自動計算下一個行程的時間 (往後推算一小時)
    const nextStart = formData.endTime;
    const [h, m] = nextStart.split(':');
    const nextEndHour = String((Number(h) + 1) % 24).padStart(2, '0');
    const nextEnd = `${nextEndHour}:${m}`;
    
    setFormData(prev => ({ ...prev, name: '', startTime: nextStart, endTime: nextEnd }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
            <Plus size={16} />
          </div>
          新增行程至 Day {activeDay}
        </div>
        <p className="text-blue-200 text-xs mt-1">填寫下方資訊後點擊新增</p>
      </div>

      <form className="p-5 space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            地點名稱
          </label>
          <input
            className={`w-full px-3 py-2.5 border rounded-xl text-sm
              focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
              placeholder:text-slate-300 transition-all
              ${error && !formData.name ? 'border-red-300 bg-red-50' : 'border-slate-200'}
            `}
            placeholder="例如：東京鐵塔、築地市場…"
            value={formData.name}
            onChange={e => set('name', e.target.value)}
          />
        </div>

        {/* Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            類型
          </label>
          {/* 改為 grid-cols-3 sm:grid-cols-4 讓 7 個選項排版更好看 */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                type="button"
                onClick={() => set('type', key)}
                className={`
                  flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-bold
                  transition-all duration-150
                  ${formData.type === key
                    ? `${cfg.badge} border-current shadow-sm scale-105`
                    : 'border-slate-200 text-slate-400 hover:border-slate-300'
                  }
                `}
              >
                {cfg.icon}
                {cfg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '開始時間', key: 'startTime' },
            { label: '結束時間', key: 'endTime' },
          ].map(({ label, key }) => (
            <div key={key} className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {label}
              </label>
              <input
                type="time"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                  transition-all"
                value={formData[key]}
                onChange={e => set(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* 錯誤提示 */}
        {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700
            text-white font-bold py-3 rounded-xl transition-all duration-200
            shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300
            hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          新增至 Day {activeDay}
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
