import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../config/firebase";

function useRefreshUser(userid, setData, setLoading, setError) {
  async function refreshUser() {
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
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current && refreshUser();
    return () => {
      isMounted.current = true;
    };
  }, [userid]);

  return { refreshUser };
}

export default useRefreshUser;
