import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  password: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    setSubmitted(true);
    setFormData(initialFormData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-212.5 mx-auto my-4 space-y-4 rounded-lg border p-6"
    >
      <h2 className="text-2xl font-bold">Contact Form</h2>

      <div>
        <label htmlFor="name" className="mb-1 block font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          autoComplete="name"
          required
          className="w-full rounded border p-2 outline-none focus:border-orange-600"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="email"
          required
          className="w-full rounded border p-2 outline-none focus:border-orange-600"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full rounded border p-2 outline-none focus:border-orange-600"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
      >
        Submit
      </button>

      {submitted && (
        <p role="status" className="text-green-600">
          Form submitted successfully!
        </p>
      )}
    </form>
  );
};

export default ContactForm;
