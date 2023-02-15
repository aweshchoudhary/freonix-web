import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

async function getUserPosts(userid, setPosts) {
  const q = query(collection(db, "posts"), where("userid", "==", userid));
  await getDocs(q).then((e) => {
    e.forEach((post) => {
      setPosts((prev) => [...prev, post.id]);
    });
  });
}

export default getUserPosts;
