import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../config/firebase";
import deleteCover from "./deleteCover";

async function updateCover(coverRef, data, userid, refreshUser) {
  let imgPath;
  const [file] = coverRef.current.files;
  if (file.size > 1048576) {
    return toast.error("File size limit is 1MB");
  }
  if (data?.cover) {
    await deleteCover(userid, data);
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

export default updateCover;
