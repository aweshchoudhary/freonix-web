import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import menu from "../data/menu.json";

const Bottombar = () => {
  const [active, setActive] = useState({});
  const { pathname } = useLocation();

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
    <ul className="sm:hidden fixed bottom-0 left-0  bg-white flex items-center border-b w-full px-5 justify-between border-t h-[70px]">
      {menu.map((item, i) => {
        return (
          item.label !== "message" && (
            <li key={i} className={active[item.label] ? "text-primary" : null}>
              <Link to={item.link}>
                <Icon className="text-2xl" icon={item.icon} />
              </Link>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default Bottombar;
