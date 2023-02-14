import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

const Bottombar = () => {
  const liStyle = "";
  const linkStyle = "";
  return (
    <ul className="sm:hidden flex items-center border-b w-full py-3 px-5 justify-between">
      <li>
        <Link to={"/"}>
          <Icon className="text-2xl" icon="material-symbols:home" />
        </Link>
      </li>
      <li>
        <Link to={"/create"}>
          <Icon className="text-2xl" icon="fa-solid:feather" />
        </Link>
      </li>
      <li>
        <Link to={"/search"}>
          <Icon className="text-2xl" icon="uil:search" />
        </Link>
      </li>
      <li>
        <Link to={"/notifications"}>
          <Icon className="text-2xl" icon="ph:bell-fill" />
        </Link>
      </li>
      <li className={"md:block hidden"}>
        <Link to={"/messages"}>
          <Icon className="text-2xl" icon="tabler:message-circle-2-filled" />
        </Link>
      </li>
    </ul>
  );
};

export default Bottombar;
