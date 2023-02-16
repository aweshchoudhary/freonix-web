import Card from "../components/Card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const postsRef = collection(db, "posts");

  const getAllPostsByLimit = async () => {
    const posts = await getDocs(postsRef);
    posts.forEach((post) => {
      setPosts((prev) => {
        return [...prev, { id: post.id, ...post.data() }];
      });
    });
  };

  useEffect(() => {
    getAllPostsByLimit();
  }, []);
  return posts ? (
    <section>
      {posts.length ? (
        posts.map((post, key) => {
          return <Card key={key} postid={post.id} />;
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
