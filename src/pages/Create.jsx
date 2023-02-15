import { Icon } from "@iconify/react";
import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadPost } from "../store/posts/postsSlice";

const Create = () => {
  const [imgUrl, setImgUrl] = useState("");
  const imgRef = useRef();
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.auth.userid);
  const { loading, success, error } = useSelector((state) => state.posts);
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

  function discardPost() {
    deleteFile();
    setDescription("");
  }
  async function uploadNewPost() {
    const [file] = imgRef.current.files;
    dispatch(uploadPost({ file, description, userid }));
  }
  useEffect(() => {
    if (success) {
      toast.success("Post Has Been Uploaded");
      discardPost();
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.success(error);
    }
  }, [error]);

  return (
    <section className="p-5">
      <h1 className="md:text-4xl text-2xl font-medium">Create</h1>
      <form className="md:mt-10 mt-5">
        <div
          onClick={() => imgRef.current.click()}
          className="mb-5 md:h-[300px] h-[200px] cursor-pointer bg-gray-50 flex items-center justify-center w-full"
        >
          {imgUrl ? (
            <img
              src={imgUrl}
              className="w-full h-full object-contain"
              alt="post image"
            />
          ) : (
            <p className="text-center md:text-3xl text-xl font-medium text-gray-300">
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
            value={description}
          />
        </div>
        <div className="mb-5 flex items-stretch gap-2">
          <button
            onClick={uploadNewPost}
            type="button"
            className="px-8 py-3 bg-primary text-white rounded-full"
          >
            {loading ? "Loading..." : "Create Post"}
          </button>
          <button
            onClick={discardPost}
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
