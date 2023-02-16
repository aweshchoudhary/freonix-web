import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

async function followUser(data, loggedUserId, refreshUser) {
  try {
    if (data.id !== loggedUserId) {
      const userRef = doc(db, "users", data.id);
      const loggedUserRef = doc(db, "users", loggedUserId);
      const getLoggedUser = await getDoc(loggedUserRef);
      const loggedUserData = getLoggedUser.data();

      const addFollower = data.followers
        ? [...data.followers, loggedUserId]
        : [loggedUserId];

      const addFollowing = loggedUserData.followings
        ? [...loggedUserData.followings, data.id]
        : [data.id];

      await updateDoc(userRef, {
        followers: addFollower,
      });
      await updateDoc(loggedUserRef, {
        followings: addFollowing,
      });
    }
  } catch (err) {
    toast.error(err.message);
  }
  refreshUser();
}

export default followUser;
