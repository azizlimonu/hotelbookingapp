import React, { createContext, useReducer } from "react";

const INITIAL_STATE = {
  selectedRooms: [],
};

export const ReserveContext = createContext(INITIAL_STATE);

const ReserveReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_RESERVE':
      return action.payload;
    case 'RESET_RESERVE':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const ReserveContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReserveReducer, INITIAL_STATE);

  return (
    <ReserveContext.Provider
      value={{
        selectedRooms: state.selectedRooms,
        dispatch
      }}
    >
      {children}
    </ReserveContext.Provider>
  )
};