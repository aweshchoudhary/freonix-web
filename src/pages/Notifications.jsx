import { Link } from "react-router-dom";

const Notifications = () => {
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
