import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);

  useEffect(() => {
    const filterData = async () => {
      const filteredUsers = users.filter((user) => {
        if (user.displayName.toLowerCase().includes(query.toLowerCase())) {
          return user;
        }
      });
      if (filteredUsers.length) {
        setFilterUsers(filteredUsers);
      } else {
        setFilterUsers([]);
      }
    };
    if (query.length) {
      filterData();
    } else {
      setFilterUsers([]);
    }
  }, [query]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersRef = collection(db, "users");
        const result = await getDocs(usersRef);
        result.forEach((user) => {
          setUsers((prev) => [...prev, { id: user.id, ...user.data() }]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <section className="md:p-10 p-5">
        <h1 className="md:text-4xl text-3xl font-medium">Search</h1>
        <div
          className={`searchbox bg-white flex items-center mt-5 gap-3 border w-full py-2 px-4 ${
            focus && "outline"
          }`}
        >
          <Icon icon={"uil:search"} className="text-3xl text-gray-500" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="outline-none border-none h-full w-full"
          />
        </div>
      </section>
      <section>
        <ul>
          {filterUsers.length ? (
            filterUsers.map((user, id) => {
              return (
                <li key={id} className="px-5 md:px-10 border-y">
                  <Link to={"/user/" + user.id}>
                    <div className="flex items-center gap-3 my-5">
                      <div>
                        {user.avatar ? (
                          <img
                            src={user.avatar + "?alt=media"}
                            alt="user avatar"
                            className="h-[50px] w-[50px] rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-[50px] w-[50px] rounded-full bg-gray-200"></div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-medium">
                          {user.displayName}
                        </h2>
                        {user.username && (
                          <p className="text-base">@{user.username}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })
          ) : (
            <h3 className="text-2xl text-center md:mt-10 mt-5">
              Please Search Something
            </h3>
          )}
        </ul>
      </section>
    </>
  );
};

export default Search;
