import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const navigate = useNavigate();

  function handleLogout() {
    axios
      .get(`${apiUrl}/auth/logout`, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((error) => toast.error(error.response.data));
  }
  function handleCheck() {
    axios
      .get(`${apiUrl}/`, { withCredentials: true })
      .then((response) => toast.success(response.data))
      .catch(() => toast.error("You dont't have access to the protected api"));
  }
  return (
    <div>
      <h1>Welcome to Messenger App</h1>
      <button onClick={handleLogout}>Log out</button>
      <button onClick={handleCheck}>Check secure connection</button>
    </div>
  );
};

export default Home;
