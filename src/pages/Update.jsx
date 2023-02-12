import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../store/userSlice";
import Loading from "../components/Loading";
import { Icon } from "@iconify/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

function Update() {
  const userid = useSelector((state) => state.auth.userid);
  const { data, loading, error, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState({
    displayName: false,
    email: false,
    username: false,
    description: false,
    location: false,
  });
  const [updateFields, setUpdateFields] = useState({});

  function updateFieldsInfo(e) {
    if (e.target.value !== "") {
      setUpdateFields((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    } else {
      setUpdateFields((prev) => {
        delete prev[e.target.name];
        return {
          ...prev,
        };
      });
    }
  }
  function openUpdateInput(name) {
    setIsOpen((prev) => {
      return {
        ...prev,
        [name]: true,
      };
    });
  }
  function closeUpdateInput(name) {
    setIsOpen((prev) => {
      return {
        ...prev,
        [name]: false,
      };
    });
    setUpdateFields((prev) => {
      delete prev[name];
      return {
        ...prev,
      };
    });
  }
  async function postUpdate(name) {
    const userRef = doc(db, "users", userid);
    dispatch(
      updateUser({
        userRef,
        updateData: {
          [name]: updateFields[name],
        },
      })
    );
    if (success) {
      toast.success(
        `${name === "displayName" ? "Full Name" : name} has been updated`
      );
      dispatch(getUserById(userid));
    }
    if (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    dispatch(getUserById(userid));
  }, [userid]);

  const inputGroupStyle = "border-collapse border-b py-3";
  const labelStyle = "text-xl flex items-center justify-between";
  const inputContainerStyle = "flex items-center gap-3 mt-3";

  return !loading && data && !error ? (
    <section className="md:p-5 p-3">
      <header className="mb-5">
        <h1 className="text-3xl font-medium">Update</h1>
      </header>
      <form>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            Name: {data.displayName}{" "}
            <button
              onClick={() => openUpdateInput("displayName")}
              className="text-primary text-base uppercase"
              type="button"
            >
              update
            </button>
          </label>
          {isOpen.displayName && (
            <div className={inputContainerStyle}>
              <input
                type="text"
                name="displayName"
                id="displayName"
                placeholder="Update Name"
                className="p-3 border w-full"
                onChange={(e) => updateFieldsInfo(e)}
              />
              <button onClick={() => postUpdate("displayName")} type="button">
                <Icon icon="mdi:tick" className="text-3xl text-primary" />
              </button>
              <button
                onClick={() => closeUpdateInput("displayName")}
                type="button"
              >
                <Icon icon="uil:times" className="text-3xl text-red-500" />
              </button>
            </div>
          )}
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            {data.username || "Create A Username"}
            <button
              onClick={() => openUpdateInput("username")}
              className="text-primary text-base uppercase"
              type="button"
            >
              {data.username ? "update" : "Create"}
            </button>
          </label>
          {isOpen.username && (
            <div className={inputContainerStyle}>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Update Username"
                className="p-3 border w-full"
                onChange={(e) => updateFieldsInfo(e)}
              />
              <button onClick={() => postUpdate("username")} type="button">
                <Icon icon="mdi:tick" className="text-3xl text-primary" />
              </button>
              <button
                onClick={() => closeUpdateInput("username")}
                type="button"
              >
                <Icon icon="uil:times" className="text-3xl text-red-500" />
              </button>
            </div>
          )}
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            {data.email}
            <button
              onClick={() => openUpdateInput("email")}
              className="text-primary text-base uppercase"
              type="button"
            >
              Update
            </button>
          </label>
          {isOpen.email && (
            <div className={inputContainerStyle}>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Update Email"
                className="p-3 border w-full"
                onChange={(e) => updateFieldsInfo(e)}
              />
              <button onClick={() => postUpdate("email")} type="button">
                <Icon icon="mdi:tick" className="text-3xl text-primary" />
              </button>
              <button onClick={() => closeUpdateInput("email")} type="button">
                <Icon icon="uil:times" className="text-3xl text-red-500" />
              </button>
            </div>
          )}
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            {data.description
              ? "Update Your Description"
              : "Create A Description"}
            <button
              onClick={() => openUpdateInput("description")}
              className="text-primary text-base uppercase"
              type="button"
            >
              {data.description ? "Update" : "Create"}
            </button>
          </label>
          {isOpen.description && (
            <div className={inputContainerStyle}>
              <textarea
                name="description"
                id="description"
                placeholder="Update Description"
                className="p-3 border w-full"
                onChange={(e) => updateFieldsInfo(e)}
              />
              <button onClick={() => postUpdate("description")} type="button">
                <Icon icon="mdi:tick" className="text-3xl text-primary" />
              </button>
              <button
                onClick={() => closeUpdateInput("description")}
                type="button"
              >
                <Icon icon="uil:times" className="text-3xl text-red-500" />
              </button>
            </div>
          )}
        </div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>
            {data.location || "Update Your Location"}
            <button
              onClick={() => openUpdateInput("location")}
              className="text-primary text-base uppercase"
              type="button"
            >
              Update
            </button>
          </label>
          {isOpen.location && (
            <div className={inputContainerStyle}>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Update Location ex: Mumbai, India"
                className="p-3 border w-full"
                onChange={(e) => updateFieldsInfo(e)}
              />
              <button onClick={() => postUpdate("location")} type="button">
                <Icon icon="mdi:tick" className="text-3xl text-primary" />
              </button>
              <button
                onClick={() => closeUpdateInput("location")}
                type="button"
              >
                <Icon icon="uil:times" className="text-3xl text-red-500" />
              </button>
            </div>
          )}
        </div>
      </form>
    </section>
  ) : (
    <Loading />
  );
}

export default Update;
