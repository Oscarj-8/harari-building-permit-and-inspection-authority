import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";
import ServiceOne from "./components/pages/ServiceOne";
import ServiceTwo from "./components/pages/ServiceTwo";
import ServiceThree from "./components/pages/ServiceThree";
import ServiceFour from "./components/pages/ServiceFour";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service-one" element={<ServiceOne />} />
        <Route path="/service-two" element={<ServiceTwo />} />
        <Route path="/service-three" element={<ServiceThree />} />
        <Route path="/service-four" element={<ServiceFour />} />
      </Routes>
    </BrowserRouter>
  );
}
