import { useForm, SubmitHandler } from "react-hook-form";
import { AUTH_FORM_FIELD_LABELS as fieldLabels } from "../configs/configs";
import { User } from "../types/userTypes";

interface AuthFormProps {
  onFormSubmit: (formData: User) => void;
  fieldNames: Array<keyof typeof fieldLabels>;
}

const AuthForm = ({ onFormSubmit, fieldNames }: AuthFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>();
  const onSubmit: SubmitHandler<User> = onFormSubmit;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fieldNames.map((fieldName) => (
        <div key={fieldName}>
          <label htmlFor={fieldName}>{fieldLabels[fieldName]}</label>
          <input
            type={fieldName === "password" ? "password" : "text"}
            id={fieldName}
            placeholder={"Enter your " + fieldLabels[fieldName]}
            {...register(fieldName, { required: true, maxLength: 20 })}
            aria-invalid={errors[fieldName] ? "true" : "false"}
          />
          {errors[fieldName]?.type === "required" && (
            <p className="error">{fieldLabels[fieldName]} is required</p>
          )}
          {errors[fieldName]?.type === "maxLength" && (
            <p className="error">Limit of 20 characters is exceeded</p>
          )}
        </div>
      ))}
      <button className="blue-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
