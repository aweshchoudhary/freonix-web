import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

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
  const { userid, accessToken, refreshToken } = useSelector(
    (state) => state.user
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            userid && refreshToken && accessToken ? (
              <Home />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="user/:userid"
          element={
            userid && refreshToken && accessToken ? (
              <User />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="search"
          element={
            userid && refreshToken && accessToken ? (
              <Search />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="explore"
          element={
            userid && refreshToken && accessToken ? (
              <Explore />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="notifications"
          element={
            userid && refreshToken && accessToken ? (
              <Notifications />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="messages"
          element={
            userid && refreshToken && accessToken ? (
              <Messages />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
      </Route>

      <Route
        path="login"
        element={
          <Suspense fallback={"Loading..."}>
            {userid && refreshToken && accessToken ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )}
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense fallback={"Loading..."}>
            {userid && refreshToken && accessToken ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )}
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
