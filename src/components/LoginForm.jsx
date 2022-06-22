import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "./login/graphql-mutations";

export const LoginForm = ({ notifyError, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          password{" "}
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
