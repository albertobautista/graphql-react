import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { EDIT_NUMBER } from "./persons/graphql-mutations";

export const PhoneForm = ({ notifyError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  const handleSubmit = (e) => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });
    setName("");
    setPhone("");
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      notifyError("Person Not Found");
    }
  }, [result.data]);

  return (
    <div>
      <h2>Edit Phone Number</h2>
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
        <button>CHANGE PHONE</button>
      </form>
    </div>
  );
};
