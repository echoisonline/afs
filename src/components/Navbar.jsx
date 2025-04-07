import React from "react";
import Button from "./buttons/Button";
import IconButton from "./buttons/IconButton";

const LeftNavbar = () => {
  return (
    <div className="h-screen !w-[48px] !p-[20px_6px] bg-[#1f1f1f] text-white flex flex-col items-center justify-between">
      <div className="flex flex-col gap-[20px]">
        <img src="OTClogo.svg" className="w-[36px] h-[36px]" />
        <Button
          icon={"organizations.svg"}
          variant="icononly"
          className="!w-[36px] !h-[36px]"
        />
        <IconButton icon={"search.svg"} className="!w-[36px] !h-[36px]" />
      </div>
      <div className="flex flex-col gap-[20px] items-center">
        <div className="h-[1px] w-[19px] bg-[#626262]"></div>
        <IconButton icon={"settings.svg"} />
        <IconButton icon={"logout.svg"} />
      </div>
    </div>
  );
};

export default LeftNavbar;
