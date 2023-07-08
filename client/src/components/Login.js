import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useProvider } from "../contextAPI/context";

export default function Login() {
  const navigate = useNavigate();
  const { setLoggedUser } = useProvider();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("All fields are required");
      return;
    }

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("loginToken", data.token);
      localStorage.setItem("loggedUser", JSON.stringify(data.data));
      setLoggedUser(data.data);
      toast.success("Login Successfull navigating to home page");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(data.message);
      setError(data.message);
    }
  };

  return (
    <div className="mt-20">
      <Toaster />
      {error && (
        <h2 className="text-center text-red-500 font-[500]">{error}</h2>
      )}
      <h2 className="text-center my-5 font-[500]">
        Do not have an account ?
        <span className="bg-indigo-600 text-white ml-2 px-2 py-1 border rounded ">
          <Link to="/signup"> Register</Link>
        </span>
      </h2>

      <div className="flex justify-center items-center ">
        <form className="shad p-10 rounded-lg" onSubmit={handleLogin}>
          <input
            type="text"
            className="px-5 py-2 rounded bg-slate-300 placeholder-black"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            className="px-5 py-2 rounded bg-slate-300 my-5 placeholder-black"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="button"
            value="Login"
            className="px-5 py-2 rounded bg-indigo-700 hover:bg-indigo-800 text-white font-bold cursor-pointer "
            onClick={handleLogin}
          />
        </form>
      </div>
     
    </div>
  );
}
