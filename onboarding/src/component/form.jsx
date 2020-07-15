import React, { useState } from "react";

function Form() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const changeHandler = (e) => {
    console.log("input changed");
    setForm({ name: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    console.log(form);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        name="name"
        value={form.name}
        onChange={changeHandler}
      ></input>

      <label htmlFor="email">
        Email:
        <input id="email" type="email" name="email"></input>
      </label>
      <label htmlFor="password">
        Password:
        <input id="password" type="password" name="password"></input>
      </label>
      <label htmlFor="terms" className="terms">
        {" "}
        Terms and Conditions
        <input type="checkbox" name="terms" checked></input>
      </label>
      <button>click me!</button>
    </form>
  );
}

export default Form;
