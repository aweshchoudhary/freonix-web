import { deleteField, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../config/firebase";

async function deleteCover(userid, cover, refreshUser) {
  const coverImgRef = ref(storage, cover.split("o/")[1]);
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

export default deleteCover;
