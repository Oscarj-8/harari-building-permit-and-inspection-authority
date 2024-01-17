import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ServiceOne from "./components/pages/ServiceOne";
import ServiceTwo from "./components/pages/ServiceTwo";
import ServiceThree from "./components/pages/ServiceThree";
import ServiceFour from "./components/pages/ServiceFour";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import AdminPage from "./components/pages/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import HeaderContainer from "./components/HeaderContainer";

export default function App() {
  return (
    <BrowserRouter>
      <HeaderContainer />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/service-one" element={<ServiceOne />} />
        <Route path="/service-two" element={<ServiceTwo />} />
        <Route path="/service-three" element={<ServiceThree />} />
        <Route path="/service-four" element={<ServiceFour />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin-page" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
