import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User")
    setUser(JSON.parse(user))
  }, [])

  const updateRegisterInfo = useCallback((info) => {
   
    setRegisterInfo(info)
  })

  const updateLoginInfo = useCallback((info) => {

    setLoginInfo(info)

  })

  const logoutUser = useCallback(() => {

    localStorage.removeItem("User")
    setUser(null)
  }, [])

  const registerUser = useCallback(async(e) => {

    e.preventDefault()

    setIsRegisterLoading(true)
    setRegisterError(null)

    console.log(3)
    const responce  = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))
    setIsRegisterLoading(false)

    if (responce.error){
      return setRegisterError(responce)
    }

    localStorage.setItem("User", JSON.stringify(responce.others))
    localStorage.setItem("Token", JSON.stringify(responce.token))

    setUser(responce.others)
  }, [registerInfo])

  const loginUser = useCallback(async(e) => {

    e.preventDefault()

    setIsLoginLoading(true)
    setLoginError(null)

    const responce  = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))
    setIsLoginLoading(false)

    if (responce.error){
      return setLoginError(responce)
    }

    localStorage.setItem("User", JSON.stringify(responce.others))
    localStorage.setItem("Token", JSON.stringify(responce.token))
    setUser(responce.others)
  }, [loginInfo])

  return (
    <AuthContext.Provider value={{ user, registerInfo, loginInfo, updateRegisterInfo, updateLoginInfo, registerUser, registerError, loginError, isRegisterLoading, isLoginLoading, loginUser, logoutUser}}>{children}</AuthContext.Provider>
  );
};
