import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { signupUser } from "../api/authApi.ts";
import AuthForm from "../components/AuthForm.tsx";
import { AUTH_FORM_FIELD_LABELS as fieldLabels } from "../configs/configs";
import { FormInput } from "../types/authTypes.ts";

const Signup = () => {
  const fieldNames: Array<keyof typeof fieldLabels> = ["firstName", "lastName", "username", "password"];
  const navigate = useNavigate();

  function handleSubmit(formData: FormInput) {
    signupUser(formData)
      .then(() => {
        toast.success("Account created successfully");
        navigate("/login");
      })
      .catch((error) => toast.error(error.response.data));
  }

  return (
    <div className="container">
      <div className="form-container">
        <h1>Sign up</h1>
        <AuthForm fieldNames={fieldNames} onFormSubmit={handleSubmit} />
        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
