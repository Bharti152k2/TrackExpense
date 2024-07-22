import React, { createContext, useState } from "react";
import axios from "axios";

export let AuthContext = createContext();
function Authentication({ children }) {
  let [isLoggin, setisLoggin] = useState(null);
  console.log(isLoggin);
  let login = (data) => {
    setisLoggin(data);
  };

  let logout = () => {
    setisLoggin(null);
  };

  // let logout = async () => {
  //   try {
  //     await axios.post(`http://localhost:3000/api/logout/${isLoggin._id}`);
  //     setisLoggin(null);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <AuthContext.Provider value={{ isLoggin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Authentication;
