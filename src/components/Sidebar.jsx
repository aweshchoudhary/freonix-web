import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sidebarStyle =
    "lg:w-[23vw] md:w-[10vw] w-full h-[10vh] bg-white shrink-0 lg:px-0 px-2 border-r md:h-screen flex md:flex-col md:items-start md:border-t-0 border-t items-center md:gap-0 gap-3 justify-between md:py-5 flex-grow-0";

  const ulStyle =
    "w-full text-lg md:block flex items-center md:justify-start justify-between md:flex-initial flex-1 md:px-0 px-5";
  const liStyle =
    "py-4 lg:px-5 lg:mx-3 mx-1 md:hover:bg-gray-50 hover:text-primary rounded-lg my-1";
  const linkStyle = "flex items-center gap-5";

  return (
    <aside className={sidebarStyle}>
      <header className="lg:px-10 mt-5 md:block hidden">
        <div className="logo flex items-center gap-5">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="md:w-[50px] w-[40px] lg:mx-0 mx-auto"
          />
          <p className="text-3xl font-semibold lg:block hidden">Twitter</p>
        </div>
      </header>
      <div className="px-3 md:block hidden">
        <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-full">
          <Icon icon="uil:search" className="text-3xl" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent outline-none border-none"
          />
        </div>
      </div>
      <ul className={ulStyle}>
        <li className={liStyle}>
          <Link to={"/"} className={linkStyle}>
            <Icon
              className="md:text-3xl text-2xl lg:mx-0 mx-auto"
              icon="material-symbols:home"
            />
            <span className="lg:block hidden">Home</span>
          </Link>
        </li>
        <li className={liStyle}>
          <Link to={"/explore"} className={linkStyle}>
            <Icon
              className="md:text-3xl text-2xl lg:mx-0 mx-auto"
              icon="ph:hash-bold"
            />
            <span className="lg:block hidden">Explore</span>
          </Link>
        </li>
        <li className={liStyle + " md:hidden block"}>
          <Link to={"/search"} className={linkStyle}>
            <Icon
              className="md:text-3xl text-2xl lg:mx-0 mx-auto"
              icon="uil:search"
            />
          </Link>
        </li>
        <li className={liStyle}>
          <Link to={"/notifications"} className={linkStyle}>
            <Icon
              className="md:text-3xl text-2xl lg:mx-0 mx-auto"
              icon="ph:bell-fill"
            />
            <span className="lg:block hidden">Notifications</span>
          </Link>
        </li>
        <li className={liStyle + " md:block hidden"}>
          <Link to={"/messages"} className={linkStyle}>
            <Icon
              className="md:text-3xl text-2xl lg:mx-0 mx-auto"
              icon="tabler:message-circle-2-filled"
            />
            <span className="lg:block hidden">Messages</span>
          </Link>
        </li>
        <li className="px-5 mt-10 lg:block hidden">
          <Link
            to={"/"}
            className="w-full py-2 text-lg text-textColor hover:opacity-70 transition bg-primary block text-center rounded-full"
          >
            Tweet
          </Link>
        </li>
      </ul>
      <footer className="md:w-full md:block hidden">
        <Link to={"/user"} className="block w-full sm:px-3">
          <div className="user-card flex items-center gap-3 w-full lg:py-2 lg:px-3 px-1 lg:bg-gray-100 rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
              alt="user avatar"
              className="lg:w-[60px] lg:h-[60px] md:w-full w-[50px] rounded-full"
            />
            <div className="lg:block hidden">
              <p className="name">Awesh Choudhary</p>
              <p className="username">@aweshchoudhary</p>
            </div>
          </div>
        </Link>
      </footer>
    </aside>
  );
};

export default Sidebar;
