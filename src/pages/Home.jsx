import React, { useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import IconButton from "../components/buttons/IconButton";
import Input from "../components/Input";
import CompanyDetails from "../components/CompanyDetails";
import LeftNavbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import Contacts from "../components/Contacts";
import Photos from "../components/Photos";

function Home() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [companyData, setCompanyData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [photosData, setPhotosData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");

  useEffect(() => {
    const username = "Echo";

    const fetchAuthToken = async () => {
      try {
        const response = await fetch(
          `https://test-task-api.allfuneral.com/auth?user=${username}`,
          { method: "GET" }
        );

        if (response.ok) {
          const authToken = response.headers.get("Authorization");
          if (authToken) {
            const tokenValue = authToken.replace("Bearer ", "");
            setToken(tokenValue);
            setError("");
            fetchCompanyData(tokenValue);
            fetchContactData(tokenValue);
          } else {
            setError("Токен не получен");
          }
        }
      } catch (err) {
        setError("Ошибка при авторизации");
      }
    };

    const fetchCompanyData = async (authToken) => {
      try {
        const response = await fetch(
          `https://test-task-api.allfuneral.com/companies/12`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCompanyData(data);
          setPhotosData(data.photos || []);
        } else {
          setError(`${response.status}`);
        }
      } catch (err) {
        setError("Fetching Error");
      }
    };

    const fetchContactData = async (authToken) => {
      try {
        const response = await fetch(
          `https://test-task-api.allfuneral.com/contacts/16`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setContactData(data);
        } else {
          setError(`${response.status}`);
        }
      } catch (err) {
        setError("Fetching Error");
      }
    };

    fetchAuthToken();
  }, []);

  const handleDeletePhoto = (photoName) => {
    fetch(
      `https://test-task-api.allfuneral.com/companies/12/image/${photoName}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setPhotosData((prevPhotos) => {
            const updatedPhotos = prevPhotos.filter(
              (photo) => photo.name !== photoName
            );
            return updatedPhotos;
          });
        } else {
          response.json().then((data) => {
            console.error("Delete failed: ", data);
          });
          setError("Deleting Error");
        }
      })
      .catch((error) => {
        console.error("Error during DELETE request:", error);
        setError("Sending Data Error");
      });
  };

  if (!companyData || !contactData || !photosData) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setNewCompanyName(companyData.name);
    setIsModalOpen(true);
  };
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteCompany = () => {
    fetch("https://test-task-api.allfuneral.com/companies/12", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        setError("Deleting Error");
      }
    });
  };

  const handleSaveChanges = () => {
    fetch("https://test-task-api.allfuneral.com/companies/12", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newCompanyName }),
    })
      .then((response) => {
        if (response.ok) {
          setCompanyData((prevData) => ({ ...prevData, name: newCompanyName }));
          setIsModalOpen(false);
        } else {
          setError("Data refreshing Error");
        }
      })
      .catch((error) => {
        setError("Sending data Error");
      });
  };

  const handleAddPhoto = (newPhoto) => {
    setPhotosData((prevPhotos) => [...prevPhotos, newPhoto]);
  };

  return (
    <>
      <div className="grid grid-cols-[48px_280px_1fr]">
        <div className="fixed">
          <LeftNavbar />
        </div>
        <div className="fixed left-[48px]">
          <SideMenu />
        </div>
        <div className="fixed left-[168px] -z-10 py-[40px_28px] flex flex-col items-center w-full h-screen bg-[#f7f7f7] overflow-y-auto">
          <div className="">
            <div className="flex flex-row justify-between items-center w-[640px] mb-[32px] bg-[#f7f7f7]">
              <h1 className="text-28 text-[#313131] font-medium w-fit ">
                {companyData ? companyData.name : "Company Name"}
              </h1>
              <div className="flex flex-row items-center gap-[12px]">
                <IconButton icon="edit.svg" onClick={handleEditClick} />
                <IconButton icon="delete.svg" onClick={handleDeleteClick} />
              </div>
            </div>
            <CompanyDetails data={companyData} token={token} />
            <Contacts data={contactData} token={token} />
            <Photos
              photos={photosData}
              onClick={handleDeletePhoto}
              onAddPhoto={handleAddPhoto}
              token={token}
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="bgTransparent fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-[24px] rounded-[8px] w-[360px] h-[200px] flex flex-col gap-y-[24px]">
            <span className="flex justify-center font-bold text-14 text-[#333333]">
              Specify the Organization's name
            </span>
            <Input
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
            />
            <div className="flex gap-[16px] justify-center">
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outlined"
                text="Cancel"
                width="100%"
                height="40px"
              />
              <Button
                onClick={handleSaveChanges}
                variant="filled"
                text="Save changes"
                width="100%"
                height="40px"
              />
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="bgTransparent fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-[24px] rounded-[8px] w-[360px] h-[188px] flex flex-col gap-y-[24px]">
            <span className="flex justify-center font-bold text-14 text-[#333333]">
              Remove the Organization?
            </span>
            <span className="flex text-center text-[13px]">
              Are you sure you want to remove this Organization?
            </span>
            <div className="flex gap-[16px] justify-center">
              <Button
                onClick={() => setDeleteModalOpen(false)}
                variant="outlined"
                text="No"
                width="100%"
                height="40px"
              />
              <Button
                onClick={handleDeleteCompany}
                variant="filled"
                text="Yes, remove"
                width="100%"
                height="40px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
