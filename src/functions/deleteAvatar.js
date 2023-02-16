import { deleteField, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../config/firebase";

async function deleteAvatar(userid, data, refreshUser) {
  const avatarImgRef = ref(storage, data.avatar.split("o/")[1]);
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

export default deleteAvatar;
