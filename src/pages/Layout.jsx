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
          <Mobilemenu />
        </header>
      </Suspense>
      <main className="flex sm:h-screen h-[80vh]">
        <Sidebar />
        <article className="flex-1 overflow-y-auto">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </article>
        <Leftbar />
      </main>
    </>
  );
};

export default Layout;
