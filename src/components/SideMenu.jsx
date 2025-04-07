import React from "react";
import Button from "./buttons/Button";

const SideMenu = () => {
  return (
    <menu className="shadowing z-[0] flex flex-col w-[280px] h-screen bg-white p-[20px_20px_24px_20px]">
      <header className="flex flex-col gap-[4px]">
        <span className="w-[210px] h-[24px] text-[14px]">
          <strong>Oak Tree Cemetery</strong>
        </span>
        <span className="w-[210px] h-[16px] text-[11px]">Process Manager</span>
        <div className="h-[1px] w-[250px] bg-[#e6e6e6] my-[20px]" />
      </header>

      <div className="flex flex-col gap-[20px] items-center flex-grow">
        <Button
          text="Organizations"
          variant="filled"
          icon="organizations.svg"
          width="210px"
        />
        <Button
          text="Contractors"
          variant="outlined"
          icon="contractors.svg"
          width="210px"
        />
        <Button
          text="Clients"
          variant="outlined"
          icon="clients.svg"
          width="210px"
        />
      </div>

      <span className="mt-auto w-[210px] h-[16px] text-[11px] text-[#b3b3b3] flex justify-center items-end">
        All Funeral Services © 2015–2025
      </span>
    </menu>
  );
};

export default SideMenu;
