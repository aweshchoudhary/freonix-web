import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "../store/userSlice";

const Header = () => {
  const linkStyle = "flex items-center gap-5";
  const userid = useSelector((state) => state?.auth?.userid);

  const data = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(userid));
  }, [userid]);
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
        <Link to={"/user/" + userid}>
          {data?.avatar ? (
            <img
              src={data?.avatar + "?alt=media"}
              alt="avatar"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-200">
              <Icon icon={"uil:user"} className="text-3xl text-gray-300" />
            </div>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
