import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginUser } from "../api/authApi.ts";
import AuthForm from "../components/AuthForm.tsx";
import { AUTH_FORM_FIELD_LABELS as fieldLabels } from "../configs/configs";
import useAuth from "../context/AuthContext.ts";
import { FormInput } from "../types/authTypes.ts";

const Login = () => {
  const fieldNames: Array<keyof typeof fieldLabels> = ["username", "password"];
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  function handleSubmit(formData: FormInput) {
    loginUser(formData)
      .then(() => {
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => toast.error(error.response.data));
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>Log in</h1>
        <AuthForm fieldNames={fieldNames} onFormSubmit={handleSubmit} />
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
