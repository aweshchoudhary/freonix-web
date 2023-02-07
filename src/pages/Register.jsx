import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        const user = credential.user;
        console.log(user);
      })
      .catch((err) => {
        const errMessage = err.message;
        setError(errMessage);
      });
  };
  const registerGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(credential, token, user);
      })
      .catch((err) => {
        const errMessage = err.message;
        const email = err.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(err);
        console.table(errMessage, email, credential);
      });
  };

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
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
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
                    id="email"
                    name="email"
                    className="w-full py-3 px-5 border rounded-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
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
                    Create Account
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
