"use client";
import { Api } from "@/components/API/Api";
import { useUser } from "@/context/userContext";
import { useState } from "react";
import toast from "react-hot-toast";

function page() {
  const { isLoading, setIsLoading } = useUser();
  const [message, setMessage] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendMessage = async (e) => {
    e.preventDefault();
    const payload = {
      name: message.name,
      email: message?.email,
      message: message?.message,
    };
    try {
      setIsLoading(true);
      const res = await Api("post", "/contact/sent/message", payload);
      if (res?.success) {
        setIsLoading(false);
        toast.success(res?.message);
        setMessage({
          name: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(res?.message);
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20">
      <form
        onSubmit={sendMessage}
        className="flex flex-col items-center text-sm"
      >
        <p className="text-lg text-primary font-medium pb-2">Contact Us</p>
        <h1 className="sm:text-4xl text-2xl font-semibold text-slate-700 pb-4">
          Get in touch <span className="text-primary">with us</span>
        </h1>
        <p className="text-sm text-gray-500 text-center pb-10">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
          <br />
          Lorem Ipsum has been the industry's standard dummy text.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
          <div className="w-full">
            <label className="text-black/70" htmlFor="name">
              Your Name
            </label>
            <input
              className="h-12 p-2 mt-2 w-full border border-primary rounded outline-none focus:border-indigo-300"
              type="text"
              required
              value={message?.name}
              onChange={(e) => setMessage({ ...message, name: e.target.value })}
            />
          </div>
          <div className="w-full">
            <label className="text-black/70" htmlFor="name">
              Your Email
            </label>
            <input
              className="h-12 p-2 mt-2 w-full border border-primary rounded outline-none focus:border-indigo-300"
              type="email"
              required
              value={message?.email}
              onChange={(e) =>
                setMessage({ ...message, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-6 w-[350px] md:w-[700px]">
          <label className="text-black/70" htmlFor="name">
            Message
          </label>
          <textarea
            className="w-full mt-2 p-2 h-40 border border-primary rounded resize-none outline-none focus:border-indigo-300"
            required
            value={message?.message}
            onChange={(e) =>
              setMessage({ ...message, message: e.target.value })
            }
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-5 bg-primary cursor-pointer text-white h-12 w-56 px-4 rounded active:scale-95 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default page;
