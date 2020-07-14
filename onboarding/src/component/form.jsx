import React, { useState } from "react";

function Form() {
  const [form, setForm] = useState({ name: "" });

  const changeHandler = (e) => {
    console.log("input changed");
    setForm({ name: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={changeHandler}
      ></input>
      <button>click me!</button>
    </form>
  );
}

export default Form;
