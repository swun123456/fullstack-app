import React, { useState } from 'react';
import { Plane, MapPin, ArrowRight, Calendar as CalendarIcon } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTrip = ({ onStart }) => {
  const [form, setForm] = useState({
    title: '',
    destination: '',
  });
  // 將日期狀態獨立出來給 DatePicker 使用
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.destination.trim() || !startDate || !endDate) {
      setError('請填寫完整資訊並選擇日期區間');
      return;
    }

    // 計算天數 (相減後的毫秒數轉成天數，並 +1 包含頭尾)
    const days = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    // 格式化日期 (YYYY-MM-DD) 傳給後續元件使用
    const formatDate = (date) => {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    onStart({
      ...form,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      days,
      id: Date.now().toString()
    });
  };

  const set = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setError('');
  };

  // 動態計算天數，用於畫面上即時顯示
  let calculatedDays = 0;
  if (startDate && endDate) {
    calculatedDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800">Travel Planner</h1>
          <p className="text-slate-400 mt-1 text-sm">建立你的專屬旅遊行程</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 rounded-t-3xl">
            <h2 className="text-white font-bold text-lg">開始新旅程 ✨</h2>
            <p className="text-blue-200 text-xs mt-0.5">填寫基本資訊，立即開始規劃</p>
          </div>

          <form className="p-6 space-y-5" onSubmit={handleSubmit}>
            {/* Trip Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                行程名稱
              </label>
              <input
                required
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                  placeholder:text-slate-300 transition-all"
                placeholder="例如：東京五日遊、巴黎蜜月行…"
                value={form.title}
                onChange={e => set('title', e.target.value)}
              />
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                目的地
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
                <input
                  required
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                    placeholder:text-slate-300 transition-all"
                  placeholder="例如：日本 · 東京都"
                  value={form.destination}
                  onChange={e => set('destination', e.target.value)}
                />
              </div>
            </div>

            {/* React DatePicker 區間選擇 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                旅遊日期區間
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 z-10" />
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                    setError('');
                  }}
                  minDate={new Date()} // 限制不能選過去的日期
                  monthsShown={1} // 一次顯示兩個月份 (如果手機版太擠可以改成 1)
                  placeholderText="請選擇出發與回程日期"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
                    placeholder:text-slate-300 transition-all cursor-pointer bg-white"
                  wrapperClassName="w-full"
                  dateFormat="yyyy/MM/dd"
                  popperPlacement="bottom-start"
                />
              </div>
            </div>

            {/* 錯誤提示 */}
            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

            {/* 動態顯示計算出的天數 */}
            {calculatedDays > 0 && !error && (
              <div className="text-sm text-blue-600 font-bold bg-blue-50 py-2.5 rounded-xl flex items-center justify-center border border-blue-100">
                這趟旅程總共 {calculatedDays} 天 🎉
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700
                text-white font-bold py-3 rounded-xl transition-all duration-200
                shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300
                hover:-translate-y-0.5 active:translate-y-0
                flex items-center justify-center gap-2 mt-2"
            >
              開始規劃行程
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
