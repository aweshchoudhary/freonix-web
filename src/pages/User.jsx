import Card from "../components/Card";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import { getUserById } from "../store/userSlice";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/firebase";
import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const User = () => {
  const { userid } = useParams();
  const loggedUserId = useSelector((state) => state.auth.userid);
  const [data, setData] = useState({});
  const loading = useRef(false);
  const error = useRef(null);
  const [posts, setPosts] = useState([]);
  const [followed, setFollowed] = useState(false);
  const avatarRef = useRef();
  const coverRef = useRef();

  const dispatch = useDispatch();

  function logoutUser() {
    dispatch(logout());
  }
  async function refreshUser() {
    loading.current = true;
    try {
      const usersRef = doc(db, "users", userid);
      const user = await getDoc(usersRef);
      if (user.exists()) {
        const userInfo = { id: user.id, ...user.data() };
        setData(userInfo);
      } else {
        error.current = "User Not Found!";
      }
    } catch (err) {
      error.current = err.message;
    }
    loading.current = false;
  }
  async function updataAvatar() {
    let imgPath;
    const [file] = avatarRef.current.files;
    if (data.avatar) {
      await deleteAvatar();
    }
    if (file) {
      const avatarImgRef = ref(storage, Date.now() + "-" + file.name);
      await uploadBytes(avatarImgRef, file)
        .then((e) => {
          imgPath =
            "https://firebasestorage.googleapis.com/v0/b/twitter-clone-362d5.appspot.com/o/" +
            e.metadata.fullPath;
        })
        .catch((err) => toast.error(err.message));
      const avatarDataRef = doc(db, "users", userid);
      await updateDoc(avatarDataRef, {
        avatar: imgPath,
      })
        .then(() => {
          toast.success("Avatar Updated");
        })
        .catch((err) => toast.error(err.message));
    }
    refreshUser();
  }
  async function updateCover() {
    let imgPath;
    const [file] = coverRef.current.files;
    if (data?.cover) {
      await deleteCover();
    }
    if (file) {
      const coverImgRef = ref(storage, Date.now() + "-" + file.name);
      await uploadBytes(coverImgRef, file)
        .then((e) => {
          imgPath =
            "https://firebasestorage.googleapis.com/v0/b/twitter-clone-362d5.appspot.com/o/" +
            e.metadata.fullPath;
        })
        .catch((err) => toast.error(err.message));
      const coverDataRef = doc(db, "users", userid);
      await updateDoc(coverDataRef, {
        cover: imgPath,
      })
        .then(() => {
          toast.success("Cover Updated");
        })
        .catch((err) => toast.error(err.message));
    }
    refreshUser();
  }
  async function deleteCover() {
    const coverImgRef = ref(storage, data.cover.split("o/")[1]);
    deleteObject(coverImgRef)
      .then(async () => {
        const userRef = doc(db, "users", userid);
        await updateDoc(userRef, {
          cover: deleteField(),
        })
          .then(() => {
            toast.success("Cover Deleted Successfully");
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
    refreshUser();
  }
  async function deleteAvatar() {
    const avatarImgRef = ref(storage, data.cover.split("o/")[1]);
    deleteObject(avatarImgRef)
      .then(async () => {
        const userRef = doc(db, "users", userid);
        await updateDoc(userRef, {
          avatar: deleteField(),
        })
          .then(() => {
            toast.success("Avatar Deleted Successfully");
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
    refreshUser();
  }
  async function getUserPosts() {
    const q = query(collection(db, "posts"), where("userid", "==", userid));
    await getDocs(q).then((e) => {
      e.forEach((post) => {
        setPosts((prev) => [...prev, post.id]);
      });
    });
  }
  async function followUser() {
    const userRef = doc(db, "users", data.id);
    if (data.id !== loggedUserId) {
      const addFollower = data.followers
        ? [...data.followers, loggedUserId]
        : [loggedUserId];
      await updateDoc(userRef, {
        followers: addFollower,
      })
        .then(() => console.log("user followed"))
        .catch((err) => console.log(err));
    }
    refreshUser();
  }
  async function unfollowUser() {
    const userRef = doc(db, "users", data.id);
    if (data?.followers) {
      const index = data.followers.indexOf(loggedUserId);
      if (index > -1) {
        data.followers.splice(index, 1);
      }
    }
    await updateDoc(userRef, {
      followers: data.followers,
    });
    await refreshUser();
  }
  function checkIsFollowed() {
    if (data?.followers) {
      const isExists = data.followers.indexOf(loggedUserId);
      if (isExists > -1) {
        setFollowed(true);
      } else {
        setFollowed(false);
      }
    }
  }

  const isMounted = useRef(false);

  useEffect(() => {
    refreshUser();
    isMounted.current && getUserPosts();
    return () => {
      isMounted.current = true;
    };
  }, [userid]);

  useEffect(() => {
    if (data.followers) {
      checkIsFollowed();
    }
  }, [data.followers]);

  return !loading.current && data && !error.current ? (
    <>
      <section className="header border-b pb-5 mb-5">
        <div className="header relative">
          {data?.cover ? (
            <img
              src={data?.cover + "?alt=media"}
              alt="cover"
              className="w-full md:h-[250px] h-[160px] object-cover"
            />
          ) : (
            <div className="w-full flex items-center justify-center md:h-[250px] h-[160px] bg-gray-100">
              <button
                onClick={() => coverRef.current.click()}
                className="py-2 rounded px-5 border-2 border-primary text-primary"
              >
                Add Cover Picture
              </button>
            </div>
          )}
          {data.cover && (
            <div className="z-10 absolute bottom-4 right-4 text-white flex items-center gap-4">
              <button
                className="bg-[#00000089] p-2"
                onClick={() => coverRef.current.click()}
              >
                <Icon className="text-2xl" icon="jam:refresh-reverse" />
              </button>
              <button className="bg-[#00000089] p-2" onClick={deleteCover}>
                <Icon className="text-2xl" icon="bxs:trash-alt" />
              </button>
            </div>
          )}
        </div>
        <div className="md:px-5 px-3">
          <div className="py-5 h-[100px] flex justify-between">
            <div className="md:-translate-y-[80px] -translate-y-[60px]">
              {data.avatar ? (
                <img
                  onClick={() => avatarRef.current.click()}
                  src={data.avatar + "?alt=media"}
                  alt="user avatar"
                  className="md:w-[150px] cursor-pointer md:h-[150px] w-[120px] h-[120px] border-bg border-4 object-cover rounded-full"
                />
              ) : (
                <div className="md:w-[150px] md:h-[150px] w-[120px] h-[120px] border-bg border-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <button onClick={() => avatarRef.current.click()}>
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
                    className="sm:text-base text-sm py-2 mr-3 rounded px-5 border-2 border-primary text-white bg-primary"
                  >
                    Update
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="sm:text-base text-sm py-2 rounded px-5 border-2 border-primary text-primary"
                  >
                    Logout
                  </button>
                </>
              ) : followed ? (
                <button
                  onClick={unfollowUser}
                  className="py-2 rounded px-5 border-2 border-primary text-primary"
                >
                  unfollow
                </button>
              ) : (
                <button
                  onClick={followUser}
                  className="py-2 rounded px-5 border-2 border-primary text-primary"
                >
                  follow
                </button>
              )}
            </div>
            <input
              type="file"
              className="absolute -top-full opacity-0"
              ref={avatarRef}
              onChange={updataAvatar}
              name="avatar"
              id="avatar"
            />
            <input
              type="file"
              className="absolute -top-full opacity-0"
              ref={coverRef}
              onChange={updateCover}
              name="cover"
              id="cover"
            />
          </div>
          <div>
            <h2 className="md:text-3xl text-2xl font-medium capitalize">
              {data.displayName}
            </h2>

            <p className="text-lg text-primary">
              {data.username ? (
                "@" + data.username
              ) : (
                <Link to="/update">@username</Link>
              )}
            </p>
          </div>
          <div className="mt-5">
            <p>{data.description || "No Description"}</p>
          </div>
          <div className="flex items-center md:gap-5 gap-x-5 gap-y-2 mt-3 flex-wrap text-gray-700">
            <span>
              <span className="text-lg font-semibold text-black">
                {data?.followers?.length || 0}
              </span>{" "}
              Followers
            </span>
            <span>
              <span className="text-lg font-semibold text-black">
                {data?.followings?.length || 0}
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
      {/* <section className="py-5">
        {posts &&
          posts.map((item, id) => {
            // return <Card key={id} postid={item} />;
          })}
      </section> */}
    </>
  ) : (
    <Loading />
  );
};

export default User;
