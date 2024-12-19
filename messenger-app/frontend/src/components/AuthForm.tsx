import { useForm, SubmitHandler } from "react-hook-form";
import { AUTH_FORM_FIELD_LABELS as fieldLabels } from "../configs/configs";
import { FormInput } from "../types/authTypes";

interface AuthFormProps {
  onFormSubmit: (formData: FormInput) => void;
  fieldNames: Array<keyof typeof fieldLabels>;
}

const AuthForm = ({ onFormSubmit, fieldNames }: AuthFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = onFormSubmit;

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
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AuthForm;
