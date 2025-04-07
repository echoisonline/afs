import React from "react";
import Button from "./buttons/Button";

const Photos = ({ photos, onClick, token, onAddPhoto }) => {
  const handleUpload = async (photo) => {
    if (!photo) return;

    const formData = new FormData();
    formData.append("file", photo);

    try {
      const res = await fetch(
        "https://test-task-api.allfuneral.com/companies/12/image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const uploadedPhoto = await res.json();

      if (onAddPhoto) onAddPhoto(uploadedPhoto);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div
      className="flex flex-col justify-between w-[640px] min-h-[200px] px-[32px] py-[24px] rounded-[16px] bg-white"
      style={{ boxShadow: "0px 3px 8px #0000001C" }}
    >
      <div className="flex flex-row justify-between w-full h-[28px] mb-[16px]">
        <span className="flex items-center text-[14px] text-[#333333] font-bold">
          Photos
        </span>
        <Button
          icon="photo.svg"
          text="Add"
          variant="flattened"
          width="73px"
          height="28px"
          fileInput={true}
          multiple={false}
          onFileChange={(e) => {
            const file = e.target.files[0];
            handleUpload(file);
          }}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {photos && photos.length > 0 ? (
          photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={photo.thumbpath}
                alt={`Photo ${index + 1}`}
                className="w-[144px] h-[108px] object-cover rounded-[8px]"
              />
              <Button
                icon="delete_photo.svg"
                variant="icononly"
                onClick={() => onClick(photo.name)}
                className="absolute top-[8px] left-[108px]"
              />
            </div>
          ))
        ) : (
          <span>No photos available</span>
        )}
      </div>
    </div>
  );
};

export default Photos;
