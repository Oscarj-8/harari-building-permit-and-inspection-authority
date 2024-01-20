import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ServiceOne from "./components/pages/ServiceOne";
import ServiceTwo from "./components/pages/ServiceTwo";
import ServiceThree from "./components/pages/ServiceThree";
import ServiceFour from "./components/pages/ServiceFour";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import UserSignIn from "./components/pages/UserSignIn";
import UserSignUp from "./components/pages/UserSignUp";
import AdminPage from "./components/pages/AdminPage";
import UserPrivateRoute from "./components/UserPrivateRoute";
import PrivateRoute from "./components/PrivateRoute";
import HeaderContainer from "./components/HeaderContainer";
import AdminProfile from "./components/pages/AdminProfile";
import UserProfile from "./components/pages/UserProfile";

export default function App() {
  return (
    <BrowserRouter>
      <HeaderContainer />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-sign-in" element={<UserSignIn />} />
        <Route path="/user-sign-up" element={<UserSignUp />} />
        <Route element={<UserPrivateRoute />}>
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/service-one" element={<ServiceOne />} />
        <Route path="/service-two" element={<ServiceTwo />} />
        <Route path="/service-three" element={<ServiceThree />} />
        <Route path="/service-four" element={<ServiceFour />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
