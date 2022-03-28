import { useContext, useReducer } from "react";
import { createContext } from "react";
import { reducer } from "../reducer/authReducer";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  
 let initialState={
   token: JSON.parse(localStorage.getItem("jwt")) || ''
 }
  const [authState, authDispatch] = useReducer(reducer, initialState);


  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
