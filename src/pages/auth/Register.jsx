import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { register } from "../../store/slices/userSlice";

const Register = () => {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    console.log("Signup submitted:", formData);
  };

  return (
    <div className="min-h-screen my bg-[#020B1C] flex items-center justify-center px-4">
      <div className="max-w-md my-10 w-full space-y-8">
        <div className="flex justify-center">
          <img src={logo} alt="" className="w-30" />
        </div>

        <div className="bg-[#0A1A3B] rounded-xl p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-400">Join WebScanner to get started</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-1 block w-full rounded-lg bg-[#1A2C4E] border border-gray-600 text-white px-4 py-3 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-lg bg-[#1A2C4E] border border-gray-600 text-white px-4 py-3 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full rounded-lg bg-[#1A2C4E] border border-gray-600 text-white px-4 py-3 pr-10 focus:ring-cyan-400 focus:border-cyan-400"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full rounded-lg bg-[#1A2C4E] border border-gray-600 text-white px-4 py-3 focus:ring-cyan-400 focus:border-cyan-400"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-600 bg-[#1A2C4E] text-cyan-400 focus:ring-cyan-400"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-300"
              >
                I agree to the{" "}
                <button className="text-cyan-400 hover:text-cyan-300">
                  Terms
                </button>{" "}
                and{" "}
                <button className="text-cyan-400 hover:text-cyan-300">
                  Privacy Policy
                </button>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
            >
              Create Account
            </button>
          </form>

          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 text-sm"
            >
              Already have an account? Sign in{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
