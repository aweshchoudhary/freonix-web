import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, signInWithGoogle } from "../store/auth/authSlice";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, success, error, data } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  function register() {
    dispatch(
      registerUser({
        email,
        password,
        displayName: fullName,
        phone: Number(9015077510),
      })
    );
  }
  function registerGoogle() {
    dispatch(signInWithGoogle());
  }

  useEffect(() => {
    if (data) setTimeout(() => navigate("/", { replace: true }), 1000);
  }, [data]);

  return (
    <div className="flex items-center justify-center md:p-10">
      <div className="lg:w-[40%] md:w-1/2 w-full shrink-0 md:p-10 p-5 sm:border">
        <header className="md:mb-10 mb-5">
          <h1 className="text-4xl font-semibold">Register</h1>
        </header>
        <main>
          <article>
            <section>
              <div className="mb-5 pb-5 border-b">
                <button
                  onClick={registerGoogle}
                  className="flex items-center gap-3 py-3 px-5 border w-full rounded-full"
                >
                  <Icon icon="logos:google-icon" className="text-3xl" />
                  Continue with google
                </button>
              </div>
              <form className="flex flex-col gap-4">
                <div>
                  {error && <p className="text-lg text-red-500">{error}</p>}
                  {success && (
                    <p className="text-lg text-green-500">
                      Register Successfully, Redirecting
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    disabled={loading}
                    autoComplete="off"
                    id="fullname"
                    name="fullname"
                    className="w-full py-3 px-5 border rounded-full"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    disabled={loading}
                    autoComplete="off"
                    id="email"
                    name="email"
                    className="w-full py-3 px-5 border rounded-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    disabled={loading}
                    autoComplete="off"
                    placeholder="Password"
                    id="password"
                    name="password"
                    className="w-full py-3 px-5 border rounded-full"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="w-full py-3 bg-primary rounded-full text-white"
                    onClick={register}
                  >
                    {loading ? "Loading..." : "Create Account"}
                  </button>
                </div>
              </form>
            </section>
          </article>
        </main>
        <footer className="mt-5">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
