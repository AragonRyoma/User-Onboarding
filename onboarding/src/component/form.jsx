import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

//basic Schema layout
const formSchema = yup.object().shape({
  name: yup.string().required("Please insert Name."),
  email: yup.string().email().required("it can be fake."),
  password: yup.string().required("Just make it up"),
  terms: yup.boolean().oneOf([true], "Please click me"),
});

function Form() {
  //state for the forms
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });
  // state for my errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  //state for button
  const [buttonValue, setButtonValue] = useState(true);

  //postrequest state
  const [post, setPost] = useState([]);

  //useeffect for buttonusage
  useEffect(() => {
    formSchema.isValid(form).then((valid) => {
      setButtonValue(!valid);
    });
  }, [form]);

  //using reach will allow to test certain parts based on names
  const validateChange = (e) => {
    //how it finds what its looking for
    yup
      .reach(formSchema, e.target.name)
      //what its looking for
      .validate(e.target.value)
      //using the errors
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  //handles the changes of my form
  const changeHandler = (e) => {
    e.persist();
    const newFormData = {
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e);
    setForm(newFormData);
  };

  //does something when I submit information
  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", form)
      .then((response) => {
        setPost(response.data);
        console.log("success", post);

        setForm({
          name: "",
          email: "",
          password: "",
          terms: "",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name:
        {errors.name.length > 0 ? (
          <p className="error">{errors.name} </p>
        ) : null}
      </label>
      <input
        id="name"
        type="text"
        name="name"
        value={form.name}
        onChange={changeHandler}
      ></input>

      <label htmlFor="email">
        Email:
        {errors.email.length > 0 ? (
          <p className="error">{errors.email} </p>
        ) : null}
        <input
          value={form.email}
          id="email"
          type="email"
          name="email"
          onChange={changeHandler}
        ></input>
      </label>
      <label htmlFor="password">
        Password:
        {errors.password.length > 0 ? (
          <p className="error">{errors.password} </p>
        ) : null}
        <input
          value={form.password}
          id="password"
          type="password"
          name="password"
          onChange={changeHandler}
        ></input>
      </label>
      <label htmlFor="terms" className="terms">
        Terms and Conditions
        <input
          type="checkbox"
          name="terms"
          checked={form.terms}
          onChange={changeHandler}
        ></input>
      </label>
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={buttonValue}>click me!</button>
    </form>
  );
}

export default Form;
