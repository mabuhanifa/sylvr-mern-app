import { createContext, useContext, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});

  return (
    <Context.Provider
      value={{
        loggedUser,
        setLoggedUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;

export const useProvider = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("No context provider");
  }
  return context;
};
