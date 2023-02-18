import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { db } from "../config/firebase";

const Chat = () => {
  const [message, setMessage] = useState("");
  const { userid } = useParams();
  async function sendMessage() {}

  useEffect(() => {
    async function getUser() {
      const userRef = doc(db, "userid", userid);
    }
  }, [userid]);
  return (
    <>
      <header className="flex items-center gap-3 md:p-5 p-3 bg-white border-b">
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/twitter-clone-362d5.appspot.com/o/1676547065272-Screenshot_2023-01-15-13-36-12-53_069e529cc8505d5ece6192d13b8d87e5.jpg?alt=media"
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-medium">Awesh Choudhary</h1>
        </div>
      </header>
      <section className="md:p-5 py-2 px-4 bg-white flex flex-col gap-3">
        <div className="self-start">
          <div className="message p-3 bg-primary text-white rounded-lg w-fit">
            <p>Lorem ipsum dolor sit amet.</p>
            <div className="bottom text-sm flex gap-2 items-center ">
              {/* <span className="text-base">sent</span> */}
              <span>12:20 am</span>
            </div>
          </div>
        </div>
        <div className="self-end">
          <div className="message p-3 bg-white  border rounded-lg w-fit">
            <p>Lorem ipsum dolor sit amet.</p>
            <div className="bottom text-sm flex gap-2 items-center ">
              {/* <span className="text-base">sent</span> */}
              <span>12:20 am</span>
            </div>
          </div>
        </div>
      </section>
      <footer className="flex items-center gap-3 bg-white border-t p-4">
        {/* <div>
          <Icon icon="ic:outline-emoji-emotions" className="text-4xl" />
        </div> */}
        <div className="flex-1 flex items-stretch gap-3">
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Enter your message"
            onChange={(e) => setMessage(e.target.value)}
            className="px-5 py-2 border rounded-lg flex-1"
          />
          <button className="rounded-lg py-2 px-3 grid place-items-center bg-primary text-white">
            <Icon icon="ic:sharp-send" className="text-2xl" />
          </button>
        </div>
      </footer>
    </>
  );
};

export default Chat;
