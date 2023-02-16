import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getUserById } from "../store/userSlice";
import menu from "../data/menu.json";

export default function Sidebar() {
  const userid = useSelector((state) => state?.auth.userid);
  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [active, setActive] = useState({});

  useEffect(() => {
    dispatch(getUserById(userid));
  }, [userid]);

  useEffect(() => {
    const mainPath = pathname === "/" ? "home" : pathname.split("/")[1];
    menu.forEach((item) => {
      const link = item.link === "/" ? "home" : item.link.split("/")[1];
      if (link == mainPath) {
        setActive((prev) => {
          return {
            ...prev,
            [link]: true,
          };
        });
      } else {
        setActive((prev) => {
          return {
            ...prev,
            [link]: false,
          };
        });
      }
    });
  }, [pathname]);

  return (
    <aside className="sm:flex bg-white sticky top-0 left-0 hidden flex-col h-screen justify-between p-5 lg:w-[23%] w-[100px] border-r">
      <Link to="/" className="block lg:mx-0 mx-auto">
        <div className="flex items-center gap-3 lg:ml-1 mx-auto">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="lg:w-[30px] w-[25px]"
          />
          <h2 className="text-3xl lg:block hidden font-semibold">FREONIX</h2>
        </div>
      </Link>
      <ul className="flex flex-col lg:items-start items-center lg:gap-3">
        {menu.map((item) => {
          return (
            <li
              key={item.id}
              className={`${
                active[item.label]
                  ? "bg-primary text-white"
                  : "hover:bg-primary hover:text-white"
              } lg:w-full rounded-lg`}
            >
              <Link
                to={item.link}
                className={"flex text-lg p-3 items-center gap-4 w-full h-full"}
              >
                <Icon className="md:text-3xl text-2xl" icon={item.icon} />
                <span className="lg:block hidden capitalize">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        to={`/user/${userid}`}
        className="flex items-center gap-3 lg:py-3 lg:justify-start justify-center lg:px-3 p-0 lg:bg-gray-100 rounded-lg"
      >
        <div className="shrink-0">
          {data?.avatar ? (
            <img
              src={data?.avatar + "?alt=media"}
              alt="avatar"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[50px] flex items-center justify-center h-[50px] rounded-full bg-gray-200">
              <Icon icon={"uil:user"} className="text-3xl text-gray-300" />
            </div>
          )}
        </div>
        <div className="lg:block hidden">
          <h3 className="font-medium m-0">{data?.displayName}</h3>
          <p className="text-base m-0">@{data?.username || "createuser"}</p>
        </div>
      </Link>
    </aside>
  );
}
