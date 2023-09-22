import { useState } from "react";
import { useForm } from "react-hook-form";
import SimpleLoader from "../../../SimpleLoader/SimpleLoader";
import axios from "axios";
import toast from "react-hot-toast";
import { useProductContext } from "../../../../GlobalContext/ProductContext";

const AddCategoryContent = () => {
  const { refetchProducts } = useProductContext();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const categoryData = {
        category: data.category.toLowerCase(),
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/add/category`,
        categoryData
      );
      if (response.data.acknowledged) {
        toast.success("New Category Added Successfully.");
        reset();
        setLoading(false);
        refetchProducts();
      }
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };
  return (
    <div>
      <h3 className="text-center text-2xl text-black font-semibold mb-6">
        Add Brand New Category
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="flex flex-col bg-slate-300 py-6 px-4 shadow-2xl">
          <label className="py-2">Write New Category*</label>
          <input
            className="px-4 py-2"
            type="search"
            placeholder="cream/tablet/capsule/syrup/injection etc..."
            {...register("category", { required: true })}
            aria-invalid={errors.category ? "true" : "false"}
          />
          {errors.category?.type === "required" && (
            <p className="text-red-600 pt-1" role="alert">
              Category is required
            </p>
          )}
          <button
            className="bg-blue-600 py-2 mt-4 text-white w-full hover:bg-blue-400 duration-500"
            type="submit"
            disabled={loading}
          >
            {loading ? <SimpleLoader /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryContent;
