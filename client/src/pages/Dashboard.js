// import axios from 'axios';
import React from 'react';
import MiniDrawer from '../components/miniSideBar/MiniSideBar.js';
import { useAuth } from "../utils/auth";
// import { useEffect } from 'react';
// import { useCookies } from "react-cookie";



export default function Dashboard() {
    const auth = useAuth();
  // const [cookies, setCookie] = useCookies();


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



    // const logout = (e)=>{
    //     e.preventDefault();

    //     axios.get("http://localhost:5000/api/user/logout")
    //         .then((res) => {
    //             console.log(res);
    //             localStorage.removeItem("token");
    //             sessionStorage.clear("session");
    //             window.location.href = "/";
    //         }).catch((err) => {
    //             console.log(err);
    //         }
    //     )
    // }
    
    return (
        <div>
            <MiniDrawer />
            <h1>Dashboard</h1>
            <h1>React cookies</h1>
            <h6>{auth.user ? auth.user.firstName : "No user"}</h6>
            {/* <p>{cookies.token}</p> */}
            {/* <button onClick={logout} className="button">Logout</button> */}
        </div>
    );
}
