import React, { useState } from "react";
import { FormContainer, Button, Input, FormBody } from "./LoginStyles";
import { useChatContext } from "../../context/ChatContext";

const Login: React.FC = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const { login } = useChatContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idInstance && apiTokenInstance) {
      login(idInstance, apiTokenInstance);
    }
  };
  return (
    <FormContainer>
      <h2>Вход в системе</h2>
      <FormBody onSubmit={handleSubmit}>
        <label>
          <span>ID Instance:</span> <br />
          <Input
            type="text"
            placeholder="Enter..."
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
          />
        </label>
        <label>
          <span>API Token Instance:</span> <br />
          <Input
            type="password"
            placeholder="API Token Instance"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
          />
        </label>
        <Button type="submit">Войти</Button>
      </FormBody>
    </FormContainer>
  );
};

export default Login;
