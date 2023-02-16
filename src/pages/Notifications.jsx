import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useRefreshUser from "../hooks/useRefreshUser";

const Notifications = () => {
  const userid = useSelector((state) => state.auth.userid);
  const { fetchUser, data } = useRefreshUser(userid);
  console.log(data);
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <section>
        <ul>
          <li className="py-3 px-5 border-b border-separate hover:bg-gray-50">
            <Link to="/">
              <h2 className="text-lg">New message title here</h2>
              <p className="text-sm">12 minutes ago</p>
            </Link>
          </li>
          <li className="py-3 px-5 border-b border-separate hover:bg-gray-50">
            <Link to="/">
              <h2 className="text-lg">New message title here</h2>
              <p className="text-sm">12 minutes ago</p>
            </Link>
          </li>
          <li className="py-3 px-5 border-b border-separate hover:bg-gray-50">
            <Link to="/">
              <h2 className="text-lg">New message title here</h2>
              <p className="text-sm">12 minutes ago</p>
            </Link>
          </li>
          <li className="py-3 px-5 border-b border-separate hover:bg-gray-50">
            <Link to="/">
              <h2 className="text-lg">New message title here</h2>
              <p className="text-sm">12 minutes ago</p>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Notifications;
