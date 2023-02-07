import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Leftbar } from "../components";
const Bottombar = lazy(() => import("../components/Bottombar"));

const Layout = () => {
  return (
    <>
      <main className="flex sm:h-screen h-[90vh]">
        <Sidebar />
        <article className="flex-1 overflow-y-auto">
          <Suspense fallback="loading...">
            <Outlet />
          </Suspense>
        </article>
        <Leftbar />
      </main>
      <footer className="sm:hidden flex items-center h-[10vh] w-full border-t">
        <Suspense fallback="Loading...">
          <Bottombar />
        </Suspense>
      </footer>
    </>
  );
};

export default Layout;
