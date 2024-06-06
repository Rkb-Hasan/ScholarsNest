import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAuth from "./../../hooks/useAuth";
import { imageUpload } from "../../api/utils";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useSingleMeal from "../../hooks/useSingleMeal";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";
// import useSingleMeal from "../../hooks/useSingleMeal";
// import LoadingSpinner from "./../Shared/LoadingSpinner";

const UpdateMealForm = ({ mealToUpdate }) => {
  const { _id } = mealToUpdate;
  //   console.log(id);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const { user } = useAuth();
  const { displayName, email } = user;
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const [meal, isLoading, refetch] = useSingleMeal(_id);
  //   console.log(meal);
  const { mutateAsync } = useMutation({
    mutationFn: async (meal) => {
      try {
        const { data } = await axiosSecure.put(`/saveMeal`, meal);
        return data;
      } catch (error) {
        // if (error.response) {
        //   // Axios error with response
        //   throw new Error(
        //     `Error ${error.response.status}: ${error.response.statusText}`
        //   );
        // } else {
        //   // Other errors
        //   throw new Error(error.message);
        // }
        console.log(error);
      }
    },
    onSuccess: (data) => {
      refetch();
      console.log(data);
      navigate(from);
      toast.success("Meal Updated");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update meal: " + error.message);
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const {
      meal_name,
      category,
      image,
      price,
      rating,
      ingredients,
      description,
      adminEmail,
      adminName,
    } = data;

    try {
      const meal_image = await imageUpload(image[0]);
      console.log(meal_image);
      const updatedMeal = {
        _id,
        meal_name,
        category,
        meal_image,
        price,
        rating,
        ingredients,
        description,
        adminEmail,
        adminName,
        updateRequest: true,
      };
      console.log(updatedMeal);
      await mutateAsync(updatedMeal);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <Helmet>
        <title>Best Taste|Update Meal</title>
      </Helmet>
      <h3 className=" text-3xl text-[#8A2BE2] font-bold text-center">
        Update Meal
      </h3>
      <div className="divider bg-[#8A2BE2]  h-[2px]"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 bg-violet-500 border-purple-900 rounded-2xl mx-auto lg:p-10 p-5 "
      >
        <div className="grid  mb-4">
          {/* ---------------------------- */}
          <div className="space-y-4">
            <div className="space-y-3">
              <label htmlFor="meal_name" className=" text-lg font-bold ">
                Meal Title
              </label>
              <br />
              <input
                type="text"
                name="meal_name"
                defaultValue={meal?.meal_name}
                placeholder="Meal Title.."
                className=" border-2 focus:ring  p-2 rounded-lg w-full "
                {...register("meal_name", { required: true })}
              />
              {errors.meal_name && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>

            <div className="space-y-3">
              <label htmlFor="category" className=" text-lg font-bold ">
                Category
              </label>
              <br />
              <select
                name="category"
                className=" border-2 focus:ring p-2 rounded-lg w-full "
                {...register("category", { required: true })}
                defaultValue={meal?.category}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              {errors.category && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
            <div className="space-y-3">
              <label htmlFor="description" className=" text-lg font-bold ">
                Description
              </label>
              <br />
              <input
                type="text"
                name="description"
                defaultValue={meal?.description}
                placeholder="Description.."
                className=" border-2 focus:ring  p-2 rounded-lg w-full "
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
            <div className="space-y-3">
              <label htmlFor="ingredients" className=" text-lg font-bold ">
                Ingredients
              </label>
              <br />
              <input
                type="text"
                name="ingredients"
                defaultValue={meal?.ingredients}
                placeholder="Ingredients.."
                className=" border-2 focus:ring  p-2 rounded-lg w-full "
                {...register("ingredients", { required: true })}
              />
              {errors.ingredients && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
          </div>

          {/* --------------------------- */}

          <div className="space-y-4 mt-2">
            <div className="space-y-3">
              <label htmlFor="image" className=" text-lg font-bold ">
                Select Image:
              </label>
              <br />
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

            <div className="space-y-3">
              <label htmlFor="price" className=" text-lg font-bold ">
                Price
              </label>
              <br />
              <input
                type="number"
                name="price"
                min={1}
                defaultValue={meal?.price}
                placeholder="Price.."
                className=" border-2 focus:ring  p-2 rounded-lg w-full "
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>

            <div className="space-y-3">
              <label htmlFor="rating" className=" text-lg font-bold ">
                Rating
              </label>
              <br />
              <input
                type="number"
                name="rating"
                min={0}
                max={5}
                defaultValue={meal?.rating}
                placeholder="Rating.."
                className=" border-2 focus:ring  p-2 rounded-lg w-full "
                {...register("rating", { required: true })}
              />
              {errors.rating && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
          </div>
        </div>

        {/* ------------------------ */}

        <div className="mb-8 p-2 border bg-violet-700 rounded-2xl">
          <p className=" text-lg font-bold  m-2  text-black  text-opacity-70 text-center">
            Admin Info
          </p>
          <div className="divider m-0 mb-2 bg-slate-100 h-[1px]"></div>
          <div className="space-y-3 ">
            <div>
              <div>
                <label htmlFor="adminName" className=" text-lg font-bold ">
                  Admin Name
                </label>
                <input
                  type="text"
                  name="adminName"
                  value={displayName}
                  placeholder="Admin Name.."
                  className=" border-2 focus:ring  p-2 rounded-lg w-full mb-4 "
                  {...register("adminName", { required: true })}
                />
                {errors.adminName && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
              <div>
                <label htmlFor="adminEmail" className=" text-lg font-bold ">
                  Admin Email
                </label>
                <input
                  type="email"
                  name="adminEmail"
                  placeholder="Admin Email.."
                  value={email}
                  className=" border-2 focus:ring  p-2 rounded-lg w-full lg:mb-4  "
                  {...register("adminEmail", { required: true })}
                />
                {errors.adminEmail && (
                  <p className="text-red-500">This field is required</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Update"
          className="w-full btn bg-violet-600 hover:bg-purple-800 font-bold text-lg"
        />
      </form>
    </div>
  );
};
export default UpdateMealForm;
