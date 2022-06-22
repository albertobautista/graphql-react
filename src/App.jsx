import logo from "./logo.svg";
import "./App.css";
import {
  LoginForm,
  Notify,
  PersonForm,
  Persons,
  PhoneForm,
} from "./components";
import { usePersons } from "./components/persons/custom-hooks";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";

function App() {
  // useEffect(() => {
  //   fetch("http://localhost:4000/persons", {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({
  //       query: `
  //     query {
  //       allPersons {
  //         id
  //         name
  //         phone
  //         address {
  //           city
  //         }
  //       }
  //     }`,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       // console.log(res.data);
  //     });
  // }, []);
  const { data, loading, error } = usePersons();
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem("phonenumbers-user-token")
  );
  const client = useApolloClient();

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (error) return <span style={{ color: "red" }}>{error}</span>;

  return (
    <div className="App">
      {errorMessage && <Notify errorMessage={errorMessage} />}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>GRAPHQL + React!</p>
        {loading ? <p>Loading...</p> : <Persons persons={data.allPersons} />}
        <hr />

        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <LoginForm notifyError={notifyError} setToken={setToken} />
        )}
        <PersonForm notifyError={notifyError} />
        <PhoneForm notifyError={notifyError} />
      </header>
    </div>
  );
}

export default App;
