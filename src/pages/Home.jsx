import Card from "../components/Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getAllPostsByLimit = async () => {
    const postsRef = collection(db, "posts");
    const posts = await getDocs(postsRef);
    posts.forEach((post) => {
      setPosts((prev) => {
        return [...prev, post.id];
      });
    });
  };
  console.log(posts);
  useEffect(() => {
    getAllPostsByLimit();
  }, []);
  return posts ? (
    <section>
      {posts.length ? (
        posts.map((postid, key) => {
          return <Card key={key} postid={postid} />;
        })
      ) : (
        <h2>No Posts!</h2>
      )}
    </section>
  ) : (
    <Loading />
  );
};

export default Home;
