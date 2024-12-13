import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth.tsx";
import Home from "./pages/Home.tsx";
import useAuth from "./context/AuthContext.ts";

function App() {
  const { loggedIn, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Auth signup={true} />} />
        <Route path="/login" element={<Auth signup={false} />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
