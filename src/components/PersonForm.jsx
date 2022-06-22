import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_PERSON } from "./persons/graphql-mutations";
import { ALL_PERSONS } from "./persons/graphql-queries";

export const PersonForm = ({ notifyError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    // refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_PERSONS });
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allPersons, response.data.addPerson],
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPerson({ variables: { name, phone, street, city } });
    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>
        Create new <b>Person</b>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Street"
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button>Create</button>
      </form>
    </div>
  );
};
