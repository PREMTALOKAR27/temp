import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Route, Routes, BrowserRouter as Router, Navigate, useSearchParams } from 'react-router-dom'

import {
  ForgetPassword,
  Login,
  SignUp,
  PageNoFound,
  ProfilePage,
  PointsDashboard,
  NewLanding,
  OTPVerificationPage,
  OTPResetPass,
  BillScan,
  RewardsAndPropertyListings,
  BuilderDashboard,
  TransactionBrokerage,
  Loading,
  Landing
} from "./pages"
import { AdminDashboard, ReceiptPage, Recipe, UserManagement } from "./pages/admin";
import Layout from "./utils/Layout";
import { authStore } from './store/authStore';
import { useEffect } from 'react';
import NotificationsPage from './pages/NotificationPage';
import PointsRewards from './pages/PointsRewards';
import Homepage from './pages/Homepage';
import NotifyProperty from './pages/NotifyProperty';
import NewLogin from './pages/NewLogin';
import NewSignup from './pages/NewSignup';
import ContactUs from './pages/ContactUs';
import Property from './pages/Property';
import Rewards from './pages/Rewards';
import { leadStore } from './store/leadStore';
import AdminLayout from './pages/admin/AdminLayout';
import NewProperties from './pages/NewProperties';
import BillScanPage from './pages/BillScanPage';
import HowItWorks from './pages/HowItWorks';
import ReceiptManagement from './components/ReceiptManagement';
import Disclaimer from './pages/Disclaimer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import TermsOfUse from './pages/TermsOfUse';

const AppRoutes = () => {
  const { isLoggedIn, isLoading, authData } = authStore()
  const { fetchAllLeads } = leadStore()
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      isLoggedIn();
      searchParams.delete("token");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchAllLeads()
    isLoggedIn()
  }, [])

  if (isLoading) return <Loading />
  return (
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/login" element={authData ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authData ? <Navigate to="/" /> : <SignUp />} /> */}
          <Route path="/login" element={authData ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authData ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/otp-verification" element={<OTPVerificationPage />} />
          <Route path="/otp-reset" element={<OTPResetPass />} />
          <Route path="/reset-password" element={<ForgetPassword />} />

          <Route path="/" element={<Landing />} />
          <Route path="/bill-scan" element={<BillScanPage />} />
          <Route path="/points-dashboard" element={<PointsDashboard />} />
          <Route path="/rewards-dashboard" element={<RewardsAndPropertyListings />} />
          <Route path="/builder-dashboard" element={<BuilderDashboard />} />
          <Route path="/transaction-brokerage" element={<TransactionBrokerage />} />
          <Route path="/notification" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pointsrewards" element={<PointsRewards />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/notify" element={<NotifyProperty />} />
          <Route path="/newlogin" element={<NewLogin />} />
          <Route path="/newsignup" element={<NewSignup />} />
          <Route path="/properties" element={<NewProperties />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
        </Route>
        <Route
          element={
            authData?.role === "ADMIN" ? <AdminLayout /> : <PageNoFound />
          }
        >
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/receipt" element={<ReceiptPage />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/receiptmanagement" element={<ReceiptManagement />} />
        </Route>


        <Route path="*" element={<PageNoFound />} />
      </Routes>
  )
}

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer />
    </Router>
  )
}

export default App;