import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useProvider } from "../contextAPI/context";

export default function Nav() {
  const {
    loggedUser: { user },
    setLoggedUser,
  } = useProvider();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("loggedUser"));
    if (id) {
      setLoggedUser(id);
    }
  }, [setLoggedUser]);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loginToken");
    toast.success("Log out Successfully");
    setLoggedUser({});
  };

  return (
    <nav>
      <div className="md:flex md:justify-between p-10 shad rounded-3xl items-center">
        <div>
          <p>
            Logged In User :{" "}
            <span
              className={`text-white px-2 py-1 rounded-3xl font-bold ${
                user?.email ? "bg-blue-600" : "bg-red-600"
              }`}
            >
              {user ? user?.email : "No User Logged In"}
            </span>
          </p>
        </div>
        {user?.email && (
          <h2 className="text-center my-5 font-[500]">
            <span className="bg-green-600 text-white ml-2 px-2 py-1 border rounded ">
              <Link to="/update"> Update Profile</Link>
            </span>
          </h2>
        )}
        <div>
          {user?.email ? (
            <button
              className="flex items-center gap-2 text-white bg-red-600 px-4 py-2 rounded-3xl my-5 sm:my-0"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <button className="px-5 py-2 bg-indigo-700 text-white font-bold rounded-lg my-5 sm:my-0">
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
