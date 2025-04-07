import React, { useRef, useState } from "react";

const Button = ({
  icon,
  text,
  onClick,
  className = "",
  variant = "filled",
  width = "148px",
  height = "40px",
  fileInput = false,
  onFileChange = () => {},
  accept = "image/*",
  multiple = true,
}) => {
  const [blink, setBlink] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = (e) => {
    setBlink(true);
    setTimeout(() => setBlink(false), 200);

    if (fileInput && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = `flex items-center justify-start font-semibold font rounded-[8px] transition buttonShadowing`;
  const sizeStyle = { width, height };

  const paddingClasses = (() => {
    if (!icon || variant === "icononly") return "";

    switch (variant) {
      case "filled":
      case "outlined":
        return "py-[10px] pr-[40px] pl-[12px] gap-[20px]";
      case "flattened":
        return "px-[8px] py-[4px] gap-[8px]";
      default:
        return "";
    }
  })();

  const iconClasses = (() => {
    if (!icon || variant === "icononly") return "";

    switch (variant) {
      case "filled":
      case "outlined":
        return "w-[16px] h-[16px]";
      case "flattened":
        return "w-[12px] h-[12px]";
      default:
        return "";
    }
  })();

  const variantClasses = {
    filled: blink
      ? "bg-[#757575] text-white !text-[13px]"
      : "bg-[#3B3B3B] hover:bg-[#626262] text-white !text-[13px]",
    outlined: blink
      ? "border border-[#6243e6] text-[#6243e6] bg-transparent !text-[13px]"
      : "border border-[#cccccc] text-[#3b3b3b] hover:border-[#999999] hover:text-[#6D4AFF] bg-transparent !text-[13px]",
    flattened: blink
      ? "border border-[#6243e6] text-[#6243e6] bg-transparent !text-[11px]"
      : "border border-[#cccccc] text-[#3b3b3b] hover:border-[#999999] hover:text-[#6D4AFF] bg-transparent !text-[11px]",
    icononly: blink
      ? "bg-[#757575] !flex !justify-center !w-[28px] !h-[28px] !p-[6px] rounded-[8px]"
      : "bg-[#3B3B3B] hover:bg-[#626262] !w-[28px] !h-[28px] !p-[6px] rounded-[8px] !justify-center",
  };

  const shadowStyle = {
    boxShadow: "0px 3px 8px #0000001C",
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses} ${className}`}
        style={{ ...sizeStyle, ...shadowStyle }}
      >
        {icon && <img src={icon} alt="" className={`${iconClasses}`} />}
        {text && (
          <span className="flex-1 text-center leading-[20px] flex items-center justify-center">
            {text}
          </span>
        )}
      </button>
      {fileInput && (
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onFileChange}
          accept={accept}
          multiple={multiple}
        />
      )}
    </>
  );
};

export default Button;
