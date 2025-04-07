import React from "react";

function Selector({
  width = "312px",
  height = "40px",
  options = [],
  value,
  onChange,
}) {
  return (
    <div>
      <select
        className="relative !px-[12px] !py-[10px] border border-[#cccccc] hover:border-[#808080] transition-all focus:outline-[2px] focus:outline-[#35cdfd] focus:border-none rounded-[8px] text-[#333333] text-[14px] font-normal"
        style={{ width, height }}
        value={value}
        onChange={onChange}
      >
        <option value="">Select option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selector;
