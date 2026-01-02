"use client";
import { useUser } from "@/context/userContext";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Api } from "../API/Api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { isForm, setIsForm, isUser, setIsUser } = useUser();
  if (!isForm) return null;

  const handleSignup = async (e) => {
    e.preventDefault();
    const signup = {
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password,
    };

    const login = {
      email: loginForm.email,
      password: loginForm.password,
    };

    const payload = !isLogin ? signup : login;

    const endPoint = !isLogin ? "/user/register" : "/user/login";
    try {
      const res = await Api("post", endPoint, payload);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        setIsUser(true);
        setIsForm(false);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className=" backdrop-blur-sm h-full mx-auto px-4 sm:px-6 md:px-8 mb-10 fixed inset-0   flex justify-center items-center z-50">
      <form onSubmit={(e) => handleSignup(e)}>
        <div className="bg-gray-50 max-w-md mx-auto p-4 rounded shadow-lg relative  w-full ">
          <X
            onClick={() => setIsForm(false)}
            className="absolute right-2 top-2 cursor-pointer"
          />
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 text-center pt-5">
            User{" "}
            <span className="text-primary">
              {isLogin ? "Login" : "Sign Up"}
            </span>
          </p>

          {/* Login */}
          {isLogin && (
            <div className="md:px-8 pb-5 flex flex-col gap-5">
              <div>
                <label htmlFor="" className="text-gray-600 text-base ">
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="border border-primary mt-1 p-2 focus:outline-none   w-full"
                />
              </div>
              <div>
                <label htmlFor="" className="text-gray-600 text-base ">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="border border-primary mt-1 p-2 focus:outline-none   w-full"
                />
              </div>
            </div>
          )}

          {/* Sign up */}
          {!isLogin && (
            <div className="md:p-8 flex flex-col gap-5">
              <div>
                <label htmlFor="" className="text-gray-600 text-base ">
                  Name
                </label>
                <input
                  type="text"
                  value={signupForm?.name}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="border border-primary mt-1 p-2 focus:outline-none   w-full"
                />
              </div>
              <div>
                <label htmlFor="" className="text-gray-600 text-base ">
                  Email
                </label>
                <input
                  type="email"
                  value={signupForm?.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="border border-primary mt-1 p-2 focus:outline-none   w-full"
                />
              </div>
              <div>
                <label htmlFor="" className="text-gray-600 text-base ">
                  Password
                </label>
                <input
                  type="password"
                  value={signupForm?.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="border border-primary mt-1 p-2 focus:outline-none   w-full"
                />
              </div>
            </div>
          )}
          <div className="md:px-8 pb-5">
            <p>
              {isLogin ? "Create an account" : "Already have account?"}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-base text-primary cursor-pointer hover:underline"
              >
                click here
              </span>
            </p>
            {/* button */}
            <button
              type="submit"
              className="bg-primary text-white w-full p-2 cursor-pointer mt-5"
            >
              {isLogin ? "Login" : "Create account"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
