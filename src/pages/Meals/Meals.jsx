import { Helmet } from "react-helmet-async";
import useAllMeal from "../../hooks/useAllMeal";
import Card from "./../../components/Home/Card";
import LoadingSpinner from "./../../components/Shared/LoadingSpinner";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const Meals = () => {
  const [meals, isLoading, ,] = useAllMeal();
  const [showMeals, setShowMeals] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const axiosCommon = useAxiosCommon();

  useEffect(() => {
    if (meals.length > 0) {
      setShowMeals(meals.slice(0, 6)); // Show first 10 meals initially
      setHasMore(true); // Reset hasMore when meals change
      setPage(1); // Reset page when meals change
    }
  }, [meals]);

  const fetchMoreMeals = () => {
    const newPage = page + 1;
    const newMeals = meals.slice((newPage - 1) * 10, newPage * 10);
    if (newMeals.length === 0) {
      setHasMore(false);
    } else {
      setShowMeals((prevMeals) => [...prevMeals, ...newMeals]);
      setPage(newPage);
    }
  };

  /* name search func */

  const handleMealNameSearch = async (e) => {
    e.preventDefault();
    const form = e.target;
    const mealName = form.mealName.value.trim();

    if (!mealName) {
      setError("Please enter a meal name");
      return;
    }

    try {
      const { data } = await axiosCommon.get(
        `${import.meta.env.VITE_API_URL}/searchMeal?mealName=${mealName}`
      );
      setShowMeals(data);
      setError(""); // Clear any previous errors
      setHasMore(false); // No more meals to load
    } catch (err) {
      console.log(err.response.data.message);
      setShowMeals(false);
      setError(err.response.data.message);
    } finally {
      form.reset(); // Reset the form
    }
  };

  /* category filter func */

  const handleMealCategoryFilter = async (e) => {
    const category = e.target.innerText;

    try {
      const { data } = await axiosCommon.get(
        `${import.meta.env.VITE_API_URL}/searchMeal?category=${category}`
      );
      if (data.length !== 0) {
        setShowMeals(data);
        setError("");
        setHasMore(false); // No more meals to load
      } else {
        setShowMeals([]);
        setError("No meal found with that category");
      }
    } catch (err) {
      setShowMeals([]);
      setError(err.message);
    }
  };

  /* price range search func */

  const handlePriceRangeSearch = async (e) => {
    e.preventDefault();
    const form = e.target;
    const priceFrom = form.priceRangeFrom.value;
    const priceTo = form.priceRangeTo.value;

    if (!priceFrom && !priceTo) {
      setError("Please enter a price range");
      return;
    }

    const params = new URLSearchParams();
    if (priceFrom) {
      params.append("priceFrom", priceFrom);
    }
    if (priceTo) {
      params.append("priceTo", priceTo);
    }

    try {
      const { data } = await axiosCommon.get(
        `${import.meta.env.VITE_API_URL}/searchMeal?${params.toString()}`
      );
      if (data.length !== 0) {
        setShowMeals(data);
        setError(""); // Clear any previous errors
        setHasMore(false); // No more meals to load
      } else {
        setShowMeals([]);
        setError("No meal found within the given price range");
      }
    } catch (err) {
      console.log(err.response.data.message);
      setShowMeals(false);
      setError(err.response.data.message);
    } finally {
      form.reset(); // Reset the form
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <Helmet>
        <title>Best Taste|All Meals</title>
      </Helmet>

      <h2 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] font-bold text-center mt-10">
        All Meals
      </h2>
      <div className="divider bg-[#8A2BE2] lg:h-1 h-[2px]"></div>

      <div className="flex flex-col">
        <div className="flex items-center justify-center w-full">
          {/* name search form */}
          <form
            onSubmit={handleMealNameSearch}
            className="flex-1 flex justify-end "
          >
            <label className="input border input-bordered rounded-r-none  flex items-center gap-2">
              <input
                name="mealName"
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
              className="btn bg-violet-950 text-white hover:bg-violet-800  rounded-l-none font-bold "
            />
          </form>
          {/* category filter dropdown */}
          <div className="dropdown  dropdown-bottom dropdown-end bg-inherit hover:bg-inherit border-0">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-inherit hover:bg-inherit border-0  m-1"
            >
              <button className="btn bg-violet-950 text-white hover:bg-violet-800 rounded-sm   font-bold ">
                Filter By Category
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content  z-[1000] menu p-0   bg-purple-800 border-2   rounded-none w-52"
            >
              <li
                onClick={handleMealCategoryFilter}
                className="font-bold p-2 border-b-2 cursor-pointer bg-purple-950 hover:bg-opacity-50 text-white "
              >
                Breakfast
              </li>

              <li
                onClick={handleMealCategoryFilter}
                className="font-bold p-2 cursor-pointer  bg-purple-950 hover:bg-opacity-50 border-b-2 text-white"
              >
                {" "}
                Lunch
              </li>
              <li
                onClick={handleMealCategoryFilter}
                className="font-bold p-2 cursor-pointer  bg-purple-950 hover:bg-opacity-50 border-b-2 text-white"
              >
                {" "}
                Dinner
              </li>
            </ul>
          </div>

          {/* price range search form */}
          <form onSubmit={handlePriceRangeSearch} className=" flex  ">
            <input
              type="submit"
              value="Filter by Price"
              className="btn bg-violet-950 text-white hover:bg-violet-800  rounded-r-none font-bold "
            />
            <label className="input border input-bordered rounded-l-none  flex items-center gap-2">
              <input
                name="priceRangeFrom"
                className=" border-r-4"
                type="number"
                placeholder="From"
              />
              <input name="priceRangeTo" type="number" placeholder="To" />
            </label>
          </form>
        </div>

        <div>
          {showMeals.length > 0 ? (
            <InfiniteScroll
              dataLength={showMeals.length}
              next={fetchMoreMeals}
              hasMore={hasMore}
              loader={<LoadingSpinner />}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No more meals to show</b>
                </p>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient-right p-5 rounded-2xl my-6">
                {showMeals.map((meal) => (
                  <Card key={meal._id} meal={meal}></Card>
                ))}
              </div>
            </InfiniteScroll>
          ) : error ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient-right p-5 rounded-2xl my-6">
              <p className="text-red-500 font-bold text-center w-full">
                {error}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient-right p-5 rounded-2xl my-6">
              {meals.map((meal) => (
                <Card key={meal._id} meal={meal}></Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meals;
