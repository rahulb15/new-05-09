import React from 'react';
// import { Counter } from './features/counter/Counter';
import { Route, Routes, } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/Dashboard';
// import { useEffect } from 'react';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
// import { useCookies } from "react-cookie";
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider, useAuth} from './utils/auth';
import { Navigate } from 'react-router-dom';
import { RequireAuth } from './utils/RequireAuth';
// import { useEffect } from 'react';

// import axios from 'axios';




const Routing = () => {
  // const [cookies, setCookie] = useCookies();
  // console.log("cookies", localStorage.getItem("token"));
  const auth = useAuth();


  return (
      <Routes>
        <Route path="/" element={!auth.user ? <Login /> : <Navigate to="/dashboard" /> } />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        {/* <Route path="/setting" element={<ProtectedRoute component={Setting} />} /> */}
        <Route path="/setting" element={<RequireAuth> <Setting/> </RequireAuth>} />
        {/* <Route path="/dashboard" element={<RequireAuth> <Dashboard /> </RequireAuth>} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute  component={Dashboard} />} /> */}
      </Routes>
  );
}





function App() {
// console.log("App");

// const [user, setUser] = React.useState();
//   useEffect(() => {
//     const getuser = async () => {
//       fetch("http://localhost:5000/api/user/loginSuccess", {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Credentials": true,
//         },
//       })
//         .then((res) => {
//         if(res.status === 200) return res.json();
//         throw new Error("Failed to authenticate user");
//     })
//     .then((resObjet) => {
//       // setCookie("token", resObjet.user.token);
//       setUser(resObjet.user);
//       console.log("resObjet", resObjet.user.token);
//       localStorage.setItem("token", resObjet.user.token);
      
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   };
//   getuser();
//   }, []);
//   console.log(user);

  
  return (
    <AuthProvider>
    <div className="App">
      <Routing />
    </div>
    </AuthProvider>
  );
}

export default App;
