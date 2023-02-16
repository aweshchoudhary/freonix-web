import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Leftbar } from "../components";
import Loading from "../components/Loading";
const Mobilemenu = lazy(() => import("../components/Mobilemenu"));
const Header = lazy(() => import("../components/Header"));

const Layout = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <header className="sm:hidden block">
          <Header />
        </header>
      </Suspense>
      <main className="flex md:h-screen overflow-y-auto h-[calc(100vh-140px)] bg-gray-50">
        <Sidebar />
        <article className="lg:w-[40%] lg:mx-auto lg:flex-none md:flex-1 w-full shrink-0">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </article>
        <Leftbar />
      </main>
      <footer>
        <Suspense fallback="loading...">
          <Mobilemenu />
        </Suspense>
      </footer>
    </>
  );
};

export default Layout;
