import { Icon } from "@iconify/react";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../config/firebase";
import Loading from "../components/Loading";

const Card = ({ postid }) => {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const userid = useSelector((state) => state.auth.userid);
  const { data } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [isComments, setIsComments] = useState(false);
  const [loading, setLoading] = useState(false);

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

  async function addComment() {
    try {
      const postRef = doc(db, "posts", postid);
      const newComment = {
        displayName: data.displayName,
        avatar: data.avatar || null,
        comment,
        createdAt: new Date(),
      };
      const modifiedComments = post.comments
        ? [...post.comments, newComment]
        : [newComment];
      await updateDoc(postRef, {
        comments: modifiedComments,
      });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
    setComment("");
    getPostData();
  }
  async function deleteComment() {
    try {
      const postRef = doc(db, "posts", postid);
      const filteredComments = post.comments.filter(
        (comment) => comment.userid !== userid
      );
      await updateDoc(postRef, {
        comments: filteredComments,
      });
      toast.success("comment deleted");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
    getPostData();
  }

  useEffect(() => {
    getPostData();
  }, [postid]);

  return (
    <div className="md:p-5 bg-white px-3 py-5 md:my-4 md:border-none border-b">
      {post && user ? (
        <>
          {user && (
            <header>
              <div className="flex items-center justify-between">
                <Link to={`/user/${post.userid}`}>
                  <div className="flex items-center md:gap-3 gap-2">
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
          <footer>
            <div className="flex items-center gap-10 mt-4">
              <button className="flex items-center gap-2">
                {post?.likes?.includes(userid) ? (
                  <Icon
                    onClick={dislikePost}
                    icon="mdi:like"
                    className="text-2xl"
                  />
                ) : (
                  <Icon
                    onClick={likePost}
                    icon="mdi:like-outline"
                    className="text-2xl"
                  />
                )}
                <span>{post?.likes?.length || 0}</span>
              </button>
              <button
                onClick={() => setIsComments((prev) => !prev)}
                className="flex items-center gap-2"
              >
                <Icon icon="uil:comment-dots" className="text-2xl" />
                <span>{post?.comments?.length || 0}</span>
              </button>
              <button className="flex items-center gap-2">
                <Icon icon="mdi:share" className="text-3xl" />
              </button>
            </div>

            {isComments ? (
              <div className="comment-section mt-5">
                <div className="add-comment flex items-stretch gap-2 border-b pb-4">
                  <div className="avatar">
                    <img
                      src={user.avatar + "?alt=media"}
                      alt="avatar"
                      className="w-[40px] h-[40px] rounded-full border object-cover"
                    />
                  </div>
                  <div className="flex-1 border flex items-stretch">
                    <input
                      type="text"
                      placeholder="Write a comment"
                      className="bg-transparent w-full px-4 h-full outline-none"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={addComment}
                    disabled={!comment}
                    className="px-3 py-2 rounded disabled:bg-gray-500 bg-primary text-white"
                  >
                    <Icon icon="ic:sharp-send" className="text-2xl" />
                  </button>
                </div>
                {post?.comments?.length
                  ? post.comments.map((comment) => (
                      <div className="comments">
                        <div className="comment my-2 py-2 ">
                          <div className="flex items-center justify-between">
                            <div className="avatar flex items-center gap-3">
                              <img
                                src={comment.avatar + "?alt=media"}
                                alt="avatar"
                                className="w-[40px] h-[40px] rounded-full object-cover border"
                              />
                              <h2>
                                <span className="text-gray-500 mr-2">
                                  {comment.displayName}
                                </span>{" "}
                                <span className="text-black text-base">
                                  {comment.comment}
                                </span>
                              </h2>
                            </div>
                          </div>
                          <p className="mt-2 text-sm"></p>
                          <p className="text-sm text-gray-500 mt-1 text-right">
                            <span className="mr-3">
                              {comment.createdAt.seconds}
                            </span>
                            <button
                              onClick={deleteComment}
                              className="text-red-600"
                            >
                              delete
                            </button>
                          </p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            ) : null}
          </footer>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Card;
