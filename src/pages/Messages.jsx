import { Link } from "react-router-dom";

const Messages = () => {
  return (
    <>
      <section className="md:p-5 p-3 bg-white border-b">
        <h1 className="text-3xl font-medium">Messages</h1>
      </section>
      <section className="bg-white">
        <ul>
          <li>
            <Link
              className="flex items-center gap-3 p-4 hover:bg-gray-50 border-b"
              to="/"
            >
              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/twitter-clone-362d5.appspot.com/o/1676547065272-Screenshot_2023-01-15-13-36-12-53_069e529cc8505d5ece6192d13b8d87e5.jpg?alt=media"
                  alt="user avatar"
                  className="w-[50px] h-[50px] object-cover rounded-full"
                />
              </div>
              <div>
                <h2 className="font-medium text-lg">Awesh Choudhary</h2>
                <p className="text-gray-500">Message title here</p>
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Messages;
