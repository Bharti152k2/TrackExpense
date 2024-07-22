import React from "react";

function Input({ type, placeholder, value, name, onchange, errMsg, option }) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onchange}
        options={option}
        required
      />
      {errMsg && (
        <small style={{ padding: "0px 0px 0px 5px", color: "red" }}>
          {errMsg}
        </small>
      )}
    </>
  );
}

export default Input;
