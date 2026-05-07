import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member"
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

      await API.post(
        "/auth/signup",
        formData
      );

      navigate("/login");

    } catch (err) {

      alert(err.response.data.message);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">

      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10 w-96"
      >

        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-4 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-4 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-4 outline-none"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-4 rounded-2xl mb-5"
        >
          <option value="Member">
            Member
          </option>

          <option value="Admin">
            Admin
          </option>

        </select>

        <button
          type="submit"
          className="w-full bg-white text-purple-600 font-bold py-4 rounded-2xl hover:bg-purple-100 transition"
        >
          Signup
        </button>

      </form>

    </div>
  );
}

export default Signup;