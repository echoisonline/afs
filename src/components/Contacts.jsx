import React, { useState } from "react";
import Button from "./buttons/Button";
import Input from "./Input";

function Contacts({ data, token }) {
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");

    const countryCode = cleaned.slice(0, 1);
    const areaCode = cleaned.slice(1, 4);
    const firstPart = cleaned.slice(4, 7);
    const secondPart = cleaned.slice(7, 11);

    return `+${countryCode} ${areaCode} ${firstPart} ${secondPart}`;
  };

  const handlePhoneChange = (e) => {
    const rawPhone = e.target.value;
    const formattedPhone = formatPhoneNumber(rawPhone);
    setPhoneNumber(formattedPhone);
  };

  if (!data) return <span>Загрузка данных...</span>;

  const [isEditing, setIsEditing] = useState(false);
  const [responsiblePerson, setResponsiblePerson] = useState(
    `${data.firstname} ${data.lastname}`
  );
  const [phoneNumber, setPhoneNumber] = useState(formatPhoneNumber(data.phone));
  const [email, setEmail] = useState(data.email);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsEditing(false);

    const updatedData = {
      lastname: responsiblePerson.split(" ")[1],
      firstname: responsiblePerson.split(" ")[0],
      phone: phoneNumber.replace(/\D/g, ""),
      email: email,
    };

    try {
      const response = await fetch(
        `https://test-task-api.allfuneral.com/contacts/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Loading Error");
      }

      const result = await response.json();
    } catch (error) {
      console.error("Saving Error:", error);
    }
  };

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
          Contacts
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
          Responsible person:
        </span>
        {isEditing ? (
          <Input
            width="100%"
            value={responsiblePerson}
            onChange={(e) => setResponsiblePerson(e.target.value)}
          />
        ) : (
          <span className="text-[13px] flex items-center">
            {responsiblePerson}
          </span>
        )}

        <span className="flex items-center text-[13px] text-[#808080]">
          Phone number:
        </span>
        {isEditing ? (
          <Input
            width="100%"
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
        ) : (
          <span className="text-[13px] flex items-center">{phoneNumber}</span>
        )}

        <span className="flex items-center text-[13px] text-[#808080]">
          E-mail:
        </span>
        {isEditing ? (
          <Input
            width="100%"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <span className="text-[13px] flex items-center">{email}</span>
        )}
      </div>
    </div>
  );
}

export default Contacts;
