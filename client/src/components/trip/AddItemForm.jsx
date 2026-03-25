import React, { useState } from 'react';
import { MapPin, Utensils, Hotel, Train, Plane, ShoppingBag, Camera } from 'lucide-react';

const types = [
  { id: 'spot', label: '景點', icon: <MapPin size={18} />, color: 'bg-blue-50 text-blue-600 border-blue-100', activeColor: 'bg-blue-600 text-white border-blue-600' },
  { id: 'food', label: '餐廳', icon: <Utensils size={18} />, color: 'bg-orange-50 text-orange-600 border-orange-100', activeColor: 'bg-orange-600 text-white border-orange-600' },
  { id: 'stay', label: '住宿', icon: <Hotel size={18} />, color: 'bg-purple-50 text-purple-600 border-purple-100', activeColor: 'bg-purple-600 text-white border-purple-600' },
  { id: 'transport', label: '交通', icon: <Train size={18} />, color: 'bg-green-50 text-green-600 border-green-100', activeColor: 'bg-green-600 text-white border-green-600' },
  { id: 'flight', label: '航班', icon: <Plane size={18} />, color: 'bg-sky-50 text-sky-600 border-sky-100', activeColor: 'bg-sky-600 text-white border-sky-600' },
  { id: 'shop', label: '購物', icon: <ShoppingBag size={18} />, color: 'bg-pink-50 text-pink-600 border-pink-100', activeColor: 'bg-pink-600 text-white border-pink-600' },
  { id: 'activity', label: '活動', icon: <Camera size={18} />, color: 'bg-indigo-50 text-indigo-600 border-indigo-100', activeColor: 'bg-indigo-600 text-white border-indigo-600' },
];

const AddItemForm = ({ activeDay, onAdd }) => {
  // 1. 核心狀態：管理表單輸入
  const [formData, setFormData] = useState({
    title: '',
    type: 'spot',
    startTime: '09:00',
    endTime: '10:00',
  });

  // 2. 處理輸入變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. 處理類型切換 (修復點：原本按鈕沒接這個)
  const handleTypeSelect = (typeId) => {
    setFormData(prev => ({ ...prev, type: typeId }));
  };

  // 4. 提交表單
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('請輸入地點名稱');
      return;
    }
    
    // 呼叫父組件傳進來的 onAdd 函式
    onAdd(activeDay, {
      ...formData,
      id: Date.now().toString(), // 產生唯一 ID
    });

    // 清空輸入框，保留時間方便連續輸入
    setFormData(prev => ({ ...prev, title: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 shadow-xl shadow-slate-200/50 border border-slate-100 mb-6">
      <div className="space-y-5">
        {/* 地點輸入 */}
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="例如：東京鐵塔、築地市場..."
            className="w-full px-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-base"
            required
          />
        </div>

        {/* 類型選擇：修復 onClick 事件 */}
        <div>
          <label className="text-sm font-bold text-slate-400 mb-3 block ml-1">選擇類型</label>
          <div className="grid grid-cols-4 gap-2">
            {types.map((t) => (
              <button
                key={t.id}
                type="button" // 必須設為 button 避免觸發 form submit
                onClick={() => handleTypeSelect(t.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all duration-200 ${
                  formData.type === t.id 
                    ? t.activeColor + " scale-105 shadow-md" 
                    : t.color + " border-transparent opacity-60"
                }`}
              >
                <div className="mb-1">{t.icon}</div>
                <span className="text-[10px] font-bold">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 時間選擇 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 ml-1">開始時間</label>
            <input 
              type="time" 
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 rounded-xl border-none text-center font-mono text-lg focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 ml-1">結束時間</label>
            <input 
              type="time" 
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 rounded-xl border-none text-center font-mono text-lg focus:ring-2 focus:ring-blue-500" 
            />
          </div>
        </div>

        {/* 送出按鈕 */}
        <button 
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 transition-transform active:scale-[0.98]"
        >
          ＋ 新增至 Day {activeDay}
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;