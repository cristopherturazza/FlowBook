import React, { FormEvent, useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password, name, lastname);
  };

  return (
    <div>
      <form
        className="flex flex-col items-center mt-32"
        onSubmit={handleSubmit}
      >
        <h3>Iscriviti a FlowBook</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label>Nome:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Cognome:</label>
        <input
          type="text"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
        <button>Iscriviti</button>
        {isLoading && <div> Loading.... </div>}
        {error && <div> Error </div>}
      </form>
    </div>
  );
};

export default Signup;
