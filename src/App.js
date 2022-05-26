import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "pages/MainPage";
import { UserPage } from "pages/UserPage";
import { EditUserPage } from "pages/EditUserPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const url = "http://localhost:7070/api/";

function App() {
  return (
    <>
      <ToastContainer autoClose={1000} hideProgressBar={true}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="editUser/:id" element={<EditUserPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
