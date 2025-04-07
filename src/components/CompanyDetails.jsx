import React, { useState, useEffect } from "react";
import Button from "./buttons/Button";
import Input from "./Input";
import Selector from "./Selector";
import MultiSelector from "./MultiSelector";

function CompanyDetails({ data, token }) {
  if (!data) return <span className="">Loading...</span>;
  const entities = [
    "Sole Proprietorship",
    "Partnership",
    "Limited Liability Company",
  ];

  const typeMap = {
    funeral_home: "Funeral Home",
    logistics_services: "Logistics services",
    burial_care_contractor: "Burial care Contractor",
  };

  const types = Object.values(typeMap);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [agreementNumber, setAgreementNumber] = useState(
    `${data.contract.no ? data.contract.no : "Empty"}`
  );
  const [date, setDate] = useState(
    `${
      data.contract.issue_date ? formatDate(data.contract.issue_date) : "Empty"
    }`
  );
  const [businessEntity, setBusinessEntity] = useState(
    `${data.businessEntity ? data.businessEntity : "Empty"}`
  );

  const [companyType, setCompanyType] = useState(
    `${data.type ? data.type : "Empty"}`
  );

  useEffect(() => {
    if (data?.type && Array.isArray(data.type)) {
      const displayTypes = data.type.map((item) => typeMap[item] || item);
      setSelectedOptions(displayTypes);
    }
  }, [data]);

  const handleSelectionChange = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    const apiTypes = selectedOptions
      .map((display) =>
        Object.keys(typeMap).find((key) => typeMap[key] === display)
      )
      .filter(Boolean);

    const formatDateToISO = (dateStr) => {
      const [day, month, year] = dateStr.split(".");
      const isoDate = new Date(`${year}-${month}-${day}`);
      return isoDate.toISOString();
    };

    const updatedCompany = {
      name: data.name,
      shortName: data.shortName,
      businessEntity: businessEntity,
      contract: {
        no: agreementNumber,
        issue_date: formatDateToISO(date),
      },
      type: apiTypes,
    };

    try {
      const response = await fetch(
        `https://test-task-api.allfuneral.com/companies/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCompany),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Loading Error:", errorData);
        alert("Ошибка при сохранении");
      } else {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Сетевая ошибка:", error);
      alert("Ошибка сети при сохранении");
    }
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <div
      className="flex flex-col justify-between w-[640px] h-[192px] mb-[16px] p-[24px] rounded-[16px] bg-white"
      style={{
        boxShadow: "0px 3px 8px #0000001C",
        height: isEditing ? "236px" : "192px",
      }}
    >
      <div className="flex flex-row justify-between w-full h-[28px] mb-[16px]">
        <span className="flex items-center text-[14px] text-[#333333] font-bold">
          Company Details
        </span>
        {!isEditing ? (
          <Button
            height="28px"
            width="72px"
            icon="edit.svg"
            text="Edit"
            variant="outlined"
            className="h-[50px] !p-[4px_12px_4px_8px] !gap-[12px]"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <div className="flex gap-[12px]">
            <Button
              height="28px"
              width="133px"
              icon="ok.svg"
              text="Save changes"
              variant="flattened"
              onClick={handleSave}
            />
            <Button
              height="28px"
              width="91px"
              icon="cross.svg"
              text="Cancel"
              variant="flattened"
              onClick={handleCancel}
            />
          </div>
        )}
      </div>

      <div
        className="grid grid-cols-[154px_1fr] gap-x-[20px]"
        style={{
          gridTemplateRows: isEditing ? "40px 40px 40px" : "32px 32px 32px",
          rowGap: isEditing ? "12px" : "2px",
        }}
      >
        <span className="flex items-center text-[13px] text-[#808080]">
          Agreement number:
        </span>
        <div className="flex flex-row">
          {isEditing ? (
            <>
              <Input
                width="180.5px"
                value={agreementNumber}
                onChange={(e) => {
                  setAgreementNumber(e.target.value);
                }}
              />
              <span className="flex items-center mx-[12px] text-[13px] text-[#808080]">
                Date:
              </span>
              <Input
                width="180.5px"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </>
          ) : (
            <span className="text-[13px] flex items-center">
              {agreementNumber}
              <span className="ml-[12px] text-[#808080]">/</span>
              <span className="mx-[12px]">{date}</span>
            </span>
          )}
        </div>

        <span className="flex items-center text-[13px] text-[#808080]">
          Business entity:
        </span>
        {isEditing ? (
          <Selector
            width="100%"
            value={businessEntity}
            options={entities}
            onChange={(e) => {
              setBusinessEntity(e.target.value);
            }}
          />
        ) : (
          <span className="text-[13px] flex items-center">
            {businessEntity}
          </span>
        )}

        <span className="flex items-center text-[13px] text-[#808080]">
          Company type:
        </span>
        {isEditing ? (
          <MultiSelector
            width="100%"
            height="50px"
            options={types}
            value={selectedOptions}
            onChange={handleSelectionChange}
            isEditing={isEditing}
          />
        ) : (
          <span className="text-[13px] flex items-center">
            {selectedOptions.length > 0
              ? selectedOptions.join(", ")
              : companyType}
          </span>
        )}
      </div>
    </div>
  );
}

export default CompanyDetails;
