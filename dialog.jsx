import React, { useRef } from "react";

export function Dialog({ defaultTitle, onClose, onUpdate }) {
  const inputRef = useRef(null);

  const handleUpdate = () => {
    const title = inputRef.current?.value || defaultTitle;
    onUpdate(title);
    onClose();
  };

  return (
    <div className="dialog" role="dialog">
      <div className="dialog-content">
        <div className="dialog-title">
          タイトル変更
          <button className="dialog-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="dialog-body">
          <input
            className="dialog-input"
            defaultValue={defaultTitle}
            ref={inputRef}
          />
        </div>
        <div className="dialog-actions">
          <button className="dialog-cancel" onClick={onClose}>
            キャンセル
          </button>
          <button className="dialog-update" onClick={handleUpdate}>
            更新
          </button>
        </div>
      </div>
    </div>
  );
}
