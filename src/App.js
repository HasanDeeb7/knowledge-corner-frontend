import React, { useEffect, useState } from "react";
import { createContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";
import { toast } from "react-toastify";
export const userContext = createContext();

function App() {
  const [user, setUser] = useState();
  axios.defaults.withCredentials = true;

  async function getUser() {
    if (!user) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PATH}api/user/getUser`
        );
        if (response) {
          setUser(response.data);
          if (response.data.status === "inactive") {
            toast.info("Your Account is Temporarly Disabled", {
              autoClose: false,
              closeOnClick: false,
              closeButton: false,
              position: "bottom-center",
              style: { backgroundColor: "darkred", color: "white" },
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <HelmetProvider>
      <userContext.Provider value={{ user, setUser }}>
        <div className="App">
          <AppRoutes />
        </div>
      </userContext.Provider>
    </HelmetProvider>
  );
}

export default App;
