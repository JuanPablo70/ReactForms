import "./App.css";
import { registerUser } from "./services/registerUser";
import { useForm } from "react-hook-form";

export function App() {

  const {
    register, 
    handleSubmit, 
    watch, 
    formState: { errors, isValid }} = useForm({
      mode: "onChange", 
      defaultValues: {
        email: "", 
        name: "", 
        age: undefined, 
        password: "", 
        passwordCheck: "", 
        box: undefined
      }
    });

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email
            <input {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "email is invalid",
              }
            })} type="email" placeholder="Email" />
          </label>
          <span className="error" role="alert">{errors.email?.message}</span>
        </div>
        <div>
          <label>Name
            <input {...register("name", {
              required: "name is required"
            })} type="text" placeholder="Name" />
          </label>
          <span className="error" role="alert">{errors.name?.message}</span>
        </div>
        <div>
          <label>Age
            <input {...register("age", {
              required: "age is required",
              min: {
                value: 18,
                message: "you must be above 18 to register"
              }
            })} type="number" placeholder="Age" />
          </label>
          <span className="error" role="alert">{errors.age?.message}</span>
        </div>
        <div>
          <label>Password
            <input {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "password is too short"
              }
            })} type="password" placeholder="Password" />
          <span className="error" role="alert">{errors.password?.message}</span>
          </label>
        </div>
        <div>
          <label>Password check
            <input {...register("passwordCheck", {
              required: "password is required", 
              validate: (value) => value === watch("password") || "passwords do not match"
            })} type="password" placeholder="Password check" />
          </label>
          <span className="error" role="alert">{errors.passwordCheck?.message}</span>
        </div>
        <div>
          <label>
            <input {...register("box", {
              required: "please read and accept the terms and conditions"
            })} type="checkbox" />
            Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque pharetra, tortor ac placerat
            elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
            Suspendisse non neque et neque facilisis convallis. Praesent erat
            magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
            Vestibulum congue neque metus.
          </label>
          <span className="error" role="alert">{errors.box?.message}</span>
        </div>
        <button type="submit" disabled={!isValid}>Sign up</button>
      </form>
    </div>
  );
}
