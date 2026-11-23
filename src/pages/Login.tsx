import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Demo credentials only
    if (email === "admin@example.com" && password === "123456") {
      Cookies.set("authToken", "demo-token", {
        expires: 1,
        path: "/",
        sameSite: "strict",
        secure: import.meta.env.PROD,
      });

      navigate("/", { replace: true });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-[500px] mx-auto my-auto">
      <h2 className="text-4xl text-center my-5">Login</h2>
      <form
        onSubmit={handleLogin}
        className="max-w-212.5 mx-auto my-4 space-y-4 rounded-lg border p-6"
      >
        <div className="">
          <label htmlFor="email" className="mb-1 block font-medium">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2 outline-none focus:border-orange-600"
            required
          />
        </div>
        <div className="">
          <label htmlFor="password" className="mb-1 block font-medium">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2 outline-none focus:border-orange-600"
            required
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
        >
          Login
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
