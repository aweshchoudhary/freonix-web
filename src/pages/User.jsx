import Card from "../components/Card";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getUserById } from "../store/userSlice";

const User = () => {
  const { userid } = useParams();
  const loggedUserId = useSelector((state) => state.auth.userid);
  const { loading, error, data } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
  }

  useEffect(() => {
    dispatch(getUserById(userid));
    console.table(data);
  }, [userid]);

  return !loading && data && !error ? (
    <>
      <section className="header border-b pb-5 mb-5">
        <div className="header">
          {data?.cover ? (
            <img
              src={data?.cover}
              alt="cover"
              className="w-full md:h-[250px] h-[160px] object-cover"
            />
          ) : (
            <div className="w-full flex items-center justify-center md:h-[250px] h-[160px] bg-gray-100">
              <button className="py-2 rounded px-5 border-2 border-primary text-primary">
                Add Cover Picture
              </button>
            </div>
          )}
        </div>
        <div className="md:px-5 px-3">
          <div className="py-5 h-[100px] flex justify-between">
            <div className="md:-translate-y-[80px] -translate-y-[60px]">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt="user avatar"
                  className="md:w-[150px] md:h-[150px] w-[120px] h-[120px] border-bg border-4 object-cover rounded-full"
                />
              ) : (
                <div className="md:w-[150px] md:h-[150px] w-[120px] h-[120px] border-bg border-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <button>
                    <Icon
                      icon={"ic:baseline-camera-alt"}
                      className="text-6xl text-gray-300"
                    />
                  </button>
                </div>
              )}
            </div>
            <div>
              {userid === loggedUserId ? (
                <>
                  <Link
                    to="/update"
                    className="py-2 mr-3 rounded px-5 border-2 border-primary text-white bg-primary"
                  >
                    Update
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="py-2 rounded px-5 border-2 border-primary text-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button className="py-2 rounded px-5 border-2 border-primary text-primary">
                  follow
                </button>
              )}
            </div>
          </div>
          <div>
            <h2 className="md:text-3xl text-2xl font-medium capitalize">
              {data.displayName}
            </h2>

            <p className="text-lg text-primary">
              {data.username || <Link to="/update">@username</Link>}
            </p>
          </div>
          <div className="mt-5">
            <p>{data.description || "No Description"}</p>
          </div>
          <div className="flex items-center md:gap-5 gap-x-5 gap-y-2 mt-3 flex-wrap text-gray-700">
            <span>
              <span className="text-lg font-semibold text-black">
                {data.followers}
              </span>{" "}
              Followers
            </span>
            <span>
              <span className="text-lg font-semibold text-black">
                {data.followings}
              </span>{" "}
              Following
            </span>
            <span className="flex items-center gap-2">
              <Icon
                className="md:text-3xl text-2xl"
                icon="material-symbols:location-on"
              />
              {data.location || "Not Updated"}
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
        <h3 className="text-2xl font-medium text-center">
          Don't Have Posts Yet.
        </h3>
      </section>
    </>
  ) : (
    <Loading />
  );
};

export default User;
