// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "./components/pages/HomePage";
// import PlanConsent from "./components/pages/user/PlanConsent";
// import DesignEvaBuildingPermit from "./components/pages/user/DesignEvaBuildingPermit";
// import BuildingInsOccPermit from "./components/pages/user/BuildingInsOccPermit";
// import SignUp from "./components/pages/admin/SignUp";
// import SignIn from "./components/pages/admin/SignIn";
// import UserSignIn from "./components/pages/user/UserSignIn";
// import UserSignUp from "./components/pages/user/UserSignUp";
// import AdminPage from "./components/pages/admin/AdminPage";
// import UserPrivateRoute from "./components/UserPrivateRoute";
// import PrivateRoute from "./components/PrivateRoute";
// import HeaderContainer from "./components/HeaderContainer";
// import AdminProfile from "./components/pages/admin/AdminProfile";
// import UserProfile from "./components/pages/user/UserProfile";
// import ConstructionRegulatory from "./components/pages/user/ConstructionRegulatory";
// import License from "./components/pages/user/License";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <HeaderContainer />
//       <Routes>
//         <Route path="/sign-in" element={<SignIn />} />
//         <Route path="/sign-up" element={<SignUp />} />
//         <Route path="/user-sign-in" element={<UserSignIn />} />
//         <Route path="/user-sign-up" element={<UserSignUp />} />
//         <Route element={<UserPrivateRoute />}>
//           <Route path="/user-profile" element={<UserProfile />} />
//         </Route>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/plan-consent" element={<PlanConsent />} />
//         <Route path="/design-eval" element={<DesignEvaBuildingPermit />} />
//         <Route path="/building-ins" element={<BuildingInsOccPermit />} />
//         <Route path="/construction-reg" element={<ConstructionRegulatory />} />
//         <Route path="/license" element={<License />} />
//         <Route element={<PrivateRoute />}>
//           <Route path="/admin-page" element={<AdminPage />} />
//           <Route path="/admin-profile" element={<AdminProfile />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import PlanConsent from "./components/pages/user/PlanConsent";
import DesignEvaBuildingPermit from "./components/pages/user/DesignEvaBuildingPermit";
import BuildingInsOccPermit from "./components/pages/user/BuildingInsOccPermit";
import SignUp from "./components/pages/admin/SignUp";
import SignIn from "./components/pages/admin/SignIn";
import UserSignIn from "./components/pages/user/UserSignIn";
import UserSignUp from "./components/pages/user/UserSignUp";
import AdminPage from "./components/pages/admin/AdminPage";
import UserPrivateRoute from "./components/UserPrivateRoute";
import PrivateRoute from "./components/PrivateRoute";
import HeaderContainer from "./components/HeaderContainer";
import AdminProfile from "./components/pages/admin/AdminProfile";
import UserProfile from "./components/pages/user/UserProfile";
import ConstructionRegulatory from "./components/pages/user/ConstructionRegulatory";
import License from "./components/pages/user/License";
import PlanConsentReqsList from "./components/pages/admin/PlanConsentReqsList";
import DesignEvalBuildingPermitReqsList from "./components/pages/admin/DesignEvalBuildingPermitReqsList";
import BuildingInsOccPermitReqsList from "./components/pages/admin/BuildingInsOccPermitReqsList";
import ConstructionRegulatoryList from "./components/pages/admin/ConstructionRegulatoryList";
import UserDetails from "./components/pages/admin/UserDetails";
import NewLicenseReq from "./components/pages/admin/NewLicenseReq";
import UpdateLicenseReq from "./components/pages/admin/UpdateLicenseReq";
import UpgradeLicenseReq from "./components/pages/admin/UpgradeLicenseReq";
const Layout = () => (
  <>
    <HeaderContainer />
    <Outlet />
  </>
);

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },
//       {
//         path: "/sign-in",
//         element: <SignIn />,
//       },
//       {
//         path: "/sign-up",
//         element: <SignUp />,
//       },
//       {
//         path: "/user-sign-in",
//         element: <UserSignIn />,
//       },
//       {
//         path: "/user-sign-up",
//         element: <UserSignUp />,
//       },
//       {
//         element: <UserPrivateRoute />,
//         children: [
//           {
//             path: "/user-profile",
//             element: <UserProfile />,
//           },
//           {
//             path: "/plan-consent",
//             element: <PlanConsent />,
//           },
//           {
//             path: "/design-eval",
//             element: <DesignEvaBuildingPermit />,
//           },
//           {
//             path: "/building-ins",
//             element: <BuildingInsOccPermit />,
//           },
//           {
//             path: "/construction-reg",
//             element: <ConstructionRegulatory />,
//           },
//         ],
//       },

//       {
//         path: "/license",
//         element: <License />,
//       },
//       {
//         element: <PrivateRoute />,
//         children: [
//           {
//             path: "/admin-page",
//             element: <AdminPage />,
//             children: [
//               {
//                 path: "plan-consent-request",
//                 element: <PlanConsentReqsList />,
//               },
//               {
//                 path: "design-eval-request",
//                 element: <DesignEvalBuildingPermitReqsList />,
//               },
//               {
//                 path: "building-ins-request",
//                 element: <BuildingInsOccPermitReqsList />,
//               },
//               {
//                 path: "construction-reg-request",
//                 element: <ConstructionRegulatoryList />,
//                 children: [
//                   {
//                     path: "/construction-reg-request/new-license",
//                     element: <NewLicenseReq />,
//                   },
//                   {
//                     path: "/construction-reg-request/update-license",
//                     element: <UpdateLicenseReq />,
//                   },
//                   {
//                     path: "/construction-reg-request/upgrade-license",
//                     element: <UpgradeLicenseReq />,
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             path: "/admin-profile",
//             element: <AdminProfile />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// export default function App() {
//   // const { currentUser } = useSelector((state) => state.user);

//   return <RouterProvider router={router} />;
// }

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/user-sign-in",
        element: <UserSignIn />,
      },
      {
        path: "/user-sign-up",
        element: <UserSignUp />,
      },
      {
        element: <UserPrivateRoute />,
        children: [
          {
            path: "/user-profile",
            element: <UserProfile />,
          },
          {
            path: "/plan-consent",
            element: <PlanConsent />,
          },
          {
            path: "/design-eval",
            element: <DesignEvaBuildingPermit />,
          },
          {
            path: "/building-ins",
            element: <BuildingInsOccPermit />,
          },
          {
            path: "/construction-reg",
            element: <ConstructionRegulatory />,
          },
        ],
      },

      {
        path: "/license",
        element: <License />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/admin-page",
            element: <AdminPage />,
            children: [
              {
                path: "plan-consent-request",
                element: <PlanConsentReqsList />,
              },
              {
                path: "design-eval-request",
                element: <DesignEvalBuildingPermitReqsList />,
              },
              {
                path: "building-ins-request",
                element: <BuildingInsOccPermitReqsList />,
              },
              {
                path: "construction-reg-request",
                element: <ConstructionRegulatoryList />,
                children: [
                  {
                    path: "new-license", // Removed leading slash
                    element: <NewLicenseReq />,
                  },
                  {
                    path: "update-license", // Removed leading slash
                    element: <UpdateLicenseReq />,
                  },
                  {
                    path: "upgrade-license", // Removed leading slash
                    element: <UpgradeLicenseReq />,
                  },
                ],
              },
            ],
          },
          {
            path: "/admin-profile",
            element: <AdminProfile />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
