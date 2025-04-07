import React from "react";

function Input({ width = "312px", height = "40px", value, onChange }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={
          "!px-[12px] !py-[10px] border border-[#cccccc] hover:border-[#808080] transition-all focus:outline-[2px] focus:outline-[#35cdfd] focus:border-none rounded-[8px] text-[#333333] text-[14px] font-normal"
        }
        style={{ width, height }}
      />
    </div>
  );
}

export default Input;
