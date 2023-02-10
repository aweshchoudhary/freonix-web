import Card from "../components/Card";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";

const User = () => {
  const { userid } = useParams();
  const loggedUserId = useSelector((state) => state.user.userid);
  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
  }

  return (
    <>
      <section>
        <div className="header">
          <img
            src="https://images.unsplash.com/photo-1675552561461-fbdaeaf7fefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="cover"
            className="w-full md:h-[250px] h-[160px] object-cover"
          />
        </div>
        <div className="md:px-5 px-3">
          <div className="py-5 h-[100px] flex justify-between">
            <div className="md:-translate-y-[80px] -translate-y-[60px]">
              <img
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="user avatar"
                className="md:w-[150px] md:h-[150px] w-[120px] h-[120px] border-bg border-4 object-cover rounded-full"
              />
            </div>
            <div>
              {userid === loggedUserId ? (
                <button
                  onClick={logoutUser}
                  className="py-2 rounded px-5 border-2 border-primary text-primary"
                >
                  Logout
                </button>
              ) : (
                <button className="py-2 rounded px-5 border-2 border-primary text-primary">
                  follow
                </button>
              )}
            </div>
          </div>
          <div>
            <h2 className="md:text-3xl text-2xl font-medium">
              Awesh Choudhary
            </h2>
            <p className="text-lg">@aweshchoudhary</p>
          </div>
          <div className="mt-5">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              fugiat odio ratione explicabo, nisi a excepturi assumenda minima,
            </p>
          </div>
          <div className="flex items-center md:gap-5 gap-x-5 gap-y-2 mt-3 flex-wrap text-gray-700">
            <span>
              <span className="text-lg font-semibold text-black">994</span>{" "}
              Followers
            </span>
            <span>
              <span className="text-lg font-semibold text-black">111</span>{" "}
              Following
            </span>
            <span className="flex items-center gap-2">
              <Icon
                className="md:text-3xl text-2xl"
                icon="material-symbols:location-on"
              />
              Mumbai, India
            </span>
            <span className="flex items-center gap-2">
              <Icon
                className="md:text-3xl text-2xl"
                icon="material-symbols:date-range"
              />
              Joined Jan 2010
            </span>
          </div>
        </div>
      </section>
      <section className="py-5">
        {/* <Card />
        <Card />
        <Card /> */}
      </section>
    </>
  );
};

export default User;
