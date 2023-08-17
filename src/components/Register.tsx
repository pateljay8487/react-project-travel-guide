import axios from "axios";
import { SyntheticEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error,setError] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }
    
    axios
      .post(  "http://localhost:5500/api/register", formData)
      .then((res) => {
        console.log(res);
        if(res.data?.name ){

          const { name, email } = res.data;
          authContext.setUser({ name, email });
          navigate('/');
        }
        else{
          setError(res.data)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  
  return (
    <div className="mx-auto flex items-center justify-center h-screen p-10">
      <div className="mx-auto flex flex-col bg-white shadow-lg rounded-lg py-4 px-12">
        
        <span className="font-bold text-2xl text-center">Signup </span>
        <div className="mb-4 mt-4">
          <label className="block font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <span className=" text-red-600">{error}</span>
        </div>
        <div className="flex justify-center align-middle">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-red-500 hover:bg-red-400 text-white font-medium py-2 mt-4 px-4 rounded"
          >
            Sign Up
          </button>
          <a href="/" className=" decoration-gray-200 text-gray-500 text-xs mb-4 flex align-middle">
          
          Already Registered? Login
        </a>
        </div>
      </div>
    </div>
  );
}