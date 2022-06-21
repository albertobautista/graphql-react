import React from "react";

export const Notify = ({ errorMessage }) => {
  return (
    <div
      style={{
        color: "red",
        position: "fixed",
        top: 0,
        width: "100%",
        fontSize: 50,
      }}>
      {errorMessage}
    </div>
  );
};
