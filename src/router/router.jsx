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
import MyBookings from "../dashboard/users/MyBookings";
import Payments from "../dashboard/users/Payments";
import Reviews from "../dashboard/users/Reviews";
import WishList from "../dashboard/users/WishList";
import Analytics from "../dashboard/admin/Analytics";
import ManagePackages from "../dashboard/admin/ManagePackages";
import ManageBookings from "../dashboard/admin/ManageBookings";
import ManageUsers from "../dashboard/admin/ManageUsers";
import AdminPayments from "../dashboard/admin/AdminPayments";
import AdminReviews from "../dashboard/admin/AdminReviews";
import AdminBlogs from "../dashboard/admin/AdminBlogs";
import PrivateRoute from "./PrivateRoute";
import PackageUpdate from "../dashboard/admin/PackageUpdate";
import AddNewPackage from "../dashboard/admin/AddNewPackage";
import AdminRoute from "./AdminRoute";
import AddExperienceCard from "../dashboard/admin/AddExperienceCard";
import ExperienceCardEdit from "../dashboard/admin/ExperienceCardEdit";
import ExperienceCardDetails from "../components/experiences/ExperienceCardDetails";

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
        path: "packages/:_id",
        element: <PackageCardDetails/>
      },
      {
        path: 'experience',
        element: <Experience/>
      },
      {
        path: "experience/:id",
        element:< ExperienceCardDetails />
      },
      {
        path: 'profile',
        element: <Profile/>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      //User Dashboard
      {
        path: 'overview',
        element: <PrivateRoute><Overview /></PrivateRoute>
      },
      {
        path: 'bookings',
        element: <PrivateRoute><MyBookings /></PrivateRoute>
      },
      {
        path: 'payments',
        element: <PrivateRoute><Payments /></PrivateRoute>
      },
      {
        path: 'reviews',
        element: <PrivateRoute><Reviews /></PrivateRoute>
      },
      {
        path: 'wishlist',
        element: <PrivateRoute><WishList /></PrivateRoute>
      },
      //Admin Dashboard
      {
        path: 'admin/analytics',
        element: <AdminRoute><Analytics /></AdminRoute>
      },
      {
        path: 'admin/packages',
        element: <AdminRoute><ManagePackages /></AdminRoute>
      },
      {
        path: 'admin/package-update/:id',
        element: <AdminRoute><PackageUpdate /></AdminRoute>
      },
      {
        path: "admin/add-new-package",
        element: <AdminRoute><AddNewPackage /></AdminRoute>,
      },
      {
        path: 'admin/manage-bookings',
        element: <AdminRoute><ManageBookings /></AdminRoute>
      },
      {
        path: 'admin/users',
        element: <AdminRoute><ManageUsers /></AdminRoute>
      },
      {
        path: 'admin/payments',
        element: <AdminRoute><AdminPayments /></AdminRoute>
      },
      {
        path: 'admin/reviews',
        element: <AdminRoute><AdminReviews /></AdminRoute>
      },
      {
        path: 'admin/blogs',
        element: <AdminRoute><AdminBlogs /></AdminRoute>
      },
      {
        path: "admin/add-experience-card",
        element: <AddExperienceCard />
      },
      {
        path:"admin/experience-card-edit/:id",
        element: <ExperienceCardEdit />
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