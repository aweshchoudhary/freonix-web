import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const liStyle = "hover:bg-gray-100 lg:w-full hover:text-primary rounded-full";
  const linkStyle =
    "flex py-3 text-lg lg:px-5 px-3 items-center gap-4 w-full h-full";
  const userid = useSelector((state) => state?.auth?.userid);

  return (
    <aside className="sm:flex hidden flex-col h-screen justify-between p-5 lg:w-[350px] w-[100px] border-r">
      <div className="logo flex items-center gap-4 px-5  ">
        <img src="/assets/logo-dark.png" alt="logo dark" className="w-[40px]" />
        <span className="text-3xl font-bold lg:block hidden">Twitter</span>
      </div>
      <ul className="flex flex-col lg:items-start items-center gap-2">
        <li className={liStyle}>
          <Link to={"/"} className={linkStyle}>
            <Icon
              className="md:text-3xl text-2xl"
              icon="material-symbols:home"
            />
            <span className="lg:block hidden">Home</span>
          </Link>
        </li>
        <li className={liStyle}>
          <Link to={"/explore"} className={linkStyle}>
            <Icon className="md:text-3xl text-2xl" icon="ph:hash-bold" />
            <span className="lg:block hidden">Explore</span>
          </Link>
        </li>
        <li className={liStyle}>
          <Link to={"/search"} className={linkStyle}>
            <Icon className="md:text-3xl text-2xl" icon="uil:search" />
            <span className="lg:block hidden">Search</span>
          </Link>
        </li>
        <li className={liStyle + " md:hidden block"}>
          <Link to={"/search"} className={linkStyle}>
            <Icon className="md:text-3xl text-2xl" icon="uil:search" />
          </Link>
        </li>
        <li className={liStyle}>
          <Link to={"/notifications"} className={linkStyle}>
            <Icon className="md:text-3xl text-2xl" icon="ph:bell-fill" />
            <span className="lg:block hidden">Notifications</span>
          </Link>
        </li>
        <li className={liStyle + " md:block hidden"}>
          <Link to={"/messages"} className={linkStyle}>
            <Icon
              className="md:text-3xl text-2xl"
              icon="tabler:message-circle-2-filled"
            />
            <span className="lg:block hidden">Messages</span>
          </Link>
        </li>
        <li className="mt-5 lg:w-full">
          <Link
            to={"/"}
            className="lg:w-full lg:py-2 lg:px-0 p-3 text-lg text-textColor hover:opacity-70 transition bg-primary block text-center rounded-full"
          >
            <span className="lg:block hidden">Tweet</span>
            <Icon
              className="lg:hidden block text-2xl"
              icon="fa-solid:feather-alt"
            />
          </Link>
        </li>
      </ul>
      <Link
        to={`/user/${userid}`}
        className="flex items-center gap-3 lg:py-3 lg:justify-start justify-center lg:px-5 p-0 lg:bg-gray-100 rounded-full"
      >
        <div className="shrink-0">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80"
            alt="avatar"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div className="lg:block hidden">
          <h3 className="font-medium">Awesh Choudhary</h3>
          <p className="text-base">@aweshchoudhary</p>
        </div>
      </Link>
    </aside>
  );
}
