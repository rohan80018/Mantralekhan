import React, { useState, createContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();

  let [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null
  );
  let [loginErr, setLoginErr] = useState(null);
  // let [loading, setLoading] = useState(true);

  // let userLogin = async (event) => {
  //   event.preventDefault();
  //   // console.log(event.target.username.value,event.target.password.value)
  //   let response = await fetch("http://127.0.0.1:8000/api/token/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       username: event.target.username.value,
  //       password: event.target.password.value,
  //     }),
  //   });
  //   console.log(response);

    let userLogin = async (username, password) => {
      // event.preventDefault();
      // console.log(event.target.username.value,event.target.password.value)
      let response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log(response);

    let data = await response.json();
    if (response.status === 200) {
      setLoginErr(null);
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      // localStorage.setItem('user',JSON.stringify(jwt_decode(data.access)))
      navigate("/");
    } else {
      setLoginErr("Username/Password invalid");
    }
  };

  let logoutUser = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    setAuthToken(null);
    setUser(null);
  };

  let updateToken = async () => {
    console.log("update");
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh: authToken.refresh,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
    } else {
      logoutUser();
    }
    // if(loading){
    //   setLoading(false)
    // }
  };
  let [userData, setUserData] = React.useState({});

  let getUserData = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/getUserData/${user.user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + String(authToken.access),
      },
    });
    let data = await response.json();
    if (response.status===200){
      setUserData(data);
    }else if(response.statusText === "Unauthorized"){
      logoutUser()
    }
  };
  let postUserData = async () => {
    console.log("post")
    let response = await fetch(`http://127.0.0.1:8000/api/getUserData/${user.user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " +  String(authToken.access),
      },
      body: JSON.stringify({
        count: 5,
      }),
    });
    let data = await response.json();
    setUserData(data);
  };
  const [topUserData, setTopUserData] = React.useState({})
  let topUser = async() =>{
    let response = await fetch("http://127.0.0.1:8000/api/getTopUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + String(authToken.access),
      },
    });
    let data = await response.json();
    setTopUserData(data);
  }

  let [perData, setPerData] = React.useState({});
  let performance = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/getPerformance/${user.user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + String(authToken.access),
      },
    });
    let data = await response.json();
    setPerData(data);
  };


  React.useEffect(() => {
    // if(loading){
    //   updateToken()
    // }

    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, 1000*60*4);
    return () => clearInterval(interval);
  }, [authToken]);
  // console.log(user.username)
  let contextData = {
    userLogin: userLogin,
    logoutUser: logoutUser,
    loginErr: loginErr,
    userN: user? user.username:null,
    user: user,
    authToken: authToken,
    setUserData: setUserData,
    getUserData: getUserData,
    userData: userData,
    postUserData: postUserData,
    topUserData:topUserData,
    topUser:topUser,
    perData:perData,
    performance:performance
  };

  return (
    <AuthContext.Provider value={contextData}>{ children}</AuthContext.Provider>
  );
};
