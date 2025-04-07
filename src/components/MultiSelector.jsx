import React, { useState, useEffect, useRef } from "react";

function MultiSelector({
  width = "312px",
  height = "40px",
  options = [],
  value = [],
  onChange,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(value);
  const dropdownRef = useRef(null);
  const selectorRef = useRef(null);

  const handleCheckboxChange = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !selectorRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderCheckbox = (isChecked) => {
    if (isChecked) {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="4" fill="white" />
          <rect
            x="0.5"
            y="0.5"
            width="19"
            height="19"
            rx="3.5"
            stroke="black"
            strokeOpacity="0.3"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.9242 6.07608C16.1585 6.31039 16.1585 6.69029 15.9242 6.9246L8.92416 13.9243C8.68985 14.1586 8.30997 14.1586 8.07566 13.9243L4.57566 10.4246C4.34133 10.1903 4.34132 9.81041 4.57562 9.57608C4.80992 9.34176 5.18982 9.34174 5.42415 9.57605L8.49989 12.6515L15.0756 6.07606C15.31 5.84175 15.6899 5.84176 15.9242 6.07608Z"
            fill="black"
            fillOpacity="0.8"
          />
        </svg>
      );
    }

    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="20" height="20" rx="4" fill="white" />
        <rect
          x="0.5"
          y="0.5"
          width="19"
          height="19"
          rx="3.5"
          stroke="black"
          strokeOpacity="0.3"
        />
      </svg>
    );
  };

  return (
    <div>
      <div
        ref={selectorRef}
        onClick={() => setIsFocused(!isFocused)}
        className="relative cursor-pointer"
        style={{ width, height }}
      >
        <input
          type="text"
          readOnly
          value={selectedOptions.join(", ") || "Select options"}
          className="w-full px-[12px] py-[10px] border border-[#cccccc] hover:border-[#808080] transition-all focus:outline-none focus:ring-2 focus:ring-[#35cdfd] rounded-[8px] text-[#333333] text-[14px] font-normal"
        />
      </div>

      {isFocused && (
        <div
          ref={dropdownRef}
          className="absolute mt-1 w-[420px] bg-white border border-[#cccccc] rounded-[8px] max-h-[150px] overflow-auto z-10"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center p-[10px] h-[48px] cursor-pointer w-full hover:bg-[#f2f2f2]"
            >
              <div
                onClick={() => handleCheckboxChange(option)}
                className="flex items-center justify-center"
              >
                {renderCheckbox(selectedOptions.includes(option))}
              </div>
              <label
                htmlFor={option}
                className="ml-[8px] text-[13px] font-medium text-[#3b3b3b]"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelector;
