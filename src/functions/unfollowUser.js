import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

async function unfollowUser(data, loggedUserId) {
  try {
    if (data?.followers) {
      const userRef = doc(db, "users", data.id);
      const loggedUserRef = doc(db, "users", loggedUserId);
      const getLoggedUser = await getDoc(loggedUserRef);
      const loggedUserData = getLoggedUser.data();
      const index = data.followers.indexOf(loggedUserId);
      const findex = loggedUserData.followings.indexOf(data.id);

      if (findex > -1) {
        loggedUserData.followings.splice(index, 1);
        await updateDoc(loggedUserRef, {
          followings: loggedUserData.followings,
        });
      }
      if (index > -1) {
        data.followers.splice(index, 1);
        await updateDoc(userRef, {
          followers: data.followers,
        });
      }
    }
  } catch (err) {
    toast.error(err.message);
  }
}

export default unfollowUser;
