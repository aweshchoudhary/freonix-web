import { Icon } from "@iconify/react";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../config/firebase";

const Card = ({ postid }) => {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const userid = useSelector((state) => state.auth.userid);

  async function likePost() {
    const postRef = doc(db, "posts", postid);
    await updateDoc(postRef, {
      likes: post.likes ? [...post.likes, userid] : [userid],
    }).then(() => getPostData());
  }
  async function dislikePost() {
    const postRef = doc(db, "posts", postid);
    const removeLike = post.likes.filter((e) => e !== userid);
    await updateDoc(postRef, {
      likes: removeLike,
    }).then(() => getPostData());
  }
  const getPostData = async () => {
    try {
      //Fetch Post Data
      const postRef = doc(db, "posts", postid);
      const e = await getDoc(postRef);
      const postData = { id: e.id, ...e.data() };
      setPost(postData);

      //After POST data Fetch User Data
      const userRef = doc(db, "users", postData.userid);
      const result = await getDoc(userRef);
      const postUserData = { id: result.id, ...result.data() };
      setUser(postUserData);
    } catch (error) {
      toast.error(err.message);
    }
  };
  async function deletePost() {
    try {
      if (userid !== post.userid) return;
      const postImgRef = ref(storage, post.img.split("o/")[1]);
      await deleteObject(postImgRef);
      const postRef = doc(db, "posts", post.id);
      await deleteDoc(postRef);
      toast.success("Post has been deleted");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  }

  useEffect(() => {
    getPostData();
  }, [postid]);

  return (
    <div className="md:p-5 bg-white px-3 py-5 md:my-4 md:border-none border-b">
      {user && (
        <header>
          <div className="flex items-center justify-between">
            <Link to={`/user/${post.userid}`}>
              <div className="flex items-center md:gap-5 gap-2">
                <div>
                  {user.avatar ? (
                    <img
                      src={user.avatar + "?alt=media"}
                      alt="post user"
                      className="md:w-[60px] border md:h-[60px] w-[40px] h-[40px] object-cover rounded-full"
                    />
                  ) : (
                    <div className="md:w-[60px] md:h-[60px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-200">
                      <Icon
                        icon={"uil:user"}
                        className="text-3xl text-gray-300"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <p className="md:text-xl font-medium capitalize">
                    {user.displayName}
                  </p>
                  {user.username && (
                    <p className="md:text-base text-sm">@{user.username}</p>
                  )}
                </div>
              </div>
            </Link>
            {post.userid === userid ? (
              <button onClick={deletePost}>
                <Icon icon={"bxs:trash-alt"} className="text-2xl" />
              </button>
            ) : null}
          </div>
          {/* <div>
            <p className="flex items-center gap-1 mt-3 text-gray-500">
              <Icon icon="mdi:globe" className="md:text-2xl" />
              <span className="md:text-base text-sm">
                {moment(post?.createdAt?.seconds).format()}
              </span>
            </p>
          </div> */}
        </header>
      )}
      <div className="md:mt-8 mt-4">
        <div className="description md:text-base text-sm">
          <p>{post.description}</p>
        </div>
        <div className="media mt-5">
          <img src={post.img + "?alt=media"} alt="post image" />
        </div>
      </div>
      <footer className="flex items-center gap-10 mt-4">
        <button className="flex items-center gap-2">
          {post?.likes?.includes(userid) ? (
            <Icon onClick={dislikePost} icon="mdi:like" className="text-2xl" />
          ) : (
            <Icon
              onClick={likePost}
              icon="mdi:like-outline"
              className="text-2xl"
            />
          )}
          <span>{post?.likes?.length || 0}</span>
        </button>
        <button className="flex items-center gap-2">
          <Icon icon="uil:comment-dots" className="text-2xl" />
          <span>{post?.comments?.length}</span>
        </button>
        <button className="flex items-center gap-2">
          <Icon icon="mdi:share" className="text-3xl" />
        </button>
      </footer>
    </div>
  );
};

export default Card;
