"use client";
import { useRegisterMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";

export const SignInModal = ({ openModal, setOpenModal }) => {
  const [register] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");

    try {
      const response = await register({ email, phone, password }).unwrap();
      if (response?.success) {
        toast.success(response?.message, {
          duration: 4000,
          style: { background: "#FBBF24", color: "white" },
        });
      }
      console.log(response);
    } catch (err) {
      toast.error(err?.message || "Error submitting form", {
        duration: 4000,
        style: { background: "#F87171", color: "white" },
      });
    }
  };

  return (
    <div className="mx-auto flex w-72 items-center justify-center">
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${
          openModal ? "opacity-1 visible" : "invisible opacity-0"
        } inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute w-full rounded-lg bg-white drop-shadow-2xl sm:w-[500px] ${
            openModal
              ? "opacity-1 translate-y-0 duration-300"
              : "-translate-y-20 opacity-0 duration-150"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="px-5 pb-5 pt-3 lg:pb-10 lg:pt-5 lg:px-10"
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl backdrop-blur-sm font-semibold text-gray-800">
                Sign Up
              </h1>
              <button type="button" onClick={() => setOpenModal(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <label
                htmlFor="email_navigate_ui_modal"
                className="block text-sm"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="block w-full rounded-lg p-3 pl-3 text-sm outline-none drop-shadow-md bg-white"
                />
              </div>
              <label
                htmlFor="email_navigate_ui_modal"
                className="block text-sm"
              >
                Phone
              </label>
              <div className="relative">
                <input
                  type="phone"
                  name="phone"
                  placeholder="+88 017678521"
                  className="block w-full rounded-lg p-3 pl-3 text-sm outline-none drop-shadow-md bg-white"
                />
              </div>
              <label
                htmlFor="password_navigate_ui_modal"
                className="block text-sm"
              >
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="block w-full rounded-lg p-3 pl-3 outline-none text-sm drop-shadow-md bg-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="relative py-2.5 px-5 rounded-lg mt-6 bg-yellow-400 hover:bg-yellow-300 text-white drop-shadow-lg "
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
