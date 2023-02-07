import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Header = () => {
  const linkStyle = "flex items-center gap-5";

  return (
    <header className="md:hidden flex items-center justify-between px-5 py-3 border-b">
      <div className="logo flex items-center gap-5">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-[40px] lg:mx-0 mx-auto"
          />
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link to={"/messages"} className={linkStyle}>
          <Icon
            className="text-3xl lg:mx-0 mx-auto"
            icon="tabler:message-circle-2-filled"
          />
        </Link>
        <Link to="/user">
          <img
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt="user avatar"
            className="w-[40px] rounded-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
