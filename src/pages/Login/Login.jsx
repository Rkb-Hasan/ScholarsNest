import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "./../../hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
// import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const {
    signInWithGoogle,
    loading,
    signIn,
    setLoading,
    // resetPassword,
    saveUser,
  } = useAuth();
  // const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // handle sign-in
  const onSubmit = async (userData) => {
    const { email, password } = userData;
    try {
      await signIn(email, password);

      reset();
      //navigate to home or state and show toast
      navigate(from);
      toast.success("Sign-in successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
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
      window.location.reload();

      toast.success("Sign-in successful");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                // onBlur={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">This field is required!</span>
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
                autoComplete="current-password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500">This field is required!</span>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-rose-500 w-full cursor-pointer disabled:cursor-not-allowed rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Sign-in"
              )}
            </button>
          </div>
        </form>
        {/* <div className="space-y-1">
          <button
            onClick={handleResetPassword}
            className="text-xs hover:underline hover:text-rose-500 text-gray-400"
          >
            Forgot password?
          </button>
        </div> */}
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
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
