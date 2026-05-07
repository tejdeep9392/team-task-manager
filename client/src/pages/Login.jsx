import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (err) {

      alert(err.response.data.message);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">

      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10 w-96"
      >

        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-5 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-5 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-white text-pink-600 font-bold py-4 rounded-2xl hover:bg-pink-100 transition"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;