import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../context/AuthContext.ts";

const apiUrl = import.meta.env.VITE_API_URL;

interface Errors {
  [index: string]: boolean;
};

const Auth = ({ signup }: { signup: boolean }) => {
  const fieldNames: Array<keyof typeof fieldLabels> = signup
    ? ["firstName", "lastName", "username", "password"]
    : ["username", "password"];
  const fieldLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    username: "Username",
    password: "Password",
  };
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let hasErrors = false;
    const newErrors = { ...errors };
    for (const pair of formData.entries()) {
      if (pair[1] === "") {
        hasErrors = true;
        newErrors[pair[0]] = true;
      }
    }
    setErrors(newErrors);

    if (!hasErrors) {
      axios
        .post(`${apiUrl}/auth/${signup ? "signup" : "login"}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
        .then(() => {
          setLoggedIn(true);
          navigate(signup ? "/login" : "/");
        })
        .catch((error) => toast.error(error.response.data));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newErrors = { ...errors };
    newErrors[event.target.name] = false;
    setErrors(newErrors);
  };
  return (
    <div className="container">
      <div className="form-container">
        <h1>{signup ? "Sign up" : "Log in"}</h1>
        <form onSubmit={handleSubmit}>
          {fieldNames.map((fieldName) => (
            <div key={fieldName}>
              <label htmlFor={fieldName}>{fieldLabels[fieldName]}</label>
              <input
                type={fieldName === "password" ? "password" : "text"}
                name={fieldName}
                id={fieldName}
                placeholder={"Enter your " + fieldLabels[fieldName]}
                onChange={handleChange}
              />
              {errors[fieldName] ? (
                <p className="error">{fieldLabels[fieldName]} is required</p>
              ) : (
                ""
              )}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to={signup ? "/login" : "/signup"}>
            {signup ? "Log in" : "Sign up"} here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
