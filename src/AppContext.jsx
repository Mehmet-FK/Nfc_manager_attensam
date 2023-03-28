import { createContext, useContext, useState } from "react";

export const AppStateContext = createContext();

const AppStateProvider = (props) => {
  const [info, setInfo] = useState({});

  const contextValue = { setInfo, info };
  console.log("INFO", info);
  return (
    <AppStateContext.Provider value={contextValue}>
      {props.children}
    </AppStateContext.Provider>
  );
};

export const useInfoContext = () => {
  return useContext(AppStateContext);
};

export default AppStateProvider;
