import React, { useState } from "react";

const IconButton = ({ icon, onClick, className = "" }) => {
  const [blink, setBlink] = useState(false);

  const handleClick = (e) => {
    setBlink(true);
    setTimeout(() => {
      setBlink(false);
    }, 200);

    if (onClick) onClick(e);
  };

  const baseClasses =
    "flex items-center justify-center w-[32px] h-[32px] rounded-full transition p-[6px]";

  const blinkClass = blink ? "bg-[#ebe6ff]" : "bg-none hover:bg-[#f5f5f5]";

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${blinkClass} ${className}`}
    >
      {icon && <img src={icon} alt="" />}
    </button>
  );
};

export default IconButton;
