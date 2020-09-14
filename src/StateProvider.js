import React, { createContext, useContext, useReducer } from "react";

//Prepares the dataLater
export const StateContext = createContext();

//Wrap out app and provide the Data Layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
