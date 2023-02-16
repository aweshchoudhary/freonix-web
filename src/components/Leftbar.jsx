import { Link } from "react-router-dom";

const Leftbar = () => {
  return (
    <aside className="lg:w-[30%] h-fit border-b bg-white shrink-0 border-l p-5 lg:block hidden">
      <div className="hashtags">
        <h2 className="text-2xl font-semibold">What's Happening</h2>
        <ul className="py-5">
          <li className="py-3 px-3 border-b rounded-lg hover:bg-gray-50">
            <Link to="/">
              <p className="text-xl mb-1">#webdesign</p>
              <p>10.3k Tweets</p>
            </Link>
          </li>
          <li className="py-3 px-3 border-b rounded-lg hover:bg-gray-50">
            <Link to="/">
              <p className="text-xl mb-1">#webdesign</p>
              <p>10.3k Tweets</p>
            </Link>
          </li>
          <li className="py-3 px-3 border-b rounded-lg hover:bg-gray-50">
            <Link to="/">
              <p className="text-xl mb-1">#webdesign</p>
              <p>10.3k Tweets</p>
            </Link>
          </li>
          <li className="py-3 px-3 border-b rounded-lg hover:bg-gray-50">
            <Link to="/">
              <p className="text-xl mb-1">#webdesign</p>
              <p>10.3k Tweets</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="followings">
        <h2 className="text-2xl font-semibold mb-5">Your Followings</h2>
        <ul>
          <li className="my-3">
            <Link to={"/"}>
              <div className="user flex items-center gap-4">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80"
                    alt="user name here"
                    className="w-[60px] h-[60px] object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="text-xl font-medium">Awesh Khan</p>
                  <p>12 Followers</p>
                </div>
              </div>
            </Link>
          </li>
          <li className="my-3">
            <Link to={"/"}>
              <div className="user flex items-center gap-4">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80"
                    alt="user name here"
                    className="w-[60px] h-[60px] object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="text-xl font-medium">Awesh Khan</p>
                  <p>12 Followers</p>
                </div>
              </div>
            </Link>
          </li>
          <li className="my-3">
            <Link to={"/"}>
              <div className="user flex items-center gap-4">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80"
                    alt="user name here"
                    className="w-[60px] h-[60px] object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="text-xl font-medium">Awesh Khan</p>
                  <p>12 Followers</p>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Leftbar;
