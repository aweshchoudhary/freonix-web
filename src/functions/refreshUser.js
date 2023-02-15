import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

async function refreshUser(userid, setData, setError, setLoading) {
  setLoading(true);
  try {
    const usersRef = doc(db, "users", userid);
    const user = await getDoc(usersRef);

    if (user.exists()) {
      const userInfo = { id: user.id, ...user.data() };
      setData(userInfo);
    } else {
      setError("User Not Found!");
    }
  } catch (err) {
    setUser = err.message;
    console.log(err);
  }
  setLoading(false);
}

export default refreshUser;
