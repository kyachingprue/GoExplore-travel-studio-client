import MainLayout from "../layout/MainLayout";
import {createBrowserRouter} from "react-router-dom"
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import About from "../pages/About";
import Packages from "../pages/Packages";
import Experience from "../pages/Experience";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import VerifyEmail from "../authentication/VerifyEmail";
import ForgetPassword from "../authentication/ForgetPassword";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../pages/Profile";
import PackageCardDetails from "../components/packages/PackageCardDetails";
import Overview from "../dashboard/users/Overview";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'about',
        element: <About/>
      },
      {
        path: 'packages',
        element: <Packages/>
      },
      {
        path: "packages/:id",
        element: <PackageCardDetails/>
      },
      {
        path: 'experience',
        element: <Experience/>
      },
      {
        path: 'profile',
        element: <Profile/>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'overview',
        element: <Overview/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/verify-email',
    element: <VerifyEmail/>
  },
  {
    path: '/forget-password',
    element: <ForgetPassword/>
  }
])

export default router;