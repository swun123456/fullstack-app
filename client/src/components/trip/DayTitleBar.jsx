import React, { useState, useEffect, useRef } from 'react';
import { Edit2 } from 'lucide-react';

const DayTitleBar = ({ day, customTitle, onUpdateTitle, count }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(customTitle || '');
  const inputRef = useRef(null);

  // 當切換天數時，重置輸入框內容
  useEffect(() => {
    setTempTitle(customTitle || '');
    setIsEditing(false);
  }, [customTitle, day]);

  // 自動對焦
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onUpdateTitle(day, tempTitle.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setTempTitle(customTitle || '');
      setIsEditing(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 group h-10">
        {isEditing ? (
          <input
            ref={inputRef}
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            placeholder="輸入這天的標題 (例如：抵達東京)"
            className="text-xl font-black text-slate-800 bg-transparent border-b-2 border-blue-500 focus:outline-none py-1 w-64"
          />
        ) : (
          <h2 
            onDoubleClick={() => setIsEditing(true)}
            className="text-xl font-black text-slate-800 cursor-pointer flex items-center gap-2 select-none"
            title="雙擊以編輯標題"
          >
            Day {day} {customTitle ? `· ${customTitle}` : ''}
            <Edit2 size={16} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500" onClick={() => setIsEditing(true)} />
          </h2>
        )}
      </div>
      <p className="text-sm text-slate-400 mt-1">
        {count > 0 ? `共 ${count} 個行程安排` : '尚未加入任何行程'}
      </p>
    </div>
  );
};

export default DayTitleBar;
