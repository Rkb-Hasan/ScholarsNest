import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "./../../hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload } from "../../api/utils";
import { useForm } from "react-hook-form";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    createUser,
    signInWithGoogle,
    // updateUserProfile,
    loading,
    setLoading,
    saveUser,
  } = useAuth();

  // handle sign-up
  const onSubmit = async (data) => {
    // e.preventDefault();
    // const form = e.target;
    // const name = form.name.value;
    // const email = form.email.value;
    // const password = form.password.value;
    // const image = form.image.files[0];
    const { email, password, name, image } = data;
    // console.log(name);
    // console.log(image[0]);
    try {
      setLoading(true);
      // upload image and get url
      const image_url = await imageUpload(image[0]);
      // img_url returned from imgbb
      // console.log(image_url);
      // sign-up
      await createUser(email, password, name, image_url);

      // update-user-profile
      // await updateUserProfile(name, image_url);

      //navigate to home or state and show toast

      navigate(from);
      // window.location.reload();
      toast.success("Sign-up successful");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  // handle google-sign-in
  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithGoogle();
      console.log(userCredential);
      // Get the signed-in user
      const user = userCredential.user;
      await saveUser(user);
      //navigate to home or state and show toast
      // console.log(`${data} from signupgoogle`);
      navigate(from);
      toast.success("Sign-up successful");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to ScholarsNest</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                {...register("password", {
                  required: true,
                  maxLength: 10,
                  minLength: 6,
                  pattern:
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+/,
                })}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500 ">This field is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500 ">
                  Password must be 6 letters long
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-500 ">
                  Password can not be more than 10 letters{" "}
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500 ">
                  Password must have one Uppercase,one lowercase and one special
                  character{" "}
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          disabled={loading}
          type="submit"
          onClick={handleGoogleSignIn}
          className="disabled:cursor-not-allowed cursor-pointer flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded "
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
