import { lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Layout from "./pages/Layout";
const Home = lazy(() => import("./pages/Home"));
const Search = lazy(() => import("./pages/Search"));
const User = lazy(() => import("./pages/User"));
const Explore = lazy(() => import("./pages/Explore"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Messages = lazy(() => import("./pages/Messages"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const App = () => {
  const user = false;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="user" element={<User />} />
        <Route path="search" element={<Search />} />
        <Route path="explore" element={<Explore />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      <Route
        path="login"
        element={
          <Suspense fallback={"Loading..."}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback={"Loading..."}>
            <Register />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
