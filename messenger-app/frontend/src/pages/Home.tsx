import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { logoutUser } from "../api/authApi";
import useAuth from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  function handleLogout() {
    logoutUser()
      .then(() => {
        setLoggedIn(false);
        navigate("/login");
      })
      .catch((error) => toast.error(error.response.data));
  }
  return (
    <div>
      <h1>Welcome to Messenger App</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Home;
