import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

const Leftbar = () => {
  const loggedUserId = useSelector((state) => state.auth.userid);
  const data = useSelector((state) => state.user.data);
  const [users, setUsers] = useState([]);

  const dayNo = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  async function getFollowedUsersList() {
    try {
      const userRef = doc(db, "users", loggedUserId);
      const result = await getDoc(userRef);
      const loggedUserData = result.data();
      setUsers(loggedUserData.followings);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  }

  useEffect(() => {
    getFollowedUsersList();
  }, []);

  return (
    <aside className="lg:w-[30%] h-fit border-b bg-white min-h-screen shrink-0 border-l p-5 lg:block hidden">
      <div className="h-[250px] w-full rounded-lg relative bg-black">
        <img
          src="https://source.unsplash.com/random"
          className="w-full h-full object-cover absolute top-0 opacity-80 left-0 z-0"
          alt="random"
        />
        <div className="content absolute bottom-0 left-0 z-10 p-5">
          <h2 className="text-2xl text-white font-semibold">
            Hello, {data?.displayName}
          </h2>
          <p className="text-xl text-white">{`${dayNo}/${month}/${year}`}</p>
        </div>
      </div>
      <div className="followings mt-5">
        {users.length ? (
          <>
            <h2 className="text-3xl font-semibold mb-5">Your Followings</h2>
            <ul>
              {users.map((userid, key) => {
                return <UserCard key={key} userid={userid} />;
              })}
            </ul>
          </>
        ) : (
          <h2 className="text-2xl font-semibold">You Don't have followings</h2>
        )}
      </div>
    </aside>
  );
};

const UserCard = ({ userid }) => {
  const [user, setUser] = useState({});
  async function getUserById() {
    try {
      const userRef = doc(db, "users", userid);
      const result = await getDoc(userRef);
      setUser({ id: result.id, ...result.data() });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  }

  useEffect(() => {
    getUserById();
  }, [userid]);

  return user ? (
    <li className="my-3">
      <Link to={"/user/" + user.id}>
        <div className="user flex items-center gap-4">
          <div>
            {user.avatar ? (
              <img
                src={user.avatar + "?alt=media"}
                alt="user name here"
                className="w-[60px] h-[60px] object-cover rounded-full"
              />
            ) : (
              <div className="w-[60px] h-[60px] rounded-full bg-gray-100"></div>
            )}
          </div>
          <div>
            <p className="text-xl font-medium">{user.displayName}</p>
            <p>{user?.followers?.length || 0} Followers</p>
          </div>
        </div>
      </Link>
    </li>
  ) : null;
};

export default Leftbar;
