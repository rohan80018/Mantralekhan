import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";
import AuthContext, {  AuthProvider } from "./context/AuthContext";
import TopUser from "./pages/TopUser";

function App() {
  // const {user} = React.useContext(AuthContext)
  return (
    <div className="App">
      <Router>  
        <AuthProvider>
          <Header />
          <Routes>
            {/* <Route exact path="/" element={!authenticated?<Redirect to="/login" />:<HomePage/>} />  */}
            {/* <Route component={HomePage} path="/" exact/> */}
            {/* <Route exact path="/" element={<HomePage/>} /> */}
            {/* <Route exact path="/" element={<HomePage/>} /> */}
            {/* <Route path="/" element={<HomePage replace to="/login" />} /> */}
            <Route exact
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route exact path="/topUser" element={
              <PrivateRoute>
                <TopUser />
              </PrivateRoute>
            }/>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
