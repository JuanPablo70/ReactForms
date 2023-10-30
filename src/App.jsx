import { useState } from "react";

function App() {

  // save the user credentials in the component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // saves an object with the validations of each field in the form
  const [formValidation, setFormValidation] = useState({
    email: undefined,
    password: undefined,
    passwordCheck: undefined
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // prevents the browser from performing its default action (reloading the page)
    alert("Send data to register");
  };

  const handleEmailChange = (event) => {
    const value = event.target.value; // gets the email value in the form

    setFormValidation({
      // gets a copy of the 'formValidation' value and modifies the 'email' key according to the validations
      ...formValidation,
      email: (value.length === 0 || !value.includes("@") || !value.includes(".com")) ? "Not valid email" : "",
    });

    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value; // gets the password value in the form

    setFormValidation({
      // gets a copy of the 'formValidation' value and modifies the 'password' key according to the validations
      ...formValidation,
      password: value.length < 8 ? "Invalid password" : "",
    });

    setPassword(value);
  };

  const handlePasswordCheckChange = (event) => {
    const value = event.target.value; // gets the password check value in the form

    setFormValidation({
      // gets a copy of the 'formValidation' value and modifies the 'passwordCheck' key according to the validations
      ...formValidation,
      passwordCheck: value !== password ? "Passwords do not match" : "",
    });

    setPasswordCheck(value);
  };

  //console.log({formValidation});

  // enables the 'Sign Up' button whether the 'formValidation' keys are empty
  const isValid = Object.keys(formValidation).every(key => formValidation[key] === "");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={handleEmailChange} placeholder="Email" type="email"/>
          {formValidation.email && (<span style={{color: 'red'}}>{formValidation.email}</span>)}
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={handlePasswordChange} placeholder="Password" type="password"/>
          {formValidation.password && (<span style={{color: 'red'}}>{formValidation.password}</span>)}
        </div>
        <div>
          <label>Password Check</label>
          <input value={passwordCheck} onChange={handlePasswordCheckChange} placeholder="Password Check" type="password"/>
          {formValidation.passwordCheck && (<span style={{color: 'red'}}>{formValidation.passwordCheck}</span>)}
        </div>
        <button disabled={!isValid}>Sign Up</button>
      </form>
    </div>
  );
}

export default App;
