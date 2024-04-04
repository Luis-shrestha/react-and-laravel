// import { useEffect } from "react";
// import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Users from "./components/userpages/users";
import AddUsers from "./components/userpages/addusers";
import EditUsers from "./components/userpages/editusers";
import AddStudents from "./components/studentpages/addstudents";
import Students from "./components/studentpages/students";
import "./App.css";

function App() {
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const response = await axios
  //       .get("http://127.0.0.1:8000/api/adduser")

  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   fetchdata();
  // });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Users />} />
          <Route path="/addusers" element={<AddUsers />} />
          <Route path="/editusers/:id" element={<EditUsers />} />
          <Route path="/students" element={<Students />} />
          <Route path="/addstudents" element={<AddStudents />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
