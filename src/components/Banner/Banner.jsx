import image from "../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div
      className="w-full bg-center bg-cover lg:h-[38rem] md:h-[30rem] h-[30rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#bc7fdd] lg:text-5xl">
            Your Home Away From Home
          </h1>
          <br />
          <p className="text-white lg:text-lg lg:font-semibold text-center px-8 md:px-0">
            Experience comfortable, affordable living designed for student's
            convenience and success.
          </p>
          <br />
          <div>
            <form className="flex justify-center ">
              <label className="input border input-bordered rounded-r-none  flex items-center gap-2">
                <input
                  name="foodName"
                  type="text"
                  className="grow"
                  placeholder="Search by name.."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <input
                type="submit"
                value="Search"
                className="btn bg-violet-950 text-white hover:bg-violet-800  rounded-l-none font-bold lg:text-lg"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
