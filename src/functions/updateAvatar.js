import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../config/firebase";
import deleteAvatar from "./deleteAvatar";

async function updateAvatar(avatarRef, data, userid, refreshUser) {
  let imgPath;
  const [file] = avatarRef.current.files;
  if (file.size > 1048576) {
    return toast.error("File size limit is 1MB");
  }
  if (data?.avatar) {
    await deleteAvatar(userid, data);
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

export default updateAvatar;
