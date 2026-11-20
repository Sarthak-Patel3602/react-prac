import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            id="firstname"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full rounded border p-2 outline-none focus:border-orange-600"
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full rounded border p-2 outline-none focus:border-orange-600"
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border p-2 outline-none focus:border-orange-600 mb-3"
          />
          <button
            type="submit"
            className="w-full rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
