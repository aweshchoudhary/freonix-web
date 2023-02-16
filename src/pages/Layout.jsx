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
      <main className="flex md:h-screen overflow-y-auto h-[80vh] bg-gray-50">
        <Sidebar />
        <article className="md:w-[40%] md:mx-auto w-full shrink-0">
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
