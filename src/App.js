import React, { useEffect, useState } from "react";
import { createContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import axios from "axios";

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  axios.defaults.withCredentials = true;
  async function getUser(){
    const response = await axios.get(`http://localhost:5000/api/user/getUser/`)
  } 
  useEffect(()=>{
    
  }, [])
  return (
    <userContext.Provider value={{ user, setUser }}>
      <div className="App">
        <AppRoutes />
      </div>
    </userContext.Provider>
  );
}

export default App;
