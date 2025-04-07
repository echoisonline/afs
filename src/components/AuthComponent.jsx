import React, { useState } from "react";

const AuthComponent = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      const response = await fetch(
        `https://test-task-api.allfuneral.com/auth?user=${username}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const authToken = response.headers.get("Authorization");

        if (authToken) {
          setToken(authToken.replace("Bearer ", "")); 
          setError("");
        } else {
          setError("Токен не получен");
        }
      } else {
        setError("Ошибка при авторизации");
      }
    } catch (err) {
      setError("Ошибка при авторизации");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введите имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleAuth}>Авторизоваться</button>

      {token && <p>Токен: {token}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AuthComponent;
