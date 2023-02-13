import { Icon } from "@iconify/react";
import { collection, setDoc } from "firebase/firestore";
import { getBlob, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db, storage } from "../config/firebase";

const Create = () => {
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef();
  const userid = useSelector((state) => state.auth.userid);
  const [description, setDescription] = useState("");

  function createImgUrl() {
    const [file] = imgRef.current.files;
    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
  }
  function deleteFile() {
    setImgUrl("");
    imgRef.current.value = "";
  }

  async function uploadPost() {
    const [file] = imgRef.current.files;
    const storageRef = ref(storage, Date.now() + "-" + file.name);
    let post = {
      img: null,
      description,
      userid,
      comments: [{ comment: null, userid: null }],
      likes: null,
    };
    await uploadBytes(storageRef, file)
      .then((e) => {
        post.img =
          "https://firebasestorage.googleapis.com/v0/b/twitter-clone-362d5.appspot.com/o/" +
          e.metadata.fullPath;
      })
      .catch((err) => console.log(err));

    const postsRef = collection(db, "posts");
    await setDoc(postsRef, post)
      .then((e) => console.log(e))
      .catch((err) => console.log(err));
    toast.success("post uploaded");
  }

  return (
    <section className="p-5">
      <h1 className="text-4xl font-medium">Create</h1>
      <form className="md:mt-10 mt-5">
        <div
          onClick={() => imgRef.current.click()}
          className="mb-5 h-[300px] cursor-pointer bg-gray-50 flex items-center justify-center w-full"
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              className="w-full h-full object-contain"
              alt="post image"
            />
          ) : (
            <p className="text-center text-3xl font-medium text-gray-300">
              Click To Add Picture
            </p>
          )}
        </div>
        {imgUrl && (
          <div className="flex items-center gap-3 my-5">
            <button onClick={() => imgRef.current.click()} type="button">
              <Icon className="text-3xl" icon="jam:refresh-reverse" />
            </button>
            <button type="button" onClick={deleteFile}>
              <Icon className="text-3xl" icon="ic:baseline-delete" />
            </button>
          </div>
        )}
        <input
          type="file"
          ref={imgRef}
          className="opacity-0 h-0 w-0 absolute -top-full"
          name="img"
          id="img"
          onChange={createImgUrl}
        />
        <div>
          <textarea
            className="p-3 text-xl border outline-none w-full min-h-[150px]"
            placeholder="Post Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-5 flex items-stretch gap-2">
          <button
            onClick={uploadPost}
            type="button"
            className="px-8 py-3 bg-primary text-white rounded-full"
          >
            Create Post
          </button>
          <button
            type="button"
            className="p-3 bg-red-500 text-white rounded-full"
          >
            <Icon className="text-2xl" icon="bxs:trash-alt" />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Create;
